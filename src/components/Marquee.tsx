interface MarqueeProps {
  items: readonly string[];
}

/** Fila de contenido; se repite para que el loop nunca muestre un hueco. */
function Row({ items, hidden }: { items: readonly string[]; hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden} className="flex shrink-0 select-none items-center">
      {items.map((item, index) => (
        <li
          key={`${item}-${index}`}
          className="flex items-center gap-10 whitespace-nowrap pl-10 font-mono text-xs uppercase tracking-[0.3em] text-mute"
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * Cinta infinita de tecnologías entre el Hero y el contenido.
 * Dos filas idénticas + translateX(-50%) = loop sin cortes, puro CSS.
 * Decorativa: toda la cinta queda oculta a lectores de pantalla.
 */
export function Marquee({ items }: MarqueeProps) {
  if (items.length === 0) return null;
  const filled: readonly string[] = items.length < 6 ? [...items, ...items, ...items] : items;

  return (
    <div aria-hidden="true" className="relative overflow-hidden border-y border-line/70 bg-panel/60">
      <div className="marquee-track flex w-max py-3.5">
        <Row items={filled} />
        <Row items={filled} hidden />
      </div>
      {/* Fundidos en los bordes para que la cinta "entre y salga" de la nada */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-ink to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-ink to-transparent" aria-hidden="true" />
    </div>
  );
}
