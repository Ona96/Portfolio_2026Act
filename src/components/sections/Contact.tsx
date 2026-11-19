import type { ReactNode } from "react";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { portfolioConfig } from "@/config/portfolio";
import { sanitizeUrl } from "@/lib/projects";

/** Tarjeta de canal de contacto; sólo se muestran los configurados. */
function ContactCard({
  href,
  label,
  detail,
  external,
  children,
}: {
  href: string;
  label: string;
  detail: string;
  external?: boolean;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex min-w-0 items-center gap-4 rounded-xl border border-line bg-panel p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-pop"
    >
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-raised text-accent">
        {children}
      </span>
      <span className="min-w-0">
        <span className="block font-medium">{label}</span>
        <span className="block text-sm text-mute [overflow-wrap:anywhere]">{detail}</span>
      </span>
    </a>
  );
}

export function Contact({ asPage }: { asPage?: boolean }) {
  const { contact, owner } = portfolioConfig;
  const githubUrl = `https://github.com/${owner.githubUser}`;
  const linkedin = sanitizeUrl(contact.linkedin);
  const whatsapp = contact.whatsapp ? `https://wa.me/${contact.whatsapp}` : "";

  const cards: Array<{ key: string; body: ReactNode }> = [
    {
      key: "github",
      body: (
        <ContactCard href={githubUrl} label="GitHub" detail={`@${owner.githubUser}`} external>
          <GitHubIcon className="h-5 w-5" aria-hidden="true" />
        </ContactCard>
      ),
    },
  ];
  if (contact.email) {
    cards.push({
      key: "email",
      body: <ContactCard href={`mailto:${contact.email}`} label="Email" detail={contact.email}>
        <Mail className="h-5 w-5" aria-hidden="true" />
      </ContactCard>,
    });
  }
  if (whatsapp) {
    cards.push({
      key: "whatsapp",
      body: (
        <ContactCard href={whatsapp} label="WhatsApp" detail="Chat directo" external>
          <WhatsAppIcon className="h-5 w-5" aria-hidden="true" />
        </ContactCard>
      ),
    });
  }
  if (linkedin) {
    cards.push({
      key: "linkedin",
      body: (
        <ContactCard href={linkedin} label="LinkedIn" detail="Perfil profesional" external>
          <LinkedInIcon className="h-5 w-5" aria-hidden="true" />
        </ContactCard>
      ),
    });
  }

  /** Columnas según cantidad de tarjetas: la fila se completa sin huecos. */
  const gridCols = [
    "",
    "mx-auto max-w-sm",
    "sm:grid-cols-2",
    "sm:grid-cols-2 lg:grid-cols-3",
    "sm:grid-cols-2 lg:grid-cols-4",
  ][cards.length];

  return (
    <Section
      id="contacto"
      as={asPage ? "h1" : "h2"}
      eyebrow={asPage ? "Contacto" : "04 · Contacto"}
      title={asPage ? "Contacto" : "Hablemos"}
      description="Estoy abierto a proyectos, consultas y colaboraciones. Podés encontrarme en estos canales."
      className="border-t border-line/70"
    >
      <div className={cn("grid gap-4", gridCols)}>
        {cards.map((card, index) => (
          <Reveal key={card.key} delay={index * 70} className="min-w-0">
            {card.body}
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
