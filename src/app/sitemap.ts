import { MetadataRoute } from "next";
import { programs } from "@/data/programs";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://cesfn.edu.mx";

  const staticPages = [
    "",
    "/carreras",
    "/inscripcion",
    "/noticias",
    "/contacto",
    "/preguntas-frecuentes",
  ];

  const programPages = programs.map((p) => `/carreras/${p.slug}`);

  return [...staticPages, ...programPages].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
