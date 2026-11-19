import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/Button";
import { portfolioConfig } from "@/config/portfolio";
import { sanitizeUrl } from "@/lib/projects";
import { formatDate, languageColor } from "@/lib/utils";
import type { PortfolioData } from "@/types/github";

const AREAS = ["E-commerce", "Desarrollo web", "Sistemas de gestión", "Análisis de sistemas"];

/** Tu foto vive en public/ con alguno de estos nombres; aparece sola, sin tocar código. */
const PHOTO_CANDIDATES = ["avatar.png", "avatar.jpg", "avatar.jpeg", "avatar.webp"];

/** Busca la foto en public/ (componente de servidor: se resuelve en cada render). */
function findPhoto(): string | null {
  for (const name of PHOTO_CANDIDATES) {
    try {
      if (existsSync(path.join(process.cwd(), "public", name))) return `/${name}`;
    } catch {
      // sin acceso al filesystem: se muestra el monograma
    }
  }
  return null;
}

export function Hero({ data }: { data: PortfolioData }) {
  const { owner } = portfolioConfig;
  const latest = data.projects[0];
  const profile = data.profile;
  const linkedin = sanitizeUrl(portfolioConfig.contact.linkedin);
  const profileUrl = `https://github.com/${owner.githubUser}`;
  const photo = findPhoto();

  return (
    <section className="relative overflow-hidden">
      {/* Cielo synthwave: estrellas, sol retro y piso en perspectiva (solo modo oscuro) */}
      <div className="synth-stars pointer-events-none absolute inset-x-0 top-0 h-[58%]" aria-hidden="true" />
      <div className="synth-sun pointer-events-none" aria-hidden="true" />
      <div className="synth-floor pointer-events-none" aria-hidden="true" />
      <div className="bg-glow pointer-events-none absolute -top-32 left-1/2 h-96 w-[42rem] max-w-none -translate-x-1/2" aria-hidden="true" />
      <div className="scanlines pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="hero-rise">
          <ul className="mb-6 flex flex-wrap gap-2" aria-label="Áreas de trabajo">
            {AREAS.map((area) => (
              <li
                key={area}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-panel/70 px-3 py-1 text-xs text-mute backdrop-blur"
              >
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                {area}
              </li>
            ))}
          </ul>

          <h1 className="text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl">
            <span className="text-gradient">{owner.name}</span>
          </h1>
          <p className="mt-4 text-xl text-fg/90 sm:text-2xl">{owner.role}</p>
          <p className="mt-5 max-w-xl leading-relaxed text-mute">{owner.intro}</p>
          <p className="mt-3 inline-flex items-center gap-1.5 font-mono text-sm text-mute">
            <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
            {owner.location}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/projects" variant="primary" className="glow-accent">
              Explorar proyectos
            </Button>
            <Button href="/contact">Contacto</Button>
            <div className="flex gap-2">
              <Button href={profileUrl} external variant="ghost" className="!px-3" aria-label="Ver perfil de GitHub">
                <GitHubIcon className="h-4 w-4" aria-hidden="true" /> GitHub
              </Button>
              {linkedin && (
                <Button href={linkedin} external variant="ghost" className="!px-3" aria-label="Ver perfil de LinkedIn">
                  <LinkedInIcon className="h-4 w-4" aria-hidden="true" /> LinkedIn
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="hero-rise-late space-y-4">
          {/* Foto personal en marco neón: si todavía no hay foto en public/,
              se muestra un monograma hasta que agregues la tuya. */}
          <div className="relative mx-auto w-60 sm:w-72">
            <div className="bg-glow pointer-events-none absolute -inset-10" aria-hidden="true" />
            <div className="relative rounded-2xl border border-accent/30 bg-panel/80 p-2 shadow-pop backdrop-blur">
              {photo ? (
                <Image
                  src={photo}
                  alt={`Foto de ${owner.name}`}
                  width={1024}
                  height={1024}
                  priority
                  className="aspect-square w-full rounded-xl object-cover"
                />
              ) : (
                <div
                  className="flex aspect-square w-full select-none flex-col items-center justify-center rounded-xl bg-raised text-center"
                  aria-label="Espacio reservado para la foto"
                  role="img"
                >
                  <span className="text-gradient font-mono text-7xl font-bold tracking-tight">KO</span>
                  <span className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-mute">
                    Kevin Rene Otto
                  </span>
                </div>
              )}
              <div className="scanlines pointer-events-none absolute inset-2 rounded-xl" aria-hidden="true" />
              {/* Esquinas estilo HUD retro */}
              <span className="absolute -left-1.5 -top-1.5 h-5 w-5 rounded-tl-md border-l-2 border-t-2 border-accent" aria-hidden="true" />
              <span className="absolute -right-1.5 -top-1.5 h-5 w-5 rounded-tr-md border-r-2 border-t-2 border-accent" aria-hidden="true" />
              <span className="absolute -bottom-1.5 -left-1.5 h-5 w-5 rounded-bl-md border-b-2 border-l-2 border-accent" aria-hidden="true" />
              <span className="absolute -bottom-1.5 -right-1.5 h-5 w-5 rounded-br-md border-b-2 border-r-2 border-accent" aria-hidden="true" />
            </div>
          </div>

          {/* Datos reales de GitHub; si no están disponibles, el bloque se omite. */}
          {data.status !== "error" && (
            <aside
              aria-label="Actividad en GitHub"
              className="hero-rise-later rounded-xl border border-line bg-panel/80 p-4 shadow-card backdrop-blur"
            >
              <div className="flex items-center gap-3">
                {profile && (
                  <Image
                    src={profile.avatarUrl}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full border border-line"
                    priority
                  />
                )}
                <div className="min-w-0">
                  <p className="truncate font-mono text-sm">@{profile?.login ?? owner.githubUser}</p>
                  <p className="text-xs text-mute">{data.projects.length} proyectos en el portfolio</p>
                </div>
                {data.languages.length > 0 && (
                  <ul className="ml-auto hidden shrink-0 items-center gap-1.5 sm:flex" aria-label="Lenguajes principales">
                    {data.languages.slice(0, 4).map((l) => (
                      <li key={l.name} className="inline-flex items-center gap-1.5 text-xs text-mute">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: languageColor(l.name) }}
                          aria-hidden="true"
                        />
                        {l.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {latest && (
                <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-xs text-mute">
                  <span>
                    Última actividad:{" "}
                    <span className="font-mono text-fg/80">{latest.name}</span>
                  </span>
                  <span>{formatDate(latest.updatedAt)}</span>
                </div>
              )}
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
