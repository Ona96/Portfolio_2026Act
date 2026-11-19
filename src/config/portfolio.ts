/**
 * Configuración central del portfolio.
 * Editá este archivo para controlar qué se muestra, sin tocar la integración con GitHub.
 * Todo lo que quede vacío simplemente no se muestra: nada se rellena con datos inventados.
 */

export interface ProjectOverride {
  /** Reemplaza la descripción de GitHub. */
  description?: string;
  /** Imagen de portada, ruta dentro de /public. Ej: "/projects/mi-repo.png" */
  cover?: string;
  /** Id de categoría (ver `categories`). Si falta, se deduce de los topics. */
  category?: string;
  /** Reemplaza la URL de demo (por defecto, el campo "Website" del repositorio). Usá null para ocultar la demo. */
  demoUrl?: string | null;
}

export interface Category {
  id: string; // coincide con el Topic de GitHub
  label: string;
}

export interface DeclaredTechnology {
  name: string;
  group: string; // Ej: "Frameworks", "Herramientas", "Infraestructura"
}

export interface ExperienceItem {
  title: string;
  organization?: string;
  period?: string;
  description?: string;
}

export const portfolioConfig = {
  owner: {
    name: "Kevin Rene Otto",
    githubUser: "Ona96",
    role: "Desarrollador junior · Analista de Sistemas en formación",
    location: "Jardín América, Misiones, Argentina",
    intro:
      "Estoy finalizando la carrera de Análisis de Sistemas y acompaño mi formación con proyectos reales como desarrollador freelance. Me interesa participar del ciclo completo de una solución: entender el problema, modelar los datos y llevar el código a producción. En este espacio comparto mis proyectos y lo que voy construyendo por el camino.",
  },

  site: {
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    locale: "es_AR",
    description:
      "Portfolio de Kevin Rene Otto, desarrollador junior y estudiante de Análisis de Sistemas en Jardín América, Misiones. E-commerce, sistemas de gestión y proyectos sincronizados con GitHub.",
  },

  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
    /** Número con código de país, sin + ni espacios. Vacío = no se muestra. */
    whatsapp: "",
  },

  about: {
    paragraphs: [
      "Soy Kevin Rene Otto, desarrollador junior desde Jardín América, Misiones. Estoy por recibirme de Analista de Sistemas y ya acumulé experiencia en proyectos reales como desarrollador freelance.",
      "Me motiva participar del ciclo completo de una solución: relevar el problema, modelar los datos, desarrollar la aplicación y verla funcionando donde se necesita.",
      "Trabajé en proyectos de e-commerce y sistemas de gestión, y participé de NAVes, el programa de innovación de Banco Macro.",
      "Mi perfil es generalista: hoy desarrollo principalmente con PHP y TypeScript, y estoy abierto a aprender lo que cada proyecto pida.",
    ],

    interests: [
      "Desarrollo web",
      "E-commerce",
      "PHP y Laravel",
      "TypeScript",
      "Bases de datos",
      "Sistemas de gestión",
      "Análisis de sistemas",
    ],

    experience: [
      {
        title: "Desarrollador freelance",
        description: "Desarrollo de proyectos de e-commerce y sistemas de gestión para clientes reales.",
      },
      {
        title: "Participante de NAVes",
        organization: "Banco Macro",
        description: "Programa de innovación de Banco Macro.",
      },
    ] as ExperienceItem[],
  },

  repositories: {
    includeArchived: false,
    includeForks: false,

    featuredTopic: "portfolio",
    excludeTopic: "portfolio-exclude",

    featured: ["TiendaVenecia2026"],

    /** Repositorios ocultos: proyecto a medio camino, repos vacíos, fork del trabajo grupal y el propio portfolio. */
    excluded: ["ProyectoFacu", "Espacio_Lenguaje", "Portfolio_2026Act", "lgi2023_crud"],

    maxLanguageRequests: 30,
    revalidateSeconds: 1800,
  },

  categories: [
    { id: "web-development", label: "Desarrollo web" },
    { id: "ecommerce", label: "E-commerce" },
    { id: "management", label: "Sistemas de gestión" },
    { id: "backend", label: "Backend" },
    { id: "database", label: "Bases de datos" },
    { id: "tools", label: "Herramientas" },
  ] as Category[],

  /**
   * Ajustes por repositorio, indexados por nombre exacto.
   * Las descripciones reemplazan al campo `description` de la API de GitHub
   * cuando el repo no la tiene. Las de abajo son BORRADORES breves y honestos:
   * revisalas y enriquecelas cuando quieras con los detalles reales.
   */
  projectOverrides: {
    Ecommerce_Facu: {
      category: "web-development",
      description: "E-commerce desarrollado en PHP como proyecto académico para la facultad.",
    },
    copyMuebleria: {
      category: "management",
      description:
        "Sistema de gestión para una mueblería: copia de trabajo del proyecto en el que participé como colaborador.",
    },
  } as Record<string, ProjectOverride>,

  /**
   * Frameworks y herramientas que declarás vos. Se muestran separados de los
   * lenguajes detectados automáticamente. Mientras esté vacío, el bloque no se muestra.
   */
  declaredTechnologies: [] as DeclaredTechnology[],
} as const;

export type PortfolioConfig = typeof portfolioConfig;
