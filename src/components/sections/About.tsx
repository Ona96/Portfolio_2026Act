import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/ui/Section";
import { portfolioConfig } from "@/config/portfolio";

/**
 * Línea de tiempo de experiencia. Mientras `about.experience` esté vacío
 * no se muestra nada: no se inventan trabajos ni períodos.
 */
export function ExperienceTimeline() {
  const experience = portfolioConfig.about.experience;
  if (experience.length === 0) return null;

  return (
    <Reveal>
      <div>
        <h3 className="mb-6 font-mono text-xs font-medium uppercase tracking-[0.2em] text-mute">Experiencia</h3>
        <ol className="relative space-y-8 border-l border-line pl-6">
          {experience.map((item, index) => (
            <li key={index} className="relative">
              <span
                className="absolute -left-[1.9rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-ink bg-accent"
                aria-hidden="true"
              />
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h4 className="font-medium">{item.title}</h4>
                {item.period && <span className="font-mono text-xs text-accent">{item.period}</span>}
              </div>
              {item.organization && <p className="mt-0.5 text-sm text-mute">{item.organization}</p>}
              {item.description && <p className="mt-2 text-sm leading-relaxed text-mute">{item.description}</p>}
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}

export function About({ asPage }: { asPage?: boolean }) {
  const { paragraphs, interests } = portfolioConfig.about;

  return (
    <Section
      id="sobre-mi"
      as={asPage ? "h1" : "h2"}
      eyebrow={asPage ? "Sobre mí" : "03 · Sobre mí"}
      title="Quién está detrás del código"
      className="border-t border-line/70"
    >
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="space-y-4">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="leading-relaxed text-fg/90">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
        <div className="space-y-8">
          {interests.length > 0 && (
            <Reveal>
              <div>
                <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.2em] text-mute">Intereses</h3>
                <ul className="flex flex-wrap gap-2" aria-label="Intereses">
                  {interests.map((interest) => (
                    <li
                      key={interest}
                      className="rounded-full border border-line bg-panel px-3 py-1 text-xs text-mute shadow-card"
                    >
                      {interest}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
          <ExperienceTimeline />
        </div>
      </div>
    </Section>
  );
}
