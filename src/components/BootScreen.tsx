"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const LINES = [
  "KEVIN-OS v2.0 // synthware",
  "cargando módulos ......... ok",
  "github: sincronizado ..... ok",
  "interfaz ................. LISTA",
];

const STEP_MS = 240;
const START_MS = 250;

/**
 * Arranque retro: pantalla de boot la primera vez de cada visita.
 * - Solo con JS y sin prefers-reduced-motion; una vez por sesión.
 * - Se salta con un clic o cualquier tecla.
 * - Si no corre, no se pierde nada: el sitio carga normal.
 */
export function BootScreen() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers: number[] = [];
    let done = false;

    const skip = () => {
      if (done) return;
      done = true;
      timers.forEach((t) => window.clearTimeout(t));
      setVisible(false);
    };

    try {
      if (sessionStorage.getItem("booted") === "1") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      sessionStorage.setItem("booted", "1");
    } catch {
      // sin storage: se muestra igual, una vez por carga
    }

    setVisible(true);
    LINES.forEach((_, i) => {
      timers.push(window.setTimeout(() => setStep(i + 1), START_MS + i * STEP_MS));
    });
    const full = START_MS + LINES.length * STEP_MS + 420;
    timers.push(window.setTimeout(() => setClosing(true), full));
    timers.push(window.setTimeout(() => setVisible(false), full + 350));

    window.addEventListener("keydown", skip);
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.removeEventListener("keydown", skip);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-label="Cargando el portfolio"
      onClick={() => setVisible(false)}
      className={cn(
        "fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center gap-7 bg-ink transition-opacity duration-300",
        closing && "opacity-0",
      )}
    >
      <p className="font-display text-4xl font-bold tracking-[0.25em] sm:text-5xl">
        <span className="text-gradient">KEVIN-OS</span>
      </p>
      <ul className="space-y-1.5 text-center font-mono text-xs text-mute sm:text-sm">
        {LINES.slice(0, step).map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <div className="h-1 w-44 overflow-hidden rounded-full bg-raised" aria-hidden="true">
        <div className="boot-bar h-full bg-gradient-to-r from-accent to-accent-2" />
      </div>
    </div>
  );
}
