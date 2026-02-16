"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Program } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Loader2 } from "lucide-react";
import { createStudent } from "@/app/admin/(dashboard)/estudiantes/actions";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  programs: Program[];
}

export default function AddStudentDialog({
  open,
  onOpenChange,
  programs,
}: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [curp, setCurp] = useState("");
  const [programaId, setProgramaId] = useState("");
  const [cuatrimestre, setCuatrimestre] = useState("1");
  const [fechaIngreso, setFechaIngreso] = useState(
    new Date().toISOString().split("T")[0]
  );

  function resetForm(): void {
    setNombre("");
    setEmail("");
    setTelefono("");
    setCurp("");
    setProgramaId("");
    setCuatrimestre("1");
    setFechaIngreso(new Date().toISOString().split("T")[0]);
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const result = await createStudent({
      nombre,
      email,
      telefono,
      curp: curp || undefined,
      programa_id: programaId,
      cuatrimestre: Number(cuatrimestre),
      fecha_ingreso: fechaIngreso,
    });

    if (result.error) {
      setError(result.error);
      setSaving(false);
      return;
    }

    resetForm();
    setSaving(false);
    onOpenChange(false);
    router.refresh();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) resetForm();
        onOpenChange(v);
      }}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Agregar Estudiante</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-1.5">
              <Label htmlFor="student-nombre">Nombre completo</Label>
              <Input
                id="student-nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="student-email">Email</Label>
              <Input
                id="student-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="student-telefono">Telefono</Label>
              <Input
                id="student-telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
              />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label htmlFor="student-curp">CURP (opcional)</Label>
              <Input
                id="student-curp"
                value={curp}
                onChange={(e) => setCurp(e.target.value.toUpperCase())}
                maxLength={18}
              />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label>Programa</Label>
              <Select value={programaId} onValueChange={setProgramaId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un programa" />
                </SelectTrigger>
                <SelectContent>
                  {programs.map((p) => (
                    <SelectItem key={p.slug} value={p.slug}>
                      {p.shortName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Cuatrimestre</Label>
              <Select value={cuatrimestre} onValueChange={setCuatrimestre}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="student-fecha">Fecha de ingreso</Label>
              <Input
                id="student-fecha"
                type="date"
                value={fechaIngreso}
                onChange={(e) => setFechaIngreso(e.target.value)}
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={saving || !programaId}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                "Agregar"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
