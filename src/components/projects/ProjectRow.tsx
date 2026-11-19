import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { categoryLabel } from "@/lib/projects";
import { formatDate, languageColor } from "@/lib/utils";
import type { Project } from "@/types/github";

/**
 * Fila editorial numerada: el módulo de proyecto como línea de consola
 * (no como card). El índice gigante, los datos y la vista previa synthwave
 * al hover. Toda la fila lleva a la ficha del módulo.
 */
export function ProjectRow({ project, index = 0 }: { project: Project; index?: number }) {
  const category = categoryLabel(project.category);
  const color = languageColor(project.language);
  const initials = project.name.replace(/[^a-zA-Z0-9]/g, "").slice(0, 2).toUpperCase() || "PR";

  return (
    <li>
      <Reveal variant="up" delay={(index % 6) * 60}>
        <Link
          href={`/projects/${project.slug}`}
          className="group flex items-center gap-4 px-3 py-5 transition-colors hover:bg-panel/60 sm:gap-6 sm:px-5"
        >
          {/* Índice del módulo */}
          <span className="w-10 shrink-0 font-display text-2xl font-bold text-mute/50 transition-colors duration-200 group-hover:text-accent sm:text-3xl">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Datos del módulo */}
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-display text-lg font-semibold tracking-wide sm:text-xl">{project.name}</span>
              {project.featured && (
                <span className="rounded-full border border-accent/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent">
                  principal
                </span>
              )}
            </span>
            <span className="mt-1 block text-sm leading-relaxed text-mute line-clamp-2">
              {project.description ?? "Este repositorio todavía no tiene descripción."}
            </span>
            <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-mute">
              {category && <span className="text-accent/90">[ {category} ]</span>}
              {project.language && (
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />
                  {project.language}
                </span>
              )}
              <span className="inline-flex items-center gap-1">
                <Star className="h-3 w-3" aria-hidden="true" />
                {project.stars}
              </span>
              <span>upd {formatDate(project.updatedAt)}</span>
            </span>
          </span>

          {/* Vista previa al hover */}
          <span className="relative hidden h-24 w-36 shrink-0 overflow-hidden rounded-lg border border-line bg-raised md:block">
            {project.cover ? (
              <Image
                src={project.cover}
                alt=""
                fill
                sizes="144px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <>
                <span
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(to bottom, ${color}26 0%, transparent 62%)` }}
                  aria-hidden="true"
                />
                <span className="synth-card-grid" aria-hidden="true" />
                <span className="synth-card-sun" aria-hidden="true" />
                <span
                  className="relative flex h-full items-center justify-center font-mono text-2xl font-bold"
                  style={{ color, textShadow: `0 0 14px ${color}99` }}
                  aria-hidden="true"
                >
                  {initials}
                </span>
              </>
            )}
          </span>

          <ArrowUpRight
            className="h-5 w-5 shrink-0 text-mute transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            aria-hidden="true"
          />
        </Link>
      </Reveal>
    </li>
  );
}
