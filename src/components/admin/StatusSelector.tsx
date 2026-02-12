"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ApplicationStatus } from "@/types/database";
import { updateApplicationStatus } from "@/app/admin/(dashboard)/aplicaciones/[id]/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

const statusOptions: { value: ApplicationStatus; label: string; color: string }[] = [
  { value: "nueva", label: "Nueva", color: "bg-blue-100 text-blue-800" },
  { value: "en_revision", label: "En Revisión", color: "bg-yellow-100 text-yellow-800" },
  { value: "documentos_pendientes", label: "Documentos Pendientes", color: "bg-orange-100 text-orange-800" },
  { value: "aceptada", label: "Aceptada", color: "bg-green-100 text-green-800" },
  { value: "rechazada", label: "Rechazada", color: "bg-red-100 text-red-800" },
];

interface Props {
  applicationId: string;
  currentStatus: ApplicationStatus;
}

export default function StatusSelector({ applicationId, currentStatus }: Props) {
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  async function handleChange(newStatus: ApplicationStatus) {
    setIsUpdating(true);
    setStatus(newStatus);

    const result = await updateApplicationStatus(applicationId, newStatus);

    if (result.error) {
      setStatus(currentStatus); // Revert on error
    } else {
      router.refresh();
    }
    setIsUpdating(false);
  }

  const current = statusOptions.find((s) => s.value === status);

  return (
    <div className="rounded-lg border bg-white p-6 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">Estado</h2>
        {isUpdating && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
      </div>

      <Select value={status} onValueChange={(v) => handleChange(v as ApplicationStatus)}>
        <SelectTrigger>
          <SelectValue>
            {current && (
              <Badge variant="secondary" className={current.color}>
                {current.label}
              </Badge>
            )}
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
  );
}
