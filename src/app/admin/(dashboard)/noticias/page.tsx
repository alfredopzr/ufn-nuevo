"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Noticia } from "@/types/database";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function AdminNoticiasPage() {
  const supabase = createClient();
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchNoticias() {
    const { data } = await supabase
      .from("noticias")
      .select("*")
      .order("fecha", { ascending: false });

    setNoticias(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    fetchNoticias();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("¿Estás seguro de que quieres eliminar esta noticia?")) return;

    const { error } = await supabase.from("noticias").delete().eq("id", id);
    if (!error) {
      setNoticias((prev) => prev.filter((n) => n.id !== id));
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Noticias</h1>
        <Button asChild>
          <Link href="/admin/noticias/nueva">
            <Plus className="mr-2 h-4 w-4" />
            Nueva Noticia
          </Link>
        </Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Cargando...</p>
      ) : noticias.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border">
          <p className="text-muted-foreground">
            No hay noticias todavia. Crea la primera.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left px-4 py-3 font-medium">Titulo</th>
                  <th className="text-left px-4 py-3 font-medium">
                    Categoria
                  </th>
                  <th className="text-left px-4 py-3 font-medium">Fecha</th>
                  <th className="text-left px-4 py-3 font-medium">
                    Publicado
                  </th>
                  <th className="text-right px-4 py-3 font-medium">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {noticias.map((noticia) => (
                  <tr key={noticia.id} className="border-b last:border-0">
                    <td className="px-4 py-3 font-medium max-w-xs truncate">
                      {noticia.titulo}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary">{noticia.categoria}</Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(noticia.fecha).toLocaleDateString("es-MX")}
                    </td>
                    <td className="px-4 py-3">
                      {noticia.publicado ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          Publicado
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">
                          Borrador
                        </Badge>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/noticias/${noticia.id}`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(noticia.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
