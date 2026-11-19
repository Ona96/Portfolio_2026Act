import {
  Braces,
  ClipboardList,
  Code,
  Cpu,
  Database,
  Globe,
  ShoppingCart,
  Workflow,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/ui/Section";
import { portfolioConfig } from "@/config/portfolio";
import { cn } from "@/lib/utils";
import { languageColor } from "@/lib/utils";
import type { PortfolioData } from "@/types/github";

/** Mapa de iconos por palabra clave; fallback genérico Cpu. */
const ICON_MAP: Array<[RegExp, LucideIcon]> = [
  [/ecommerce|tienda/i, ShoppingCart],
  [/web/i, Globe],
  [/laravel|php/i, Code],
  [/typescript|javascript/i, Braces],
  [/base|dato/i, Database],
  [/gestión/i, ClipboardList],
  [/análisis|sistema/i, Workflow],
  [/herramienta/i, Wrench],
];

function iconFor(area: string): LucideIcon {
  for (const [pattern, icon] of ICON_MAP) {
    if (pattern.test(area)) return icon;
  }
  return Cpu;
}

/**
 * Loadout: el stack como inventario de consola. Las dos primeras áreas
 * ocupan slots grandes con glow de tier; el resto entra en slots chicos.
 * Los lenguajes se muestran como barras proporcionales a proyectos reales.
 */
export function Technologies({ data }: { data: PortfolioData }) {
  const { interests } = portfolioConfig.about;
  const declaredTechnologies = portfolioConfig.declaredTechnologies;
  const languages = data.languages.filter((l) => l.projects > 0);
  const maxProjects = Math.max(...languages.map((l) => l.projects), 1);

  /** Slot doble para el stack principal; si la última queda sola, fila completa. */
  function spanFor(index: number): string {
    if (index < 2) return "sm:col-span-2";
    if (index === interests.length - 1 && (interests.length - 2) % 4 === 1) return "sm:col-span-2 lg:col-span-4";
    return "";
  }

  return (
    <Section
      id="tecnologias"
      eyebrow="// 02 :: loadout"
      title="Equipamiento"
      description="Stack declarado y lenguajes detectados automáticamente en mis repositorios públicos."
    >
      <div className="space-y-10">
        {interests.length > 0 && (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {interests.map((area, index) => {
              const Icon = iconFor(area);
              const feature = index < 2;
              return (
                <li key={area} className={cn("h-full", spanFor(index))}>
                  <Reveal variant={feature ? "up" : "scale"} delay={(index % 4) * 70} className="h-full">
                    <div
                      className={cn(
                        "hud-cell relative flex h-full items-start gap-3 overflow-hidden bg-panel",
                        feature
                          ? "min-h-[6rem] border border-accent/40 p-5 shadow-pop"
                          : "border border-line p-4 shadow-card",
                      )}
                    >
                      {feature && <span className="synth-mini" aria-hidden="true" />}
                      <span
                        className={cn(
                          "relative mt-0.5 inline-flex shrink-0 items-center justify-center rounded-lg bg-raised text-accent",
                          feature ? "h-11 w-11" : "h-9 w-9",
                        )}
                      >
                        <Icon className={cn(feature ? "h-5 w-5" : "h-4 w-4")} aria-hidden="true" />
                      </span>
                      <div className="relative">
                        <p className={cn("font-medium leading-relaxed", feature ? "text-base" : "text-sm")}>{area}</p>
                        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-mute/70">
                          {feature ? "// stack principal" : `// slot ${String(index + 1).padStart(2, "0")}`}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        )}

        {languages.length > 0 && (
          <Reveal variant="blur">
            <div>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-mute">
                &gt; lenguajes en mis repositorios
              </h3>
              <ul className="max-w-2xl space-y-3">
                {languages.map((lang) => {
                  const pct = Math.max(10, Math.round((lang.projects / maxProjects) * 100));
                  return (
                    <li key={lang.name}>
                      <div className="mb-1 flex items-baseline justify-between font-mono text-xs">
                        <span className="inline-flex items-center gap-2">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: languageColor(lang.name) }}
                            aria-hidden="true"
                          />
                          {lang.name}
                        </span>
                        <span className="text-mute">
                          {lang.projects} {lang.projects === 1 ? "proyecto" : "proyectos"}
                        </span>
                      </div>
                      <div
                        className="h-1.5 overflow-hidden rounded-full bg-raised"
                        role="meter"
                        aria-label={`${lang.name}: ${lang.projects} ${lang.projects === 1 ? "proyecto" : "proyectos"}`}
                        aria-valuemin={0}
                        aria-valuenow={lang.projects}
                        aria-valuemax={maxProjects}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${pct}%`, backgroundColor: languageColor(lang.name) }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        )}

        {declaredTechnologies.length > 0 && (
          <Reveal variant="blur">
            <div>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-mute">
                &gt; herramientas y frameworks
              </h3>
              <ul className="flex flex-wrap gap-2" aria-label="Herramientas y frameworks">
                {declaredTechnologies.map((tech) => (
                  <li
                    key={tech.name}
                    className="rounded-lg border border-line bg-panel px-3 py-1.5 text-sm shadow-card transition-colors duration-200 hover:border-accent/50"
                  >
                    {tech.name}
                    <span className="ml-2 text-xs text-mute">{tech.group}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
