import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-14", centered && "text-center")}>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground">
        {title}
      </h2>
      <div
        className={cn(
          "w-20 h-1 bg-secondary rounded-full mt-4",
          centered && "mx-auto"
        )}
      />
      {subtitle && (
        <p className={cn("text-muted-foreground text-lg mt-4 max-w-2xl leading-relaxed", centered && "mx-auto")}>{subtitle}</p>
      )}
    </div>
  );
}
