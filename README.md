# Hola, soy Kevin 👋

Este repo es el código de mi portfolio. Está hecho con Next.js (App Router) + TypeScript + Tailwind, y tiene una estética retro/arcade: modo oscuro por defecto, neones violetas, una pantalla de arranque estilo consola y algunos detalles "de videojuego" por ahí.

La parte que más me gusta: **los proyectos se sincronizan solos con mi GitHub** (`Ona96`). No hay base de datos ni nada que actualizar a mano — cuando subo un repo público, aparece acá. Los datos se refrescan cada media hora. Si a un repo le agrego el topic `portfolio` queda destacado, y con `portfolio-exclude` lo escondo.

## Para correrlo local

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # lint + types + build
```

Necesitás Node 20.9 o más nuevo.

## Variables de entorno

Ninguna es obligatoria, el sitio anda igual sin ellas. Si querés tunear algo, van en `.env.local`:

- `NEXT_PUBLIC_CONTACT_EMAIL` — el email que se muestra en contacto
- `NEXT_PUBLIC_LINKEDIN_URL` — link al perfil de LinkedIn
- `NEXT_PUBLIC_SITE_URL` — la URL pública del sitio (para el sitemap y las previews al compartir el link)
- `GITHUB_TOKEN` — un token de GitHub sin permisos, para pasar de 60 a 5000 requests/hora (solo lo usa el servidor)

Ojo: nunca le pongas prefijo `NEXT_PUBLIC_` al token, quedaría expuesto en el navegador.

## Si querés meter mano

- `src/config/portfolio.ts` — todo lo personalizable vive acá: mis datos, qué repos se muestran o se ocultan, categorías y descripciones por proyecto.
- `public/avatar.png` — mi foto para el hero (si no existe, se muestra un monograma).
- `src/lib/github.ts` — la única parte que habla con la API de GitHub, por si querés entender cómo funciona la sincronización.

## Deploy

Pensado para Vercel: importás el repo, cargás las variables que quieras y listo. Cada `git push` a main publica una versión nueva.

---

Este proyecto arrancó de una base que me compartió un amigo, y después le metí mano al diseño y la interacción hasta que quedó con mi estilo. Si te sirve de referencia para armar el tuyo, dale — pero escribime antes, me encontrás en el footer del sitio.
