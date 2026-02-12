import { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import NewsCard from "@/components/ui/NewsCard";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Noticias y Eventos",
  description:
    "Mantente informado sobre las últimas noticias, eventos y actividades de la Universidad Frontera Norte en Reynosa.",
};

export const revalidate = 60; // revalidate every 60 seconds

export default async function NoticiasPage() {
  const supabase = createClient();
  const { data: noticias } = await supabase
    .from("noticias")
    .select("*")
    .eq("publicado", true)
    .order("fecha", { ascending: false });

  // Map to NewsCard's expected format
  const articles = (noticias ?? []).map((n) => ({
    slug: n.slug,
    title: n.titulo,
    date: n.fecha,
    excerpt: n.extracto,
    category: n.categoria,
    content: n.contenido,
  }));

  return (
    <>
      <Hero
        title="Noticias y Eventos"
        subtitle="Mantente informado sobre las últimas novedades de la Universidad Frontera Norte"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <NewsCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Próximamente más noticias y eventos.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
