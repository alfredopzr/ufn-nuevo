"use client";

export default function MensajesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="space-y-4 rounded-lg border border-red-200 bg-red-50 p-6">
      <h2 className="text-lg font-semibold text-red-800">
        Error al cargar Mensajes
      </h2>
      <pre className="whitespace-pre-wrap text-sm text-red-700">
        {error.message}
      </pre>
      {error.digest && (
        <p className="text-xs text-red-500">Digest: {error.digest}</p>
      )}
      <button
        onClick={reset}
        className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
      >
        Reintentar
      </button>
    </div>
  );
}
