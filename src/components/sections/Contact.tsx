import type { ReactNode } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/ui/Section";
import { portfolioConfig } from "@/config/portfolio";
import { sanitizeUrl } from "@/lib/projects";

interface Channel {
  key: string;
  href: string;
  label: string;
  detail: string;
  external: boolean;
  icon: ReactNode;
}

/**
 * Comms: panel grande INSERT COIN + canales como filas seleccionables
 * de consola (solo se listan los configurados).
 */
export function Contact({ asPage }: { asPage?: boolean }) {
  const { contact, owner } = portfolioConfig;
  const githubUrl = `https://github.com/${owner.githubUser}`;
  const linkedin = sanitizeUrl(contact.linkedin);

  const channels: Channel[] = [
    {
      key: "github",
      href: githubUrl,
      label: "GitHub",
      detail: `@${owner.githubUser}`,
      external: true,
      icon: <GitHubIcon className="h-5 w-5" aria-hidden="true" />,
    },
  ];
  if (contact.email) {
    channels.push({
      key: "email",
      href: `mailto:${contact.email}`,
      label: "Email",
      detail: contact.email,
      external: false,
      icon: <Mail className="h-5 w-5" aria-hidden="true" />,
    });
  }
  if (linkedin) {
    channels.push({
      key: "linkedin",
      href: linkedin,
      label: "LinkedIn",
      detail: "Perfil profesional",
      external: true,
      icon: <LinkedInIcon className="h-5 w-5" aria-hidden="true" />,
    });
  }

  return (
    <Section
      id="contacto"
      as={asPage ? "h1" : "h2"}
      eyebrow={asPage ? "// comms" : "// 04 :: comms"}
      title={asPage ? "Contacto" : "Comms"}
      description="Estoy abierto a proyectos, consultas y colaboraciones. Elegí un canal."
      className="border-t border-line/70"
    >
      <Reveal variant="scale">
        <div className="relative overflow-hidden rounded-xl border border-accent/30 bg-panel shadow-pop">
          <span className="synth-card-grid" aria-hidden="true" />
          <div className="scanlines pointer-events-none absolute inset-0" aria-hidden="true" />

          <div className="relative p-6 sm:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-mute">[ comms abiertas ]</p>
            <h3 className="mt-3 font-display text-4xl font-bold uppercase tracking-wide sm:text-5xl">
              Hablemos
              <span className="term-caret ml-2 inline-block h-8 w-3 translate-y-1 bg-accent" aria-hidden="true" />
            </h3>
            <p className="mt-4 max-w-xl leading-relaxed text-mute">
              Formando parte de tu equipo o sumándome a tu proyecto: escribime y lo conversamos.
            </p>

            <ul className="mt-8 divide-y divide-line/60 border-y border-line/60">
              {channels.map((channel, index) => (
                <li key={channel.key}>
                  <Reveal variant="up" delay={index * 80}>
                    <a
                      href={channel.href}
                      {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group -mx-2 flex items-center gap-4 px-2 py-4 transition-colors hover:bg-raised/50"
                    >
                      <span className="font-mono text-accent" aria-hidden="true">
                        &gt;
                      </span>
                      <span className="text-accent">{channel.icon}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-medium">{channel.label}</span>
                        <span className="block text-sm text-mute [overflow-wrap:anywhere]">{channel.detail}</span>
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 text-mute transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                        aria-hidden="true"
                      />
                    </a>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
