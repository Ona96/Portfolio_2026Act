import { CountUp } from "@/components/CountUp";
import { Reveal } from "@/components/Reveal";
import type { PortfolioData } from "@/types/github";

interface Metric {
  label: string;
  value: number;
}

/**
 * Indicadores del portfolio, construidos solo con datos reales de GitHub.
 * Las métricas sin dato disponible se omiten (nunca se muestran ceros
 * inventados ni cifras de relleno).
 */
export function StatsStrip({ data }: { data: PortfolioData }) {
  const featuredCount = data.projects.filter((p) => p.featured).length;

  const metrics: Metric[] = [];
  if (data.projects.length > 0) metrics.push({ label: "Proyectos publicados", value: data.projects.length });
  if (data.profile?.publicRepos) metrics.push({ label: "Repositorios públicos", value: data.profile.publicRepos });
  if (data.languages.length > 0) metrics.push({ label: "Lenguajes detectados", value: data.languages.length });
  if (featuredCount > 0) metrics.push({ label: "Proyectos destacados", value: featuredCount });

  if (metrics.length === 0) return null;

  return (
    <section aria-label="Indicadores del portfolio" className="border-y border-line/70 bg-panel/40">
      <Reveal className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-6 px-5 py-8 sm:px-8 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="text-center lg:text-left">
            <p className="text-gradient font-mono text-3xl font-semibold sm:text-4xl">
              <CountUp value={metric.value} />
            </p>
            <p className="mt-1 text-xs text-mute sm:text-sm">{metric.label}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
