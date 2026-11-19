# Portfolio de Kevin Rene Otto

Portfolio profesional con estética **synthwave** (neón violeta/cian sobre violetas profundos): Next.js (App Router) + TypeScript + Tailwind CSS. Los proyectos se leen de la API pública de GitHub (`Ona96`) y se actualizan solos. No usa base de datos.

> Basado en el diseño y la integración con GitHub del portfolio de [KrGabriel](https://github.com/KrGabriel), rediseñado con identidad propia.

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # opcional: el sitio funciona igual sin variables
npm run dev                  # http://localhost:3000
npm run check                # ESLint + TypeScript + build
```

Requiere Node.js 20.9 o superior.

## Variables de entorno (todas opcionales)

| Variable | Para qué sirve |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL pública. Se usa en sitemap, robots y Open Graph. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Correo de contacto. Si está vacío, no se muestra. |
| `NEXT_PUBLIC_LINKEDIN_URL` | Perfil de LinkedIn. Si está vacío, no se muestra. |
| `GITHUB_TOKEN` | Token de GitHub, solo servidor. Sube el límite de 60 a 5000 solicitudes/hora. No necesita permisos. |

Nunca pongas el token con prefijo `NEXT_PUBLIC_`: quedaría expuesto en el navegador.

## Tu foto

El Hero muestra tu foto automáticamente si existe alguno de estos archivos en `public/`:

```
public/avatar.png   (o avatar.jpg · avatar.jpeg · avatar.webp)
```

Idealmente cuadrada (1024×1024 va perfecto). Mientras no haya foto, se muestra un monograma "KO" de relleno. No hace falta tocar código.

## Cómo personalizar (`src/config/portfolio.ts`)

- **Datos personales, intro, intereses y experiencia:** el bloque `owner` y `about`.
- **Destacados:** agregá el topic `portfolio` al repositorio en GitHub, o su nombre en `repositories.featured` (hoy: `TiendaVenecia2026`).
- **Ocultar un repositorio:** topic `portfolio-exclude`, o su nombre en `repositories.excluded` (hoy: `ProyectoFacu`, `Espacio_Lenguaje`, `Portfolio_2026Act`, `lgi2023_crud`).
- **Descripción, portada, categoría o demo por proyecto:** `projectOverrides`. Las de `Ecommerce_Facu` y `copyMuebleria` son borradores breves: revisalas y sumales los detalles reales. Las portadas van en `public/projects/` y se referencian como `/projects/nombre.png`.
- **Categorías:** la categoría de un proyecto sale de sus topics de GitHub. Topics reconocidos: los `id` de `categories` (`web-development`, `ecommerce`, `management`, `backend`, `database`, `tools`).
- **Demo:** se toma del campo *Website* del repositorio en GitHub.
- **Frameworks y herramientas:** `declaredTechnologies`. Se muestran aparte de los lenguajes detectados. Vacío = el bloque no se muestra.

## Cómo funciona la integración con GitHub

`src/lib/github.ts` es el único módulo que habla con GitHub:

- Pagina de a 100 repositorios (hasta 1000).
- Cachea con `revalidate` (30 minutos). Si cambiás `repositories.revalidateSeconds`, cambiá también `export const revalidate` en `app/page.tsx`, `app/projects/page.tsx`, `app/projects/[slug]/page.tsx` y `app/sitemap.ts`.
- Si GitHub falla, usa los últimos datos buenos (`stale`) o muestra un aviso con enlace a tu perfil (`error`). El sitio nunca se rompe.
- Solo trae repositorios públicos y descarta cualquier `private`.

Importante: sin `GITHUB_TOKEN`, la IP de Vercel durante el build puede estar limitada. Si pasa, la página se genera con el aviso y se corrige sola en la siguiente revalidación. Configurar `GITHUB_TOKEN` evita el problema.

## Subir a GitHub (repo `Portfolio_2026Act`)

El proyecto ya tiene su historial git inicial. Para publicarlo:

```bash
git remote add origin https://github.com/Ona96/Portfolio_2026Act.git
git push -u origin main
```

Si GitHub lo rechaza porque el repo remoto ya tiene archivos (un README inicial, por ejemplo), podés sobreescribirlo con `git push -u origin main --force` (borra lo que haya en el remoto) o crear un repo vacío nuevo.

## Desplegar en Vercel

1. Subí este proyecto a tu repositorio de GitHub.
2. En [vercel.com/new](https://vercel.com/new), importá el repositorio. Vercel detecta Next.js solo (build `next build`, sin configuración extra).
3. En *Settings → Environment Variables* cargá las variables que quieras (ver tabla). En producción conviene cargar `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_LINKEDIN_URL` y `GITHUB_TOKEN`.
4. Desplegá. Cada `git push` a la rama principal publica una nueva versión.
5. Después del primer despliegue, poné `NEXT_PUBLIC_SITE_URL` con la URL final y redesplegá.

## Dominio propio (a futuro)

1. En Vercel: *Settings → Domains → Add* y escribí tu dominio.
2. En tu proveedor de DNS, creá el registro que Vercel indica (A `76.76.21.21` para el dominio raíz, o CNAME hacia `cname.vercel-dns.com` para un subdominio; confirmá los valores en el panel).
3. Actualizá `NEXT_PUBLIC_SITE_URL` con el dominio nuevo y redesplegá.

## Estructura

```
src/app          páginas, sitemap, robots, ícono e imagen Open Graph
src/components   layout, sections, projects y ui
src/lib          github.ts (API), projects.ts (reglas de visibilidad), utils.ts
src/config       portfolio.ts (toda la personalización)
src/types        tipos de GitHub y del portfolio
public/avatar.*  tu foto (la que estés mostrando en el Hero)
```
