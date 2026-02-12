import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import NoticiaForm from "@/components/admin/NoticiaForm";
import type { Noticia } from "@/types/database";

interface Props {
  params: { id: string };
}

export default async function EditNoticiaPage({ params }: Props) {
  const supabase = createClient();

  const { data: noticia } = await supabase
    .from("noticias")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!noticia) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Editar Noticia</h1>
      <NoticiaForm noticia={noticia as Noticia} />
    </div>
  );
}
