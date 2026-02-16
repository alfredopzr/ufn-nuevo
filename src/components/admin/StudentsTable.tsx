"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { Student } from "@/types/database";
import type { Program } from "@/types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Download, X, Plus } from "lucide-react";
import { exportStudentsCSV, exportStudentsXLSX } from "@/lib/export";
import AddStudentDialog from "@/components/admin/AddStudentDialog";

const statusLabels: Record<string, string> = {
  activo: "Activo",
  egresado: "Egresado",
  baja: "Baja",
};

const statusColors: Record<string, string> = {
  activo: "bg-green-100 text-green-800",
  egresado: "bg-blue-100 text-blue-800",
  baja: "bg-red-100 text-red-800",
};

interface Props {
  students: Student[];
  programs: Program[];
  currentFilters: {
    status?: string;
    programa?: string;
    cuatrimestre?: string;
    q?: string;
  };
}

export default function StudentsTable({
  students,
  programs,
  currentFilters,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(currentFilters.q ?? "");
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  function updateFilter(key: string, value: string): void {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/admin/estudiantes?${params.toString()}`);
  }

  function handleSearch(): void {
    updateFilter("q", searchQuery);
  }

  function clearFilters(): void {
    setSearchQuery("");
    router.push("/admin/estudiantes");
  }

  function getProgramName(slug: string): string {
    return programs.find((p) => p.slug === slug)?.shortName ?? slug;
  }

  const hasFilters =
    currentFilters.status ||
    currentFilters.programa ||
    currentFilters.cuatrimestre ||
    currentFilters.q;

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[200px] max-w-sm">
          <Input
            placeholder="Buscar por nombre, matrícula, CURP o email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button variant="outline" size="icon" onClick={handleSearch}>
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <Select
          value={currentFilters.status ?? "all"}
          onValueChange={(v) => updateFilter("status", v)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            {Object.entries(statusLabels).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={currentFilters.programa ?? "all"}
          onValueChange={(v) => updateFilter("programa", v)}
        >
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Programa" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los programas</SelectItem>
            {programs.map((p) => (
              <SelectItem key={p.slug} value={p.slug}>
                {p.shortName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={currentFilters.cuatrimestre ?? "all"}
          onValueChange={(v) => updateFilter("cuatrimestre", v)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Cuatrimestre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
              <SelectItem key={n} value={String(n)}>
                Cuatrimestre {n}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="mr-1 h-4 w-4" />
            Limpiar
          </Button>
        )}

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportStudentsCSV(students, programs)}
          >
            <Download className="mr-2 h-4 w-4" />
            CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportStudentsXLSX(students, programs)}
          >
            <Download className="mr-2 h-4 w-4" />
            Excel
          </Button>
          <Button size="sm" onClick={() => setAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Agregar Estudiante
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Matrícula
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Nombre
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Programa
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Cuatrimestre
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Estado
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Fecha Ingreso
                </th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-muted-foreground"
                  >
                    No se encontraron estudiantes.
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b last:border-0 hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3 font-mono text-xs">
                      <Link
                        href={`/admin/estudiantes/${student.id}`}
                        className="font-medium hover:text-primary"
                      >
                        {student.matricula}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/estudiantes/${student.id}`}
                        className="font-medium hover:text-primary"
                      >
                        {student.nombre}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {student.email}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      {getProgramName(student.programa_id)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {student.cuatrimestre}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="secondary"
                        className={statusColors[student.status] ?? ""}
                      >
                        {statusLabels[student.status] ?? student.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(student.fecha_ingreso).toLocaleDateString(
                        "es-MX",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddStudentDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        programs={programs}
      />
    </div>
  );
}
