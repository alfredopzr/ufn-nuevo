import { SiteConfig, NavItem, StatItem } from "@/types";

export const siteConfig: SiteConfig = {
  name: "UFN",
  fullName: "Universidad Frontera Norte",
  tagline:
    "Formando líderes con educación de calidad en Reynosa y todo Tamaulipas",
  description:
    "En la Universidad Frontera Norte, nos destacamos por ser una institución dinámica, capaz de responder a los requerimientos locales, nacionales y globales. Los estudiantes encuentran una comunidad académica que fomenta el crecimiento personal y profesional.",
  sepCredential: "28PSU0198S",
  contact: {
    phones: ["899-454-6840", "899-454-6836"],
    whatsapp: "899-160-4645",
  },
  social: {
    facebook: "https://www.facebook.com/UniversidadFronteraNorte",
    twitter: "https://twitter.com/UFronteraNorte",
    instagram: "https://www.instagram.com/ufronteranorte/",
    linkedin: "https://www.linkedin.com/company/universidad-frontera-norte/?viewAsMember=true",
    youtube: "https://www.youtube.com/@ufronteranorte",
  },
  address: {
    street: "J. B. Chapa 787 y Colón",
    colony: "Centro",
    city: "Reynosa",
    state: "Tamaulipas",
    zip: "88500",
    country: "México",
    full: "J. B. Chapa 787 y Colón, Centro, Reynosa, Tamaulipas, C.P. 88500, México",
    googleMapsUrl: "https://goo.gl/maps/YdXZAmDUrpvgPHbR8",
  },
};

export const navigation: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Carreras", href: "/carreras" },
  { label: "Inscripción", href: "/inscripcion" },
  { label: "Noticias", href: "/noticias" },
  { label: "FAQ", href: "/preguntas-frecuentes" },
  { label: "Contacto", href: "/contacto" },
];

export const stats: StatItem[] = [
  { value: "6", label: "Programas Académicos" },
  { value: "+XYZ", label: "Años de Experiencia" },
  { value: "XYZ+", label: "Egresados" },
  { value: "SEP", label: "Validez Oficial" },
];
