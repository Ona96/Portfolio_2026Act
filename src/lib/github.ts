import "server-only";
import { cache } from "react";
import { portfolioConfig } from "@/config/portfolio";
import { computeLanguageStats, selectRepos, toProject } from "@/lib/projects";
import type {
  GitHubErrorKind,
  GitHubRepoApi,
  GitHubUserApi,
  LanguageShare,
  PortfolioData,
  Profile,
  RateLimitInfo,
} from "@/types/github";

const API_URL = process.env.GITHUB_API_URL ?? "https://api.github.com";
const USER = portfolioConfig.owner.githubUser;
const { revalidateSeconds, maxLanguageRequests } = portfolioConfig.repositories;
const PER_PAGE = 100;
const MAX_PAGES = 10; // hasta 1000 repositorios
const TIMEOUT_MS = 10_000;

export class GitHubError extends Error {
  constructor(
    readonly kind: GitHubErrorKind,
    message: string,
    readonly resetAt: string | null = null,
  ) {
    super(message);
    this.name = "GitHubError";
  }
}

/** Último estado conocido del límite de solicitudes (por instancia del servidor). */
let rateLimit: RateLimitInfo | null = null;
/** Último resultado correcto, usado como respaldo si GitHub falla. */
let lastGood: PortfolioData | null = null;

export function getRateLimit(): RateLimitInfo | null {
  return rateLimit;
}

function requestHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": `${USER}-portfolio`,
  };
  // El token solo existe en el servidor; nunca llega al cliente.
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return headers;
}

function readRateLimit(headers: Headers): string | null {
  const limit = Number(headers.get("x-ratelimit-limit"));
  const remaining = Number(headers.get("x-ratelimit-remaining"));
  const reset = Number(headers.get("x-ratelimit-reset"));
  const resetAt = reset ? new Date(reset * 1000).toISOString() : null;
  if (headers.has("x-ratelimit-remaining") && Number.isFinite(limit) && Number.isFinite(remaining)) {
    rateLimit = { limit, remaining, resetAt };
  }
  return resetAt;
}

async function request<T>(path: string): Promise<{ data: T; hasNext: boolean }> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      headers: requestHeaders(),
      next: { revalidate: revalidateSeconds },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch {
    throw new GitHubError("network", "No se pudo conectar con GitHub.");
  }

  const resetAt = readRateLimit(response.headers);

  if (response.ok) {
    try {
      return {
        data: (await response.json()) as T,
        hasNext: /rel="next"/.test(response.headers.get("link") ?? ""),
      };
    } catch {
      throw new GitHubError("invalid", "GitHub devolvió una respuesta inválida.");
    }
  }
  if (response.status === 404) throw new GitHubError("not_found", "No se encontró el recurso en GitHub.");
  const exhausted = response.headers.get("x-ratelimit-remaining") === "0" || response.headers.has("retry-after");
  if ((response.status === 403 || response.status === 429) && exhausted) {
    throw new GitHubError("rate_limit", "Se alcanzó el límite de solicitudes de GitHub.", resetAt);
  }
  throw new GitHubError("http", `GitHub respondió con el estado ${response.status}.`);
}

export async function getProfile(): Promise<Profile> {
  const { data } = await request<GitHubUserApi>(`/users/${USER}`);
  return {
    login: data.login,
    name: data.name,
    avatarUrl: data.avatar_url,
    url: data.html_url,
    bio: data.bio,
    publicRepos: data.public_repos,
  };
}

/** Obtiene todos los repositorios públicos, paginando de a 100. */
export async function getPublicRepos(): Promise<GitHubRepoApi[]> {
  const all: GitHubRepoApi[] = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    const { data, hasNext } = await request<GitHubRepoApi[]>(
      `/users/${USER}/repos?type=owner&sort=pushed&per_page=${PER_PAGE}&page=${page}`,
    );
    if (!Array.isArray(data)) throw new GitHubError("invalid", "GitHub devolvió una respuesta inválida.");
    all.push(...data);
    if (!hasNext || data.length < PER_PAGE) break;
  }
  return all;
}

export async function getRepoLanguages(repoName: string): Promise<LanguageShare[]> {
  const { data } = await request<Record<string, number>>(`/repos/${USER}/${repoName}/languages`);
  return Object.entries(data)
    .map(([name, bytes]) => ({ name, bytes }))
    .sort((a, b) => b.bytes - a.bytes);
}

/** Consulta lenguajes solo si el límite de solicitudes lo permite. Los errores no son fatales. */
async function loadLanguages(repos: GitHubRepoApi[]): Promise<Map<string, LanguageShare[]>> {
  const targets = repos.slice(0, maxLanguageRequests);
  const result = new Map<string, LanguageShare[]>();
  if (rateLimit && rateLimit.remaining < targets.length + 5) return result;

  const settled = await Promise.allSettled(targets.map((repo) => getRepoLanguages(repo.name)));
  settled.forEach((item, index) => {
    const repo = targets[index];
    if (repo && item.status === "fulfilled") result.set(repo.name, item.value);
  });
  return result;
}

function emptyData(error: GitHubError): PortfolioData {
  return {
    status: "error",
    profile: null,
    projects: [],
    languages: [],
    error: { kind: error.kind, message: error.message, resetAt: error.resetAt },
    fetchedAt: new Date().toISOString(),
  };
}

/** Punto de entrada único para las páginas. Nunca lanza: devuelve un estado. */
export const getPortfolioData = cache(async (): Promise<PortfolioData> => {
  try {
    const [repos, profile] = await Promise.all([getPublicRepos(), getProfile().catch(() => null)]);
    const visible = selectRepos(repos);
    const languages = await loadLanguages(visible);
    const projects = visible
      .map((repo) => toProject(repo, languages.get(repo.name)))
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

    const data: PortfolioData = {
      status: "ok",
      profile,
      projects,
      languages: computeLanguageStats(projects),
      error: null,
      fetchedAt: new Date().toISOString(),
    };
    lastGood = data;
    return data;
  } catch (error) {
    const gh =
      error instanceof GitHubError ? error : new GitHubError("http", "Ocurrió un error inesperado al consultar GitHub.");
    if (lastGood) {
      return {
        ...lastGood,
        status: "stale",
        error: { kind: gh.kind, message: gh.message, resetAt: gh.resetAt },
      };
    }
    return emptyData(gh);
  }
});

export async function getProjectBySlug(slug: string) {
  const data = await getPortfolioData();
  return { data, project: data.projects.find((p) => p.slug === slug) ?? null };
}
