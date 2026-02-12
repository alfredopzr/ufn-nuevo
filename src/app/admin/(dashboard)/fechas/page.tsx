"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import type { FechaImportante } from "@/types/database";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";

export default function AdminFechasPage() {
  const supabase = createClient();
  const [fechas, setFechas] = useState<FechaImportante[]>([]);
  const [loading, setLoading] = useState(true);

  // Create form state
  const [newTitulo, setNewTitulo] = useState("");
  const [newFecha, setNewFecha] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [newDescripcion, setNewDescripcion] = useState("");
  const [creating, setCreating] = useState(false);

  // Inline edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitulo, setEditTitulo] = useState("");
  const [editFecha, setEditFecha] = useState("");
  const [editDescripcion, setEditDescripcion] = useState("");
  const [editActivo, setEditActivo] = useState(true);

  async function fetchFechas() {
    const { data } = await supabase
      .from("fechas_importantes")
      .select("*")
      .order("fecha", { ascending: false });

    setFechas((data as FechaImportante[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    fetchFechas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitulo.trim() || !newFecha) return;
    setCreating(true);

    const { data, error } = await supabase
      .from("fechas_importantes")
      .insert({
        titulo: newTitulo.trim(),
        fecha: newFecha,
        descripcion: newDescripcion.trim() || null,
        activo: true,
      })
      .select()
      .single();

    if (!error && data) {
      setFechas((prev) => [data as FechaImportante, ...prev]);
      setNewTitulo("");
      setNewFecha(new Date().toISOString().split("T")[0]);
      setNewDescripcion("");
    }
    setCreating(false);
  }

  function startEdit(fecha: FechaImportante) {
    setEditingId(fecha.id);
    setEditTitulo(fecha.titulo);
    setEditFecha(fecha.fecha);
    setEditDescripcion(fecha.descripcion ?? "");
    setEditActivo(fecha.activo);
  }

  function cancelEdit() {
    setEditingId(null);
  }

  async function saveEdit(id: string) {
    const { error } = await supabase
      .from("fechas_importantes")
      .update({
        titulo: editTitulo.trim(),
        fecha: editFecha,
        descripcion: editDescripcion.trim() || null,
        activo: editActivo,
      })
      .eq("id", id);

    if (!error) {
      setFechas((prev) =>
        prev.map((f) =>
          f.id === id
            ? {
                ...f,
                titulo: editTitulo.trim(),
                fecha: editFecha,
                descripcion: editDescripcion.trim() || null,
                activo: editActivo,
              }
            : f
        )
      );
      setEditingId(null);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar esta fecha?")) return;

    const { error } = await supabase
      .from("fechas_importantes")
      .delete()
      .eq("id", id);

    if (!error) {
      setFechas((prev) => prev.filter((f) => f.id !== id));
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Fechas Importantes</h1>

      {/* Inline create form */}
      <form
        onSubmit={handleCreate}
        className="bg-white rounded-lg border p-4 mb-6"
      >
        <h2 className="font-semibold mb-4">Agregar Fecha</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="space-y-1">
            <Label htmlFor="new-titulo">Titulo</Label>
            <Input
              id="new-titulo"
              value={newTitulo}
              onChange={(e) => setNewTitulo(e.target.value)}
              placeholder="Titulo de la fecha"
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="new-fecha">Fecha</Label>
            <Input
              id="new-fecha"
              type="date"
              value={newFecha}
              onChange={(e) => setNewFecha(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="new-descripcion">Descripcion (opcional)</Label>
            <Input
              id="new-descripcion"
              value={newDescripcion}
              onChange={(e) => setNewDescripcion(e.target.value)}
              placeholder="Descripcion breve"
            />
          </div>
        </div>
        <Button type="submit" size="sm" disabled={creating}>
          <Plus className="mr-2 h-4 w-4" />
          {creating ? "Agregando..." : "Agregar"}
        </Button>
      </form>

      {/* Table */}
      {loading ? (
        <p className="text-muted-foreground">Cargando...</p>
      ) : fechas.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border">
          <p className="text-muted-foreground">
            No hay fechas importantes. Agrega la primera arriba.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left px-4 py-3 font-medium">Titulo</th>
                  <th className="text-left px-4 py-3 font-medium">Fecha</th>
                  <th className="text-left px-4 py-3 font-medium">
                    Descripcion
                  </th>
                  <th className="text-left px-4 py-3 font-medium">Activo</th>
                  <th className="text-right px-4 py-3 font-medium">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {fechas.map((fecha) =>
                  editingId === fecha.id ? (
                    <tr key={fecha.id} className="border-b bg-blue-50/50">
                      <td className="px-4 py-2">
                        <Input
                          value={editTitulo}
                          onChange={(e) => setEditTitulo(e.target.value)}
                          className="h-8"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <Input
                          type="date"
                          value={editFecha}
                          onChange={(e) => setEditFecha(e.target.value)}
                          className="h-8"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <Input
                          value={editDescripcion}
                          onChange={(e) => setEditDescripcion(e.target.value)}
                          className="h-8"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editActivo}
                            onChange={(e) => setEditActivo(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          <span className="text-xs">Activo</span>
                        </label>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => saveEdit(fecha.id)}
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={cancelEdit}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <tr key={fecha.id} className="border-b last:border-0">
                      <td className="px-4 py-3 font-medium">{fecha.titulo}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {new Date(fecha.fecha).toLocaleDateString("es-MX")}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground max-w-xs truncate">
                        {fecha.descripcion ?? "—"}
                      </td>
                      <td className="px-4 py-3">
                        {fecha.activo ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            Activo
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="text-muted-foreground"
                          >
                            Inactivo
                          </Badge>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => startEdit(fecha)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(fecha.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
