import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  kicker?: string;
  title: string;
  titleEmphasis?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  imageSrc?: string | StaticImageData;
  imageAlt?: string;
}

export default function Hero({
  kicker,
  title,
  titleEmphasis,
  subtitle,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  imageSrc,
  imageAlt = "",
}: HeroProps) {
  return (
    <section className="relative w-full bg-background py-24 md:py-32 lg:py-40 overflow-hidden">
      <div className="container relative mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text column */}
          <div className="max-w-2xl">
            {kicker && (
              <p className="text-sm font-semibold uppercase tracking-widest text-secondary mb-4">
                {kicker}
              </p>
            )}

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              {title}
              {titleEmphasis && (
                <>
                  <br />
                  <em className="text-primary">{titleEmphasis}</em>
                </>
              )}
            </h1>

            {subtitle && (
              <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
                {subtitle}
              </p>
            )}

            {(ctaText || secondaryCtaText) && (
              <div className="mt-10 flex flex-wrap items-center gap-4">
                {ctaText && ctaHref && (
                  <Button variant="secondary" size="lg" asChild>
                    <Link href={ctaHref}>{ctaText}</Link>
                  </Button>
                )}
                {secondaryCtaText && secondaryCtaHref && (
                  <Button variant="link" size="lg" asChild className="text-foreground">
                    <Link href={secondaryCtaHref}>
                      {secondaryCtaText}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Image column */}
          {imageSrc && (
            <div className="relative hidden lg:block">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  priority
                  sizes="(min-width: 1024px) 50vw, 0vw"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
