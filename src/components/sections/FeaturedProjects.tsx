import { ProjectRow } from "@/components/projects/ProjectRow";
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
      eyebrow="// 01 :: proyectos"
      title={featured.length > 0 ? "Módulos principales" : "Módulos recientes"}
      description="Leídos en vivo desde mis repositorios públicos de GitHub."
    >
      <div className="space-y-6">
        <GitHubNotice data={data} />
        {shown.length === 0 ? (
          data.status !== "error" && (
            <EmptyState
              title="Sin módulos por ahora"
              text="Los repositorios públicos van a aparecer acá."
            />
          )
        ) : (
          <div className="overflow-hidden rounded-xl border border-line/70">
            <ul className="divide-y divide-line/60">
              {shown.map((project, index) => (
                <ProjectRow key={project.id} project={project} index={index} />
              ))}
            </ul>
          </div>
        )}
        <Reveal className="mt-8 flex justify-center">
          <Button href="/projects" variant="primary" className="glow-accent">
            Ver catálogo completo
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
