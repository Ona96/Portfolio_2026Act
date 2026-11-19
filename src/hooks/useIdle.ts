"use client";

import { useEffect, useRef, useState } from "react";

const EVENTS: Array<keyof WindowEventMap> = ["mousemove", "mousedown", "keydown", "wheel", "touchstart", "scroll"];

/**
 * Devuelve true cuando pasan `delay` ms sin actividad del usuario
 * (mouse, teclado, scroll o touch). Cualquier interacción corta el
 * estado inactivo y relanza el temporizador.
 */
export function useIdle(delay = 18_000): boolean {
  const [idle, setIdle] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const start = () => {
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setIdle(true), delay);
    };
    const onActivity = () => {
      setIdle(false);
      start();
    };

    start();
    EVENTS.forEach((event) => window.addEventListener(event, onActivity, { passive: true }));
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
      EVENTS.forEach((event) => window.removeEventListener(event, onActivity));
    };
  }, [delay]);

  return idle;
}
