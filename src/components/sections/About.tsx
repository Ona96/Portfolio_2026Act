import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/ui/Section";
import { portfolioConfig } from "@/config/portfolio";

/**
 * Mission log: la línea se traza al scroll y cada nodo se enciende
 * escalonado. Mientras `about.experience` esté vacío no se muestra nada.
 */
export function ExperienceTimeline() {
  const experience = portfolioConfig.about.experience;
  if (experience.length === 0) return null;

  return (
    <Reveal variant="right">
      <div>
        <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-mute">&gt; mission log</h3>
        <div className="pl-6">
          <ol className="space-y-8">
            {experience.map((item, index) => (
              <li key={index} className="relative">
                {/* Línea que une este nodo con el siguiente: en el último corta. */}
                {index < experience.length - 1 && (
                  <span
                    className="tl-seg"
                    style={{ transitionDelay: `${(0.45 + index * 0.25).toFixed(2)}s` }}
                    aria-hidden="true"
                  />
                )}
                <span
                  className="tl-dot absolute -left-[1.9rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-ink bg-accent"
                  style={{ transitionDelay: `${(0.35 + index * 0.25).toFixed(2)}s` }}
                  aria-hidden="true"
                />
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h4 className="font-display text-base font-semibold tracking-wide">{item.title}</h4>
                  {item.period && <span className="font-mono text-xs text-accent">{item.period}</span>}
                </div>
                {item.organization && <p className="mt-0.5 text-sm text-mute">{item.organization}</p>}
                {item.description && <p className="mt-2 text-sm leading-relaxed text-mute">{item.description}</p>}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Reveal>
  );
}

/**
 * Dossier: ID card de sistema a la izquierda (datos reales del owner)
 * y registro de misiones a la derecha.
 */
export function About({ asPage }: { asPage?: boolean }) {
  const { owner, about } = portfolioConfig;
  const { paragraphs, interests } = about;

  return (
    <Section
      id="sobre-mi"
      as={asPage ? "h1" : "h2"}
      eyebrow={asPage ? "// dossier" : "// 03 :: dossier"}
      title={asPage ? "Sobre mí" : "Quién opera este sistema"}
      className="border-t border-line/70"
    >
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.4fr]">
        {/* ID card */}
        <Reveal variant="left">
          <div className="hud-cell bg-panel p-6">
            <div className="flex items-center gap-4">
              <span className="text-gradient font-display text-4xl font-bold tracking-wide">KO</span>
              <div className="min-w-0">
                <p className="font-display text-lg font-semibold leading-tight">{owner.name}</p>
                <p className="truncate font-mono text-xs text-mute">{owner.role}</p>
              </div>
            </div>

            <dl className="mt-6 space-y-2 font-mono text-xs">
              <div className="flex justify-between gap-4">
                <dt className="shrink-0 text-mute">BASE</dt>
                <dd className="text-right">Jardín América, Misiones</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="shrink-0 text-mute">ESTADO</dt>
                <dd className="inline-flex items-center gap-1.5">
                  <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  operativo
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="shrink-0 text-mute">GITHUB</dt>
                <dd className="text-right text-accent">@{owner.githubUser}</dd>
              </div>
            </dl>

            {interests.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Intereses">
                {interests.map((interest) => (
                  <li
                    key={interest}
                    className="rounded-full border border-line bg-raised px-3 py-1 text-xs text-mute transition-colors duration-200 hover:border-accent/50 hover:text-fg"
                  >
                    {interest}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Reveal>

        {/* Registro */}
        <div className="space-y-8">
          <Reveal variant="up">
            <div className="space-y-4">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="leading-relaxed text-fg/90">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
          <ExperienceTimeline />
        </div>
      </div>
    </Section>
  );
}
