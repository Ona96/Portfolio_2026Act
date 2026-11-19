"use client";

import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Inclina el contenido hacia el puntero (solo dispositivos con puntero
 * fino y sin prefers-reduced-motion). Solo escribe transform inline:
 * el layout no se recalcula y al salir vuelve suavemente a su lugar.
 */
export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useRef(false);

  useEffect(() => {
    enabled.current =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  function onMove(event: MouseEvent<HTMLDivElement>) {
    if (!enabled.current) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.transition = "none";
    el.style.transform = `perspective(700px) rotateX(${(-py * 4).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg)`;
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "";
    el.style.transform = "";
  }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={cn("tilt h-full", className)}>
      {children}
    </div>
  );
}
