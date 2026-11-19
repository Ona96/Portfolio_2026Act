import { portfolioConfig } from "@/config/portfolio";

/**
 * Barra de créditos al pie (la navegación vive en el riel lateral).
 * Con horizonte synthwave y firma EOF.
 */
export function Footer() {
  const { owner } = portfolioConfig;
  const year = new Date().getFullYear();
  const profileUrl = `https://github.com/${owner.githubUser}`;

  return (
    <footer className="relative overflow-hidden border-t border-line/70">
      {/* Horizonte synthwave al pie (solo modo oscuro) */}
      <div className="synth-foot" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-mute sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {year} {owner.name}</p>
        <p className="font-mono tracking-[0.25em] text-accent/80" aria-hidden="true">
          EOF // K.R.O.
        </p>
        <p>
          Proyectos sincronizados desde{" "}
          <a
            className="text-fg underline-offset-2 hover:underline"
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}
