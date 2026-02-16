"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Student, StudentStatus } from "@/types/database";
import type { Program } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Loader2,
  Save,
  ExternalLink,
  MessageCircle,
  Trash2,
} from "lucide-react";
import { updateStudent, deleteStudent } from "@/app/admin/(dashboard)/estudiantes/actions";

const statusOptions: { value: StudentStatus; label: string; color: string }[] =
  [
    { value: "activo", label: "Activo", color: "bg-green-100 text-green-800" },
    {
      value: "egresado",
      label: "Egresado",
      color: "bg-blue-100 text-blue-800",
    },
    { value: "baja", label: "Baja", color: "bg-red-100 text-red-800" },
  ];

interface Props {
  student: Student;
  programs: Program[];
}

export default function StudentDetail({ student, programs }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [nombre, setNombre] = useState(student.nombre);
  const [email, setEmail] = useState(student.email);
  const [telefono, setTelefono] = useState(student.telefono);
  const [curp, setCurp] = useState(student.curp ?? "");
  const [programaId, setProgramaId] = useState(student.programa_id);
  const [cuatrimestre, setCuatrimestre] = useState(
    String(student.cuatrimestre)
  );
  const [status, setStatus] = useState<StudentStatus>(student.status);

  async function handleSave(): Promise<void> {
    setSaving(true);
    await updateStudent(student.id, {
      nombre,
      email,
      telefono,
      curp: curp || null,
      programa_id: programaId,
      cuatrimestre: Number(cuatrimestre),
      status,
    });
    setSaving(false);
    router.refresh();
  }

  async function handleDelete(): Promise<void> {
    if (!confirm("¿Eliminar este estudiante? Esta acción no se puede deshacer."))
      return;
    setDeleting(true);
    const result = await deleteStudent(student.id);
    if (result.success) {
      router.push("/admin/estudiantes");
    }
    setDeleting(false);
  }

  const whatsappUrl = `https://wa.me/52${telefono.replace(/\D/g, "")}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main column */}
      <div className="lg:col-span-2 space-y-6">
        {/* Personal Info */}
        <div className="rounded-lg border bg-white p-6 space-y-4">
          <h2 className="font-semibold text-lg">Información del Estudiante</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 space-y-1.5">
              <Label htmlFor="detail-nombre">Nombre completo</Label>
              <Input
                id="detail-nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="detail-email">Email</Label>
              <Input
                id="detail-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="detail-telefono">Telefono</Label>
              <div className="flex gap-2">
                <Input
                  id="detail-telefono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" size="icon" asChild>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="detail-curp">CURP</Label>
              <Input
                id="detail-curp"
                value={curp}
                onChange={(e) => setCurp(e.target.value.toUpperCase())}
                maxLength={18}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Programa</Label>
              <Select value={programaId} onValueChange={setProgramaId}>
                <SelectTrigger>
                  <SelectValue />
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
          </div>
        </div>

        {/* Linked Application */}
        {student.application_id && (
          <div className="rounded-lg border bg-white p-6">
            <h2 className="font-semibold text-lg mb-2">Solicitud Vinculada</h2>
            <p className="text-sm text-muted-foreground mb-3">
              Este estudiante fue creado a partir de una solicitud de admisión.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/admin/aplicaciones/${student.application_id}`}>
                <ExternalLink className="mr-2 h-4 w-4" />
                Ver Solicitud
              </Link>
            </Button>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Status & Cuatrimestre */}
        <div className="rounded-lg border bg-white p-6 space-y-4">
          <h2 className="font-semibold text-lg">Estado Académico</h2>

          <div className="space-y-1.5">
            <Label>Estado</Label>
            <Select
              value={status}
              onValueChange={(v) => setStatus(v as StudentStatus)}
            >
              <SelectTrigger>
                <SelectValue>
                  {(() => {
                    const opt = statusOptions.find((s) => s.value === status);
                    return opt ? (
                      <Badge variant="secondary" className={opt.color}>
                        {opt.label}
                      </Badge>
                    ) : null;
                  })()}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    <Badge variant="secondary" className={opt.color}>
                      {opt.label}
                    </Badge>
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
                    Cuatrimestre {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="pt-2 space-y-1">
            <p className="text-xs text-muted-foreground">
              Matrícula: <span className="font-mono">{student.matricula}</span>
            </p>
            <p className="text-xs text-muted-foreground">
              Fecha de ingreso:{" "}
              {new Date(student.fecha_ingreso).toLocaleDateString("es-MX", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="rounded-lg border bg-white p-6 space-y-3">
          <Button onClick={handleSave} disabled={saving} className="w-full">
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Guardar Cambios
              </>
            )}
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleting}
            className="w-full"
          >
            {deleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Eliminando...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Eliminar Estudiante
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
