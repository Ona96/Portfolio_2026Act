import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Star } from "lucide-react";
import { GitHubIcon } from "@/components/ui/icons";
import { categoryLabel } from "@/lib/projects";
import { formatDate, languageColor } from "@/lib/utils";
import type { Project } from "@/types/github";

export function ProjectCard({ project }: { project: Project }) {
  const category = categoryLabel(project.category);
  const color = languageColor(project.language);
  const initials = project.name.replace(/[^a-zA-Z0-9]/g, "").slice(0, 2).toUpperCase() || "PR";

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-panel shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-pop">
      {/* Portada: imagen configurada o cabecera decorativa generada */}
      {project.cover ? (
        <div className="relative aspect-[16/9] border-b border-line bg-raised">
          <Image
            src={project.cover}
            alt=""
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
          {project.featured && <FeaturedBadge />}
        </div>
      ) : (
        <div className="relative flex aspect-[16/5] items-center justify-center overflow-hidden border-b border-line bg-raised">
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(110% 160% at 18% 0%, ${color}2e 0%, transparent 58%), radial-gradient(90% 140% at 88% 110%, ${color}1a 0%, transparent 60%)`,
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage: `linear-gradient(to right, ${color}14 1px, transparent 1px), linear-gradient(to bottom, ${color}14 1px, transparent 1px)`,
              backgroundSize: "22px 22px",
            }}
            aria-hidden="true"
          />
          <span className="relative select-none font-mono text-3xl font-bold tracking-tight" style={{ color }}>
            {initials}
          </span>
          {project.featured && <FeaturedBadge />}
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-mono text-base font-medium leading-snug">
            <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 hover:text-accent">
              {project.name}
            </Link>
          </h3>
        </div>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-mute line-clamp-3">
          {project.description ?? "Este repositorio todavía no tiene descripción."}
        </p>

        {(category || project.topics.length > 0) && (
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Etiquetas">
            {category && <li className="rounded-md bg-raised px-2 py-0.5 text-xs text-fg">{category}</li>}
            {project.topics.slice(0, 5).map((topic) => (
              <li key={topic} className="rounded-md bg-raised px-2 py-0.5 text-xs text-mute">
                {topic}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-mute">
          {project.language && (
            <span className="inline-flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: color }}
                aria-hidden="true"
              />
              {project.language}
            </span>
          )}
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="sr-only">Estrellas:</span>
            {project.stars}
          </span>
          <span>Actualizado el {formatDate(project.updatedAt)}</span>
        </div>
      </div>

      <div className="relative z-10 flex gap-4 border-t border-line px-5 py-3 text-sm">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-mute transition-colors hover:text-accent"
          aria-label={`Código de ${project.name} en GitHub`}
        >
          <GitHubIcon className="h-4 w-4" aria-hidden="true" /> Código
        </a>
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-mute transition-colors hover:text-accent"
            aria-label={`Demo de ${project.name}`}
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" /> Demo
          </a>
        )}
      </div>
    </article>
  );
}

function FeaturedBadge() {
  return (
    <span className="absolute right-3 top-3 rounded-full border border-accent/40 bg-ink/60 px-2 py-0.5 text-xs text-accent backdrop-blur">
      Destacado
    </span>
  );
}
