import { CountUp } from "@/components/CountUp";
import { Reveal } from "@/components/Reveal";
import type { PortfolioData } from "@/types/github";

interface Metric {
  label: string;
  value: number;
}

/**
 * System status: indicadores del portfolio como readouts de consola,
 * con esquinas HUD y conteo animado. Construidos solo con datos reales
 * de GitHub; las métricas sin dato disponible se omiten.
 */
export function StatsStrip({ data }: { data: PortfolioData }) {
  const featuredCount = data.projects.filter((p) => p.featured).length;

  const metrics: Metric[] = [];
  if (data.projects.length > 0) metrics.push({ label: "proyectos", value: data.projects.length });
  if (data.profile?.publicRepos) metrics.push({ label: "repositorios", value: data.profile.publicRepos });
  if (data.languages.length > 0) metrics.push({ label: "lenguajes", value: data.languages.length });
  if (featuredCount > 0) metrics.push({ label: "destacados", value: featuredCount });

  if (metrics.length === 0) return null;

  return (
    <section aria-label="Indicadores del portfolio" className="border-b border-line/70 bg-panel/40">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-x-6 gap-y-8 px-5 py-8 sm:px-8 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <Reveal key={metric.label} variant="scale" delay={index * 90}>
            <div className="hud-cell px-3 py-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-mute">[ {metric.label} ]</p>
              <p className="text-gradient mt-2 font-display text-4xl font-bold leading-none sm:text-5xl">
                <CountUp value={metric.value} />
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
