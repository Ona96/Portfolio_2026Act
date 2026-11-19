"use client";

import { useEffect, useState } from "react";
import { useIdle } from "@/hooks/useIdle";
import { cn } from "@/lib/utils";

const IDLE_MS = 18_000;
const GLITCH_EVERY_MS = 45_000;
const GLITCH_DURATION_MS = 340;

/**
 * Vida propia del portfolio cuando nadie lo mira:
 * - Modo "attract" tras 18 s sin actividad: la grilla del Hero avanza
 *   hacia el sol, el sol late y las estrellas titilan (html.idle).
 * - Micro-glitch CRT cada ~45 s de navegación tranquila: sacudida
 *   sutil del contenido y parpadeo de scanlines (body.glitching).
 * Todo se desactiva con prefers-reduced-motion y en modo claro
 * (el retro vive solo en el oscuro).
 */
export function IdleEffects() {
  const idle = useIdle(IDLE_MS);
  const [flash, setFlash] = useState(false);

  // Modo attract: una clase en <html>, el CSS hace el resto.
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const light = root.classList.contains("light");
    root.classList.toggle("idle", idle && !reduced && !light);
  }, [idle]);

  // Micro-glitch periódico: muy corto, nunca mientras está inactivo.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let glitchTimeout = 0;
    let endTimeout = 0;

    const schedule = () => {
      glitchTimeout = window.setTimeout(triggerGlitch, GLITCH_EVERY_MS);
    };

    const triggerGlitch = () => {
      const root = document.documentElement;
      if (root.classList.contains("light") || root.classList.contains("idle")) {
        schedule();
        return;
      }
      setFlash(true);
      document.body.classList.add("glitching");
      endTimeout = window.setTimeout(() => {
        document.body.classList.remove("glitching");
        setFlash(false);
      }, GLITCH_DURATION_MS);
      schedule();
    };

    schedule();
    return () => {
      window.clearTimeout(glitchTimeout);
      window.clearTimeout(endTimeout);
      document.body.classList.remove("glitching");
    };
  }, []);

  return <div className={cn("crt-flash", flash && "on")} aria-hidden="true" />;
}
