import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-6 md:mb-10",
        centered && "text-center",
        !centered && "text-left",
        className,
      )}
    >
      <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground leading-tight">
        {title}
      </h2>
      <div
        className={cn(
          "w-12 md:w-20 h-1 bg-secondary rounded-full mt-3 md:mt-4",
          centered && "mx-auto",
        )}
      />
      {subtitle && (
        <p
          className={cn(
            "text-muted-foreground text-sm md:text-lg mt-3 md:mt-4 max-w-2xl leading-relaxed",
            centered && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
