export interface Testimonial {
  name: string;
  program: string;
  year: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "María García López",
    program: "Administración de Empresas",
    year: "Generación 2023",
    quote:
      "La UFN me brindó las herramientas y la confianza para emprender mi propio negocio. Los profesores siempre estuvieron dispuestos a guiarme más allá del aula.",
  },
  {
    name: "Carlos Rodríguez Peña",
    program: "Sistemas Computacionales",
    year: "Generación 2022",
    quote:
      "Gracias a la formación práctica que recibí, conseguí trabajo en una empresa de tecnología antes de graduarme. La preparación en la UFN marcó la diferencia.",
  },
  {
    name: "Ana Sofía Martínez",
    program: "Comercio Internacional",
    year: "Generación 2024",
    quote:
      "Estudiar en la UFN me abrió puertas a oportunidades internacionales. La comunidad académica y el enfoque práctico hacen que cada día de estudio valga la pena.",
  },
];
