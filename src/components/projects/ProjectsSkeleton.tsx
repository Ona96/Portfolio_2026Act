export function ProjectsSkeleton() {
  return (
    <div role="status" aria-label="Cargando proyectos" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="h-64 animate-pulse rounded-xl border border-line bg-panel" />
      ))}
    </div>
  );
}
