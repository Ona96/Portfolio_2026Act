import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Página no encontrada</h1>
      <p className="mt-3 text-mute">La dirección no existe o el proyecto ya no está en el portfolio.</p>
      <div className="mt-6 flex gap-3">
        <Button href="/" variant="primary">
          Ir al inicio
        </Button>
        <Button href="/projects">Ver proyectos</Button>
      </div>
    </div>
  );
}
