import { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqCategories, faqItems } from "@/data/faq";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes",
  description:
    "Encuentra respuestas a las preguntas más frecuentes sobre admisiones, costos, vida académica y trámites en la Universidad Frontera Norte en Reynosa, Tamaulipas.",
};

export default function PreguntasFrecuentesPage() {
  return (
    <>
      <Hero
        title="Preguntas Frecuentes"
        subtitle="Resolvemos tus dudas sobre admisiones, costos, programas académicos y trámites"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {faqCategories.map((category) => {
              const categoryItems = faqItems.filter(
                (item) => item.category === category
              );

              return (
                <div key={category} className="mb-12 last:mb-0">
                  <SectionHeading title={category} />

                  <Accordion type="single" collapsible className="w-full">
                    {categoryItems.map((item, index) => (
                      <AccordionItem
                        key={index}
                        value={`${category}-${index}`}
                      >
                        <AccordionTrigger>{item.question}</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground leading-relaxed">
                            {item.answer}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
