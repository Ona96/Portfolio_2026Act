import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GitHubIcon } from "@/components/ui/icons";
import { GitHubNotice } from "@/components/ui/Notice";
import { getPortfolioData, getProjectBySlug } from "@/lib/github";
import { categoryLabel } from "@/lib/projects";
import { formatDate, languageColor } from "@/lib/utils";

export const revalidate = 1800;

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const data = await getPortfolioData();
  return data.projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const { project } = await getProjectBySlug(slug);
  if (!project) return { title: "Proyecto no encontrado" };
  const description = project.description ?? `Proyecto ${project.name} de GitHub.`;
  return {
    title: project.name,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title: project.name, description, type: "article" },
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const { data, project } = await getProjectBySlug(slug);
  if (!project) notFound();

  const totalBytes = project.languages.reduce((sum, l) => sum + l.bytes, 0);
  const category = categoryLabel(project.category);

  return (
    <div className="relative mx-auto w-full max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
      <div className="bg-glow pointer-events-none absolute -top-24 left-1/2 h-72 w-[36rem] max-w-none -translate-x-1/2" aria-hidden="true" />

      <Link
        href="/projects"
        className="relative inline-flex items-center gap-1 text-sm text-mute transition-colors hover:text-fg"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Volver a proyectos
      </Link>

      <div className="relative mt-8 space-y-8">
        <GitHubNotice data={data} />

        <header>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-mono text-3xl font-semibold tracking-tight sm:text-4xl">{project.name}</h1>
            {project.featured && (
              <span className="rounded-full border border-accent/40 bg-panel px-2.5 py-0.5 text-xs text-accent">
                Destacado
              </span>
            )}
          </div>
          <p className="mt-4 max-w-2xl leading-relaxed text-fg/90">
            {project.description ?? "Este repositorio todavía no tiene descripción."}
          </p>
        </header>

        <div className="flex flex-wrap gap-3">
          <Button href={project.url} external variant="primary">
            <GitHubIcon className="h-4 w-4" aria-hidden="true" /> Ver código
          </Button>
          {project.demoUrl && (
            <Button href={project.demoUrl} external>
              <ExternalLink className="h-4 w-4" aria-hidden="true" /> Ver demo
            </Button>
          )}
        </div>

        <dl className="grid gap-4 rounded-xl border border-line bg-panel p-5 text-sm shadow-card sm:grid-cols-4">
          <div>
            <dt className="text-mute">Creado</dt>
            <dd className="mt-1">{formatDate(project.createdAt)}</dd>
          </div>
          <div>
            <dt className="text-mute">Última actualización</dt>
            <dd className="mt-1">{formatDate(project.updatedAt)}</dd>
          </div>
          <div>
            <dt className="text-mute">Estrellas</dt>
            <dd className="mt-1 inline-flex items-center gap-1">
              <Star className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              {project.stars}
            </dd>
          </div>
          {category && (
            <div>
              <dt className="text-mute">Categoría</dt>
              <dd className="mt-1">{category}</dd>
            </div>
          )}
        </dl>

        {project.languages.length > 0 && totalBytes > 0 && (
          <section aria-label="Distribución de lenguajes">
            <h2 className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-mute">Lenguajes</h2>
            <div className="flex h-2 overflow-hidden rounded-full bg-raised" aria-hidden="true">
              {project.languages.map((l) => (
                <div
                  key={l.name}
                  style={{ width: `${(l.bytes / totalBytes) * 100}%`, backgroundColor: languageColor(l.name) }}
                />
              ))}
            </div>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
              {project.languages.map((l) => (
                <li key={l.name} className="inline-flex items-center gap-1.5">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: languageColor(l.name) }}
                    aria-hidden="true"
                  />
                  {l.name} <span className="text-mute">{((l.bytes / totalBytes) * 100).toFixed(1)}%</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.topics.length > 0 && (
          <ul className="flex flex-wrap gap-1.5" aria-label="Etiquetas">
            {project.topics.map((t) => (
              <li key={t} className="rounded-md border border-line bg-panel px-2 py-0.5 text-xs text-mute shadow-card">
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
