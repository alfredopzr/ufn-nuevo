"use client";

import { Button } from "@/components/ui/button";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <h2 className="text-lg font-semibold">Algo salió mal</h2>
      <p className="text-sm text-muted-foreground">
        {error.message || "Ocurrió un error inesperado."}
      </p>
      <Button onClick={reset}>Intentar de nuevo</Button>
    </div>
  );
}
