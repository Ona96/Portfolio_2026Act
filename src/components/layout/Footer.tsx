import Link from "next/link";
import { GitHubIcon } from "@/components/ui/icons";
import { portfolioConfig } from "@/config/portfolio";

export function Footer() {
  const { owner } = portfolioConfig;
  const year = new Date().getFullYear();
  const profileUrl = `https://github.com/${owner.githubUser}`;

  return (
    <footer className="border-t border-line/70">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:grid-cols-[1.5fr_1fr_1fr] sm:px-8">
        <div>
          <p className="font-mono text-sm font-medium">
            {owner.githubUser.toLowerCase()}
            <span className="text-accent">/</span>portfolio
          </p>
          <p className="mt-2 max-w-xs text-sm text-mute">{owner.role}.</p>
          <p className="mt-1 max-w-xs text-sm text-mute">{owner.location}.</p>
        </div>
        <nav aria-label="Navegación del pie" className="text-sm">
          <p className="mb-3 font-medium">Navegación</p>
          <ul className="space-y-2 text-mute">
            <li><Link className="transition-colors hover:text-fg" href="/projects">Proyectos</Link></li>
            <li><Link className="transition-colors hover:text-fg" href="/#tecnologias">Tecnologías</Link></li>
            <li><Link className="transition-colors hover:text-fg" href="/about">Sobre mí</Link></li>
            <li><Link className="transition-colors hover:text-fg" href="/contact">Contacto</Link></li>
          </ul>
        </nav>
        <div className="text-sm">
          <p className="mb-3 font-medium">Enlaces</p>
          <ul className="space-y-2 text-mute">
            <li>
              <a
                className="inline-flex items-center gap-1.5 transition-colors hover:text-fg"
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon className="h-3.5 w-3.5" aria-hidden="true" /> GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line/50">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-mute sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {year} {owner.name}
          </p>
          <p>
            Proyectos sincronizados desde{" "}
            <a className="text-fg underline-offset-2 hover:underline" href={profileUrl} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
