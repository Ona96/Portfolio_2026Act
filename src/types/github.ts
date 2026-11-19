/** Respuesta cruda de GET /users/{user}/repos (solo los campos que usamos). */
export interface GitHubRepoApi {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  archived: boolean;
  private?: boolean;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  forks_count: number;
  pushed_at: string | null;
  updated_at: string;
  created_at: string;
  owner: { login: string };
}

/** Respuesta cruda de GET /users/{user}. */
export interface GitHubUserApi {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
}

export interface RateLimitInfo {
  limit: number;
  remaining: number;
  /** ISO 8601 */
  resetAt: string | null;
}

export type GitHubErrorKind = "rate_limit" | "not_found" | "network" | "http" | "invalid";

export interface LanguageShare {
  name: string;
  bytes: number;
}

export interface Project {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  url: string;
  demoUrl: string | null;
  language: string | null;
  /** Detalle por lenguaje; vacío si no se pudo obtener. */
  languages: LanguageShare[];
  /** Topics visibles (sin los topics de control del portfolio). */
  topics: string[];
  stars: number;
  forks: number;
  updatedAt: string;
  createdAt: string;
  category: string | null;
  featured: boolean;
  cover: string | null;
}

export interface Profile {
  login: string;
  name: string | null;
  avatarUrl: string;
  url: string;
  bio: string | null;
  publicRepos: number;
}

export interface LanguageStat {
  name: string;
  /** Cantidad de proyectos del portfolio donde aparece. */
  projects: number;
}

export interface PortfolioError {
  kind: GitHubErrorKind;
  message: string;
  resetAt: string | null;
}

export interface PortfolioData {
  /** ok: datos frescos · stale: datos anteriores por falla de GitHub · error: sin datos */
  status: "ok" | "stale" | "error";
  profile: Profile | null;
  projects: Project[];
  languages: LanguageStat[];
  error: PortfolioError | null;
  fetchedAt: string;
}
