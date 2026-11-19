"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Cpu, FolderGit2, Home, Mail, User } from "lucide-react";
import { GitHubIcon } from "@/components/ui/icons";
import { ThemeToggle } from "@/components/ThemeToggle";
import { portfolioConfig } from "@/config/portfolio";
import { cn } from "@/lib/utils";

const GITHUB_URL = `https://github.com/${portfolioConfig.owner.githubUser}`;

const LINKS = [
  { href: "/", section: "inicio", label: "Inicio", icon: Home },
  { href: "/projects", section: "proyectos", label: "Proyectos", icon: FolderGit2 },
  { href: "/#tecnologias", section: "tecnologias", label: "Tecnologías", icon: Cpu },
  { href: "/about", section: "sobre-mi", label: "Sobre mí", icon: User },
  { href: "/contact", section: "contacto", label: "Contacto", icon: Mail },
] as const;

/** Scroll-spy: marca la sección visible mientras se navega la home. */
function useScrollSpy(pathname: string): string {
  const [active, setActive] = useState("");

  useEffect(() => {
    if (pathname !== "/") {
      setActive("");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -60% 0px", threshold: 0 },
    );
    LINKS.forEach(({ section }) => {
      const el = document.getElementById(section);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  return active;
}

/** Progreso del scroll (0 a 1) para la línea vertical del riel. */
function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return progress;
}

/**
 * Marco del sitio: riel lateral con puntos de navegación (desktop) y
 * barra inferior tipo app (móvil). Reemplaza la barra superior clásica
 * y vive durante todo el recorrido, con la línea de progreso integrada.
 */
export function RailShell() {
  const pathname = usePathname();
  const spy = useScrollSpy(pathname);
  const progress = useScrollProgress();

  function isActive(link: (typeof LINKS)[number]): boolean {
    if (link.href === "/") return pathname === "/" && (spy === "" || spy === "inicio");
    if (link.href === "/#tecnologias") return pathname === "/" && spy === "tecnologias";
    return pathname === link.href || pathname.startsWith(`${link.href}/`);
  }

  return (
    <>
      {/* Riel lateral (desktop) */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-20 flex-col items-center border-r border-line/70 bg-panel/70 backdrop-blur-md lg:flex">
        <Link
          href="/"
          aria-label="Kevin Rene Otto · inicio"
          className="rail-logo mt-5 select-none font-display text-2xl font-bold tracking-wide"
        >
          <span className="text-gradient">KO</span>
        </Link>

        <nav aria-label="Secciones" className="mt-12 flex flex-1 flex-col items-center gap-6">
          {LINKS.map((link) => {
            const active = isActive(link);
            return (
              <Link
                key={link.section}
                href={link.href}
                title={link.label}
                aria-label={link.label}
                aria-current={active ? "page" : undefined}
                className="group relative inline-flex h-6 w-6 items-center justify-center"
              >
                <span
                  className={cn(
                    "h-2.5 w-2.5 rounded-full transition-all duration-200",
                    active
                      ? "bg-accent shadow-[0_0_10px_rgb(var(--accent)/0.8)]"
                      : "bg-line group-hover:bg-mute",
                  )}
                  aria-hidden="true"
                />
                <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded border border-line bg-panel px-2 py-1 font-mono text-[10px] uppercase tracking-widest opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="mb-6 flex flex-col items-center gap-5">
          <ThemeToggle />
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Perfil de GitHub"
            className="text-mute transition-colors hover:text-accent"
          >
            <GitHubIcon className="h-4 w-4" aria-hidden="true" />
          </a>
          <span className="pulse-dot h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
        </div>

        {/* Progreso vertical de lectura */}
        <span className="pointer-events-none absolute inset-y-0 right-0 w-0.5 bg-line/40" aria-hidden="true">
          <span
            className="block h-full w-full origin-top bg-gradient-to-b from-accent to-accent-2"
            style={{ transform: `scaleY(${progress})` }}
          />
        </span>
      </aside>

      {/* Barra inferior tipo app (móvil) */}
      <nav
        aria-label="Navegación"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line/70 bg-panel/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
      >
        <ul className="grid grid-cols-6">
          {LINKS.map((link) => {
            const active = isActive(link);
            const Icon = link.icon;
            return (
              <li key={link.section}>
                <Link
                  href={link.href}
                  aria-label={link.label}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex flex-col items-center gap-1 py-2.5 transition-colors",
                    active ? "text-accent" : "text-mute hover:text-fg",
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <span
                    className={cn("h-1 w-1 rounded-full bg-current transition-opacity", active ? "opacity-100" : "opacity-0")}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            );
          })}
          <li className="flex items-center justify-center">
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </>
  );
}
