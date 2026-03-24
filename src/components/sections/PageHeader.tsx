interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="border-b bg-muted/40 py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl text-center md:text-left">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
