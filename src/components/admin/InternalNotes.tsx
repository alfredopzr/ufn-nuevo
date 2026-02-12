"use client";

import { useState } from "react";
import { updateInternalNotes } from "@/app/admin/(dashboard)/aplicaciones/[id]/actions";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";

interface Props {
  applicationId: string;
  currentNotes: string;
}

export default function InternalNotes({ applicationId, currentNotes }: Props) {
  const [notes, setNotes] = useState(currentNotes);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const hasChanges = notes !== currentNotes;

  async function handleSave() {
    setIsSaving(true);
    setSaved(false);
    await updateInternalNotes(applicationId, notes);
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="rounded-lg border bg-white p-6 space-y-3">
      <h2 className="font-semibold text-lg">Notas Internas</h2>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notas visibles solo para el equipo administrativo..."
        className="w-full min-h-[120px] rounded-md border bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-y"
      />
      <div className="flex items-center justify-between">
        {saved && (
          <span className="text-sm text-green-600">Guardado</span>
        )}
        <Button
          size="sm"
          onClick={handleSave}
          disabled={!hasChanges || isSaving}
          className="ml-auto"
        >
          {isSaving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Guardar
        </Button>
      </div>
    </div>
  );
}
