"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Noticia } from "@/types/database";

interface NoticiaFormProps {
  noticia?: Noticia;
}

const CATEGORIAS = ["General", "Eventos", "Académico", "Comunicado"];

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^a-z0-9\s-]/g, "") // remove non-alphanumeric
    .trim()
    .replace(/\s+/g, "-") // spaces to hyphens
    .replace(/-+/g, "-"); // collapse multiple hyphens
}

export default function NoticiaForm({ noticia }: NoticiaFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const isEditing = !!noticia;

  const [titulo, setTitulo] = useState(noticia?.titulo ?? "");
  const [slug, setSlug] = useState(noticia?.slug ?? "");
  const [fecha, setFecha] = useState(
    noticia?.fecha ?? new Date().toISOString().split("T")[0]
  );
  const [categoria, setCategoria] = useState(noticia?.categoria ?? "General");
  const [extracto, setExtracto] = useState(noticia?.extracto ?? "");
  const [contenido, setContenido] = useState(noticia?.contenido ?? "");
  const [publicado, setPublicado] = useState(noticia?.publicado ?? false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleTituloChange(value: string) {
    setTitulo(value);
    if (!isEditing) {
      setSlug(generateSlug(value));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = {
      titulo,
      slug,
      fecha,
      categoria,
      extracto,
      contenido,
      publicado,
    };

    if (isEditing) {
      const { error: updateError } = await supabase
        .from("noticias")
        .update(data)
        .eq("id", noticia.id);

      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }
    } else {
      const { error: insertError } = await supabase
        .from("noticias")
        .insert(data);

      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return;
      }
    }

    router.push("/admin/noticias");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="rounded-md bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="titulo">Titulo</Label>
        <Input
          id="titulo"
          value={titulo}
          onChange={(e) => handleTituloChange(e.target.value)}
          required
          placeholder="Titulo de la noticia"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug (URL)</Label>
        <Input
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          placeholder="titulo-de-la-noticia"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fecha">Fecha</Label>
          <Input
            id="fecha"
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="categoria">Categoria</Label>
          <Select value={categoria} onValueChange={setCategoria}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona categoria" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIAS.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="extracto">Extracto</Label>
        <textarea
          id="extracto"
          value={extracto}
          onChange={(e) => setExtracto(e.target.value)}
          required
          rows={3}
          placeholder="Breve resumen de la noticia..."
          className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contenido">Contenido</Label>
        <textarea
          id="contenido"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          required
          rows={10}
          placeholder="Contenido completo de la noticia..."
          className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="publicado"
          type="checkbox"
          checked={publicado}
          onChange={(e) => setPublicado(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300"
        />
        <Label htmlFor="publicado" className="cursor-pointer">
          Publicado
        </Label>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading
            ? "Guardando..."
            : isEditing
              ? "Actualizar Noticia"
              : "Crear Noticia"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/noticias")}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
