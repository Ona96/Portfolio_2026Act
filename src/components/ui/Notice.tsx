import { TriangleAlert } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio";
import { formatDate } from "@/lib/utils";
import type { PortfolioData } from "@/types/github";

/** Aviso cuando GitHub no está disponible o se usaron datos anteriores. */
export function GitHubNotice({ data }: { data: PortfolioData }) {
  if (data.status === "ok" || !data.error) return null;
  const reset = data.error.resetAt ? ` Se restablece el ${formatDate(data.error.resetAt)}.` : "";
  const profileUrl = `https://github.com/${portfolioConfig.owner.githubUser}`;

  return (
    <div role="status" className="flex gap-3 rounded-xl border border-amber-400/30 bg-amber-400/5 p-4 text-sm shadow-card">
      <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
      <p className="leading-relaxed text-fg/90">
        {data.status === "stale"
          ? "Mostrando datos guardados: no se pudo actualizar desde GitHub."
          : "No se pudieron cargar los proyectos desde GitHub."}{" "}
        {data.error.message}
        {reset} Podés ver todos los repositorios directamente en{" "}
        <a
          className="text-accent underline underline-offset-2"
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          github.com/{portfolioConfig.owner.githubUser}
        </a>
        .
      </p>
    </div>
  );
}

export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-dashed border-line bg-panel/50 p-10 text-center">
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-sm text-mute">{text}</p>
    </div>
  );
}
