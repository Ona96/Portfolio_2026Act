"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/**
 * Selector de tema. El estado inicial lo fija el script anti-parpadeo del
 * layout (lee localStorage o prefiere el tema del sistema); este botón
 * alterna la clase y guarda la preferencia.
 */
export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  function toggle() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.classList.toggle("light", !next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // almacenamiento no disponible: el tema solo vive en la sesión
    }
    setDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={mounted ? (dark ? "Activar modo claro" : "Activar modo oscuro") : "Cambiar tema"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-panel text-mute transition-colors hover:border-accent/50 hover:text-fg"
    >
      {mounted && dark ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
