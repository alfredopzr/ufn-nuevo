import Image from "next/image";
import AutoScrollCarousel from "@/components/ui/AutoScrollCarousel";
import SectionHeading from "@/components/ui/SectionHeading";
import { partners, type Partner } from "@/data/partners";

export function PartnerLogo({ partner }: { partner: Partner }) {
  const content = (
    <div className="flex w-48 shrink-0 flex-col items-center gap-2">
      <div className="flex h-24 w-full items-center justify-center rounded-xl border border-border bg-card px-4 shadow-sm transition-shadow duration-200 hover:shadow-md">
        <Image
          src={partner.image}
          alt=""
          width={160}
          height={64}
          className="max-h-16 w-auto object-contain"
          aria-hidden
        />
      </div>
      <p className="text-center text-xs font-medium leading-snug text-muted-foreground">
        {partner.name}
      </p>
    </div>
  );

  if (partner.url) {
    return (
      <a
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={partner.name}
        className="shrink-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {content}
      </a>
    );
  }

  return content;
}

export default function Partners() {
  if (partners.length === 0) return null;

  return (
    <section className="py-10 md:py-14 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Nuestros Aliados"
          subtitle="Organizaciones e instituciones que colaboran con la Universidad Frontera Norte en la formación de profesionales de excelencia."
        />

        <AutoScrollCarousel ariaLabel="Logos de aliados" speed={35}>
          {partners.map((partner) => (
            <PartnerLogo key={partner.id} partner={partner} />
          ))}
        </AutoScrollCarousel>
      </div>
    </section>
  );
}
