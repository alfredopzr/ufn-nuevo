import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";

const galleryImages = [
  { src: "/images/campus/campus-1.jpg", alt: "Fachada del campus", span: "col-span-1 row-span-2" },
  { src: "/images/campus/campus-2.jpg", alt: "Estudiantes en aula", span: "col-span-1 row-span-1" },
  { src: "/images/campus/campus-3.jpg", alt: "Biblioteca", span: "col-span-1 row-span-1" },
  { src: "/images/campus/campus-4.jpg", alt: "Laboratorio de cómputo", span: "col-span-1 row-span-1" },
  { src: "/images/campus/campus-5.jpg", alt: "Evento académico", span: "col-span-1 row-span-2" },
  { src: "/images/campus/campus-6.jpg", alt: "Áreas comunes", span: "col-span-1 row-span-1" },
];

export default function CampusGallery() {
  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Vida en el Campus"
          subtitle="Descubre nuestras instalaciones y la experiencia universitaria en la UFN"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[200px] gap-4 max-w-5xl mx-auto">
          {galleryImages.map((image) => (
            <div
              key={image.src}
              className={`${image.span} relative rounded-xl overflow-hidden group cursor-pointer`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors duration-300 flex items-end">
                <span className="text-white text-sm font-medium p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.alt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
