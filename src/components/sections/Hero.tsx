import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface HeroProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  backgroundImage?: string;
}

export default function Hero({
  title,
  subtitle,
  ctaText,
  ctaHref,
  backgroundImage,
}: HeroProps) {
  return (
    <section className="relative w-full bg-[hsl(217,71%,15%)] py-24 md:py-36 overflow-hidden">
      {/* Background */}
      {backgroundImage ? (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/60 to-[hsl(217,71%,20%)]/75" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(217,71%,28%)] via-primary to-[hsl(217,71%,18%)]" />
      )}

      {/* Geometric accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-[28rem] h-[28rem] rounded-full border border-white/10 animate-hero-float" />
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/[0.04] animate-hero-float" />
        <div className="absolute -bottom-28 -left-28 w-80 h-80 rounded-full border border-white/10 animate-hero-float-slow" />
        <div className="absolute -bottom-28 -left-28 w-64 h-64 rounded-full bg-white/[0.06] animate-hero-float-slow" />
        <div className="absolute top-1/3 right-[12%] w-24 h-24 rounded-full bg-secondary/10 animate-hero-float-slow" />
        <div className="absolute top-[55%] left-[8%] w-px h-48 bg-white/10 rotate-[25deg]" />
        <div className="absolute top-[15%] right-[6%] w-px h-36 bg-white/10 -rotate-[20deg]" />
        <div className="absolute bottom-[30%] right-[25%] w-px h-28 bg-white/[0.07] rotate-[50deg]" />
      </div>

      <div className="container relative mx-auto px-4 text-center">
        <div className="w-16 h-1 rounded-full bg-secondary mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-6 text-lg md:text-xl text-white/85 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}

        {ctaText && ctaHref && (
          <div className="mt-10">
            <Button variant="secondary" size="lg" asChild>
              <Link href={ctaHref}>{ctaText}</Link>
            </Button>
          </div>
        )}
      </div>

      {/* Bottom curved decorative element */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-12 md:h-16"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="hsl(var(--background))"
            opacity=".25"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            fill="hsl(var(--background))"
            opacity=".5"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
}
