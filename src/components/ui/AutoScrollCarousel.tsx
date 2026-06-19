"use client";

import { cn } from "@/lib/utils";

interface AutoScrollCarouselProps {
  children: React.ReactNode;
  /** Duration in seconds for one full loop */
  speed?: number;
  ariaLabel?: string;
  className?: string;
  pauseOnHover?: boolean;
}

export default function AutoScrollCarousel({
  children,
  speed = 30,
  ariaLabel = "Carrusel",
  className,
  pauseOnHover = true,
}: AutoScrollCarouselProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        aria-label={ariaLabel}
        className={cn(
          "flex w-max animate-marquee",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex shrink-0 items-center gap-8 pr-8">{children}</div>
        <div
          className="flex shrink-0 items-center gap-8 pr-8"
          aria-hidden="true"
        >
          {children}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
