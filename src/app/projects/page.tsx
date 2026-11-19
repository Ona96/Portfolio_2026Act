import type { Metadata } from "next";
import { Suspense } from "react";
import { ProjectExplorer } from "@/components/projects/ProjectExplorer";
import { ProjectsSkeleton } from "@/components/projects/ProjectsSkeleton";
import { EmptyState, GitHubNotice } from "@/components/ui/Notice";
import { Section } from "@/components/ui/Section";
import { portfolioConfig } from "@/config/portfolio";
import { getPortfolioData } from "@/lib/github";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Proyectos",
  description: `Proyectos públicos de ${portfolioConfig.owner.name}, sincronizados con GitHub.`,
  alternates: { canonical: "/projects" },
};

async function ProjectsContent() {
  const data = await getPortfolioData();
  const languages = data.languages.map((l) => l.name);
  const usedCategories = new Set(data.projects.map((p) => p.category));
  const categories = portfolioConfig.categories.filter((c) => usedCategories.has(c.id));

  return (
    <div className="space-y-6">
      <GitHubNotice data={data} />
      {data.projects.length > 0 ? (
        <ProjectExplorer projects={data.projects} languages={languages} categories={[...categories]} />
      ) : (
        data.status !== "error" && (
          <EmptyState title="Todavía no hay proyectos para mostrar" text="Los repositorios públicos van a aparecer acá." />
        )
      )}
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Section
      as="h1"
      eyebrow="Catálogo"
      title="Proyectos"
      description="Repositorios públicos de GitHub. Se actualizan solos."
    >
      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsContent />
      </Suspense>
    </Section>
  );
}
