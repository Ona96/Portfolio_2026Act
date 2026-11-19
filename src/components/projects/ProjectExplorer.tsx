"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { ProjectRow } from "@/components/projects/ProjectRow";
import { EmptyState } from "@/components/ui/Notice";
import type { Project } from "@/types/github";

interface Props {
  projects: Project[];
  languages: string[];
  categories: { id: string; label: string }[];
}

type Sort = "recent" | "oldest" | "stars" | "name";

const field =
  "w-full rounded-lg border border-line bg-panel px-3 py-2 text-sm text-fg placeholder:text-mute transition-colors focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/40";

export function ProjectExplorer({ projects, languages, categories }: Props) {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState<Sort>("recent");
  const [onlyFeatured, setOnlyFeatured] = useState(false);
  const hasFeatured = projects.some((p) => p.featured);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = projects.filter((p) => {
      if (onlyFeatured && !p.featured) return false;
      if (language && p.language !== language && !p.languages.some((l) => l.name === language)) return false;
      if (category && p.category !== category) return false;
      if (!q) return true;
      return [p.name, p.description ?? "", p.language ?? "", ...p.topics].some((v) => v.toLowerCase().includes(q));
    });
    const sorters: Record<Sort, (a: Project, b: Project) => number> = {
      recent: (a, b) => b.updatedAt.localeCompare(a.updatedAt),
      oldest: (a, b) => a.updatedAt.localeCompare(b.updatedAt),
      stars: (a, b) => b.stars - a.stars || b.updatedAt.localeCompare(a.updatedAt),
      name: (a, b) => a.name.localeCompare(b.name),
    };
    return [...list].sort(sorters[sort]);
  }, [projects, query, language, category, sort, onlyFeatured]);

  const filtering = Boolean(query || language || category || onlyFeatured);
  const reset = () => {
    setQuery("");
    setLanguage("");
    setCategory("");
    setOnlyFeatured(false);
  };

  return (
    <div>
      <form
        role="search"
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="relative sm:col-span-2 lg:col-span-1">
          <label htmlFor="buscar" className="sr-only">
            Buscar proyectos
          </label>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mute"
            aria-hidden="true"
          />
          <input
            id="buscar"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="> buscar por nombre, tema o lenguaje"
            className={`${field} pl-9 font-mono`}
          />
        </div>
        <div>
          <label htmlFor="lenguaje" className="sr-only">
            Lenguaje
          </label>
          <select id="lenguaje" value={language} onChange={(e) => setLanguage(e.target.value)} className={field}>
            <option value="">Todos los lenguajes</option>
            {languages.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="categoria" className="sr-only">
            Categoría
          </label>
          <select
            id="categoria"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={field}
            disabled={categories.length === 0}
          >
            <option value="">Todas las categorías</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="orden" className="sr-only">
            Ordenar por
          </label>
          <select id="orden" value={sort} onChange={(e) => setSort(e.target.value as Sort)} className={field}>
            <option value="recent">Más recientes</option>
            <option value="oldest">Más antiguos</option>
            <option value="stars">Más estrellas</option>
            <option value="name">Nombre (A–Z)</option>
          </select>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-mute">
        <p aria-live="polite">
          {visible.length} {visible.length === 1 ? "módulo" : "módulos"}
        </p>
        <div className="flex items-center gap-4">
          {hasFeatured && (
            <label className="inline-flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={onlyFeatured}
                onChange={(e) => setOnlyFeatured(e.target.checked)}
                className="accent-[rgb(var(--accent))]"
              />
              Solo principales
            </label>
          )}
          {filtering && (
            <button type="button" onClick={reset} className="text-accent hover:underline">
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="mt-6">
          <EmptyState title="Ningún módulo coincide" text="Probá con otro término o limpiá los filtros." />
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-xl border border-line/70">
          <ul className="divide-y divide-line/60">
            {visible.map((project, index) => (
              <ProjectRow key={project.id} project={project} index={index} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
