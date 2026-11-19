"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { portfolioConfig } from "@/config/portfolio";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { href: "/projects", label: "Proyectos" },
  { href: "/#tecnologias", label: "Tecnologías" },
  { href: "/about", label: "Sobre mí" },
  { href: "/contact", label: "Contacto" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="group font-mono text-sm font-medium tracking-tight" onClick={() => setOpen(false)}>
          {portfolioConfig.owner.githubUser.toLowerCase()}
          <span className="text-accent transition-opacity group-hover:opacity-70">/</span>portfolio
        </Link>

        <div className="flex items-center gap-2">
          <nav aria-label="Principal" className="hidden gap-1 sm:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm transition-colors hover:bg-raised/70 hover:text-fg",
                  pathname === link.href ? "text-fg" : "text-mute",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <ThemeToggle />

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-mute transition-colors hover:text-fg sm:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-movil" aria-label="Principal móvil" className="border-t border-line/70 bg-panel px-5 py-3 sm:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-2 py-2.5 text-sm text-mute transition-colors hover:bg-raised/70 hover:text-fg"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
