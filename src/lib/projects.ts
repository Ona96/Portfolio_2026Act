import { portfolioConfig } from "@/config/portfolio";
import type { GitHubRepoApi, LanguageShare, LanguageStat, Project } from "@/types/github";

const cfg = portfolioConfig;
const CONTROL_TOPICS: string[] = [cfg.repositories.featuredTopic, cfg.repositories.excludeTopic];

/** Aplica las reglas de visibilidad. Nunca incluye repositorios privados. */
export function selectRepos(repos: GitHubRepoApi[]): GitHubRepoApi[] {
  const { includeArchived, includeForks, excludeTopic, excluded } = cfg.repositories;
  const excludedNames = new Set<string>(excluded.map((n) => n.toLowerCase()));

  return repos.filter((repo) => {
    if (repo.private) return false;
    if (!includeArchived && repo.archived) return false;
    if (!includeForks && repo.fork) return false;
    if (repo.topics?.includes(excludeTopic)) return false;
    if (excludedNames.has(repo.name.toLowerCase())) return false;
    return true;
  });
}

export function sanitizeUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(candidate);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function resolveCategory(topics: string[], override?: string): string | null {
  if (override) return override;
  const known = cfg.categories.map((c) => c.id);
  return topics.find((t) => known.includes(t)) ?? null;
}

export function toProject(repo: GitHubRepoApi, languages: LanguageShare[] = []): Project {
  const topics = repo.topics ?? [];
  const override = (cfg.projectOverrides as Record<string, (typeof cfg.projectOverrides)[string]>)[repo.name];
  const featuredNames = cfg.repositories.featured.map((n) => n.toLowerCase());

  return {
    id: repo.id,
    slug: repo.name.toLowerCase(),
    name: repo.name,
    description: override?.description ?? repo.description,
    url: repo.html_url,
    demoUrl: override?.demoUrl !== undefined ? sanitizeUrl(override.demoUrl) : sanitizeUrl(repo.homepage),
    language: repo.language,
    languages,
    topics: topics.filter((t) => !CONTROL_TOPICS.includes(t)),
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    updatedAt: repo.pushed_at ?? repo.updated_at,
    createdAt: repo.created_at,
    category: resolveCategory(topics, override?.category),
    featured: topics.includes(cfg.repositories.featuredTopic) || featuredNames.includes(repo.name.toLowerCase()),
    cover: override?.cover?.startsWith("/") ? override.cover : null,
  };
}

export function computeLanguageStats(projects: Project[]): LanguageStat[] {
  const counts = new Map<string, number>();
  for (const project of projects) {
    const names = new Set<string>(project.languages.map((l) => l.name));
    if (project.language) names.add(project.language);
    for (const name of names) counts.set(name, (counts.get(name) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, projects: count }))
    .sort((a, b) => b.projects - a.projects || a.name.localeCompare(b.name));
}

export function categoryLabel(id: string | null): string | null {
  if (!id) return null;
  return cfg.categories.find((c) => c.id === id)?.label ?? id;
}
