"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { programs } from "@/data/programs";
import type { Noticia, NoticiaEnvio } from "@/types/database";
import {
  getRecipientCount,
  getNoticiaEnvios,
  sendNoticiaEmail,
} from "@/app/admin/(dashboard)/noticias/actions";

const statusLabels: Record<string, string> = {
  nueva: "Nueva",
  en_revision: "En Revisión",
  documentos_pendientes: "Docs. Pendientes",
  aceptada: "Aceptada",
  rechazada: "Rechazada",
};

interface Props {
  noticia: Noticia;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SendNoticiaEmailDialog({
  noticia,
  open,
  onOpenChange,
}: Props) {
  const [programa, setPrograma] = useState("all");
  const [status, setStatus] = useState("all");
  const [count, setCount] = useState<number | null>(null);
  const [loadingCount, setLoadingCount] = useState(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [envios, setEnvios] = useState<NoticiaEnvio[]>([]);

  const fetchCount = useCallback(async () => {
    setLoadingCount(true);
    const filters: { programa?: string; status?: string } = {};
    if (programa !== "all") filters.programa = programa;
    if (status !== "all") filters.status = status;

    const res = await getRecipientCount(filters);
    if ("count" in res) {
      setCount(res.count ?? 0);
    }
    setLoadingCount(false);
  }, [programa, status]);

  const fetchEnvios = useCallback(async () => {
    const res = await getNoticiaEnvios(noticia.id);
    if ("envios" in res) {
      setEnvios(res.envios ?? []);
    }
  }, [noticia.id]);

  useEffect(() => {
    if (open) {
      fetchCount();
      fetchEnvios();
      setResult(null);
    }
  }, [open, fetchCount, fetchEnvios]);

  async function handleSend() {
    setSending(true);
    setResult(null);

    const filters: { programa?: string; status?: string } = {};
    if (programa !== "all") filters.programa = programa;
    if (status !== "all") filters.status = status;

    const res = await sendNoticiaEmail(noticia.id, filters);

    if ("error" in res && res.error) {
      setResult({ type: "error", message: res.error });
    } else if ("count" in res) {
      setResult({
        type: "success",
        message: `Correo enviado a ${res.count} destinatario(s).`,
      });
      fetchEnvios();
    }
    setSending(false);
  }

  function getFilterLabel(filtros: NoticiaEnvio["filtros"]) {
    const parts: string[] = [];
    if (filtros.programa) {
      const p = programs.find((pr) => pr.slug === filtros.programa);
      parts.push(p?.shortName ?? filtros.programa);
    }
    if (filtros.status) {
      parts.push(statusLabels[filtros.status] ?? filtros.status);
    }
    return parts.length > 0 ? parts.join(", ") : "Todos";
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Enviar por Email
          </DialogTitle>
          <DialogDescription>{noticia.titulo}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Filters */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Programa</label>
              <Select value={programa} onValueChange={setPrograma}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {programs.map((p) => (
                    <SelectItem key={p.slug} value={p.slug}>
                      {p.shortName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Estado</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {Object.entries(statusLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Recipient count */}
          <div className="rounded-md border bg-muted/50 px-4 py-3 text-sm">
            {loadingCount ? (
              <span className="text-muted-foreground">Contando...</span>
            ) : (
              <span className="font-medium">
                {count ?? 0} destinatario(s)
              </span>
            )}
          </div>

          {/* Result feedback */}
          {result && (
            <div
              className={`flex items-center gap-2 rounded-md border px-4 py-3 text-sm ${
                result.type === "success"
                  ? "border-green-200 bg-green-50 text-green-800"
                  : "border-red-200 bg-red-50 text-red-800"
              }`}
            >
              {result.type === "success" ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              {result.message}
            </div>
          )}

          {/* Send button */}
          <Button
            onClick={handleSend}
            disabled={sending || count === 0 || loadingCount}
            className="w-full"
          >
            {sending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Enviar a {count ?? 0} destinatario(s)
              </>
            )}
          </Button>

          {/* Send history */}
          {envios.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Envíos anteriores
              </p>
              <div className="space-y-1.5 max-h-32 overflow-y-auto">
                {envios.map((envio) => (
                  <div
                    key={envio.id}
                    className="flex items-center justify-between rounded border px-3 py-2 text-xs"
                  >
                    <span className="text-muted-foreground">
                      {new Date(envio.created_at).toLocaleDateString("es-MX", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {getFilterLabel(envio.filtros)}
                      </Badge>
                      <span className="font-medium">
                        {envio.total_destinatarios}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
