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

export function Technologies({ data }: { data: PortfolioData }) {
  const { interests } = portfolioConfig.about;
  const declaredTechnologies = portfolioConfig.declaredTechnologies;
  const languages = data.languages.filter((l) => l.projects > 0);

  /** Bento: las dos primeras áreas ocupan celdas dobles con mini escena;
      si la última queda sola, ocupa la fila completa. */
  function spanFor(index: number): string {
    if (index < 2) return "sm:col-span-2";
    if (index === interests.length - 1 && (interests.length - 2) % 4 === 1) return "sm:col-span-2 lg:col-span-4";
    return "";
  }

  return (
    <Section
      id="tecnologias"
      eyebrow="02 · Tecnologías"
      title="Tecnologías con las que trabajo"
      description="Áreas de interés declaradas y lenguajes detectados automáticamente en mis repositorios públicos."
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
                        "relative flex h-full items-start gap-3 overflow-hidden rounded-xl border border-line bg-panel p-4 shadow-card transition-colors duration-200 hover:border-accent/50",
                        feature && "min-h-[6rem] p-5",
                      )}
                    >
                      {feature && <div className="synth-mini" aria-hidden="true" />}
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
                          {feature ? "// stack principal" : `// área ${String(index + 1).padStart(2, "0")}`}
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
              <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.2em] text-mute">
                Lenguajes en mis repositorios
              </h3>
              <ul className="flex flex-wrap gap-2" aria-label="Lenguajes usados en GitHub">
                {languages.map((lang) => (
                  <li
                    key={lang.name}
                    className="inline-flex items-center gap-2 rounded-lg border border-line bg-panel px-3 py-1.5 text-sm shadow-card transition-colors duration-200 hover:border-accent/50"
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: languageColor(lang.name) }}
                      aria-hidden="true"
                    />
                    {lang.name}
                    <span className="font-mono text-xs text-mute" aria-label={`${lang.projects} ${lang.projects === 1 ? "proyecto" : "proyectos"}`}>
                      {lang.projects}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}

        {declaredTechnologies.length > 0 && (
          <Reveal variant="blur">
            <div>
              <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.2em] text-mute">
                Herramientas y frameworks
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
