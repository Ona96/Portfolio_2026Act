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

  return (
    <Section
      id="tecnologias"
      eyebrow="02 · Tecnologías"
      title="Tecnologías con las que trabajo"
      description="Áreas de interés declaradas y lenguajes detectados automáticamente en mis repositorios públicos."
    >
      <div className="space-y-10">
        {interests.length > 0 && (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {interests.map((area, index) => {
              const Icon = iconFor(area);
              return (
                <li key={area}>
                  <Reveal delay={(index % 3) * 60} className="h-full">
                    <div className="flex h-full items-start gap-3 rounded-xl border border-line bg-panel p-4 shadow-card">
                      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-raised text-accent">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <p className="text-sm font-medium leading-relaxed">{area}</p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        )}

        {languages.length > 0 && (
          <Reveal>
            <div>
              <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.2em] text-mute">
                Lenguajes en mis repositorios
              </h3>
              <ul className="flex flex-wrap gap-2" aria-label="Lenguajes usados en GitHub">
                {languages.map((lang) => (
                  <li
                    key={lang.name}
                    className="inline-flex items-center gap-2 rounded-lg border border-line bg-panel px-3 py-1.5 text-sm shadow-card"
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
          <Reveal>
            <div>
              <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.2em] text-mute">
                Herramientas y frameworks
              </h3>
              <ul className="flex flex-wrap gap-2" aria-label="Herramientas y frameworks">
                {declaredTechnologies.map((tech) => (
                  <li
                    key={tech.name}
                    className="rounded-lg border border-line bg-panel px-3 py-1.5 text-sm shadow-card"
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
