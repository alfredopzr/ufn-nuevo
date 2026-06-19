interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="border-b bg-muted/40 py-6 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl text-left">
          <h1 className="font-display text-xl sm:text-2xl md:text-4xl font-bold text-foreground leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 md:mt-3 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
