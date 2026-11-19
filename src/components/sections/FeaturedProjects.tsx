import { ProjectCard } from "@/components/projects/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { GitHubNotice, EmptyState } from "@/components/ui/Notice";
import { Section } from "@/components/ui/Section";
import type { PortfolioData } from "@/types/github";

export function FeaturedProjects({ data }: { data: PortfolioData }) {
  const featured = data.projects.filter((p) => p.featured);
  const shown = (featured.length > 0 ? featured : data.projects).slice(0, 6);

  return (
    <Section
      id="proyectos"
      eyebrow="01 · Proyectos"
      title={featured.length > 0 ? "Proyectos destacados" : "Proyectos recientes"}
      description="Tomados directamente de mis repositorios públicos de GitHub."
    >
      <div className="space-y-6">
        <GitHubNotice data={data} />
        {shown.length === 0 ? (
          data.status !== "error" && (
            <EmptyState title="Todavía no hay proyectos para mostrar" text="Cuando haya repositorios públicos van a aparecer acá." />
          )
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((p, index) => (
              <li key={p.id} className="h-full">
                <Reveal delay={(index % 3) * 70}>
                  <ProjectCard project={p} />
                </Reveal>
              </li>
            ))}
          </ul>
        )}
        <Reveal className="mt-8 flex justify-center">
          <Button href="/projects">Ver todos los proyectos</Button>
        </Reveal>
      </div>
    </Section>
  );
}
