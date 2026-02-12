"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { Application } from "@/types/database";
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
import { Search, Download, X } from "lucide-react";
import { exportApplicationsCSV, exportApplicationsXLSX } from "@/lib/export";

const statusLabels: Record<string, string> = {
  nueva: "Nueva",
  en_revision: "En Revisión",
  documentos_pendientes: "Docs. Pendientes",
  aceptada: "Aceptada",
  rechazada: "Rechazada",
};

const statusColors: Record<string, string> = {
  nueva: "bg-blue-100 text-blue-800",
  en_revision: "bg-yellow-100 text-yellow-800",
  documentos_pendientes: "bg-orange-100 text-orange-800",
  aceptada: "bg-green-100 text-green-800",
  rechazada: "bg-red-100 text-red-800",
};

interface Props {
  applications: Application[];
  programs: Program[];
  currentFilters: { status?: string; programa?: string; q?: string };
}

export default function ApplicationsTable({
  applications,
  programs,
  currentFilters,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(currentFilters.q ?? "");

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/admin?${params.toString()}`);
  }

  function handleSearch() {
    updateFilter("q", searchQuery);
  }

  function clearFilters() {
    setSearchQuery("");
    router.push("/admin");
  }

  function getProgramName(slug: string) {
    return programs.find((p) => p.slug === slug)?.shortName ?? slug;
  }

  const hasFilters = currentFilters.status || currentFilters.programa || currentFilters.q;

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[200px] max-w-sm">
          <Input
            placeholder="Buscar por nombre, CURP o email..."
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
          <SelectTrigger className="w-[180px]">
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
            onClick={() => exportApplicationsCSV(applications, programs)}
          >
            <Download className="mr-2 h-4 w-4" />
            CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportApplicationsXLSX(applications, programs)}
          >
            <Download className="mr-2 h-4 w-4" />
            Excel
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
                  Nombre
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Programa
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Fecha
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {applications.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-muted-foreground"
                  >
                    No se encontraron solicitudes.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr
                    key={app.id}
                    className="border-b last:border-0 hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/aplicaciones/${app.id}`}
                        className="font-medium hover:text-primary"
                      >
                        {app.nombre}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {app.email}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      {getProgramName(app.programa_id)}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(app.created_at).toLocaleDateString("es-MX", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="secondary"
                        className={statusColors[app.status] ?? ""}
                      >
                        {statusLabels[app.status] ?? app.status}
                      </Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
