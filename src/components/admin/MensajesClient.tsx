"use client";

import { useCallback, useEffect, useState } from "react";
import type { Program } from "@/types";
import type {
  MessageAudiencia,
  MessageSend,
  Noticia,
  FechaImportante,
} from "@/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Loader2,
  Mail,
  MessageCircle,
  Search,
  CheckCircle2,
  AlertCircle,
  Users,
  Copy,
  Plus,
  X,
} from "lucide-react";
import {
  getStudentRecipientCount,
  getApplicantRecipientCount,
  getStudentRecipients,
  getApplicantRecipients,
  searchStudents,
  searchApplicants,
  sendTargetedEmail,
  getWhatsAppList,
  getMessageHistory,
  logWhatsAppSend,
  type Recipient,
  type StudentFilters,
  type ApplicantFilters,
} from "@/app/admin/(dashboard)/mensajes/actions";

const applicationStatusLabels: Record<string, string> = {
  nueva: "Nueva",
  en_revision: "En Revisión",
  documentos_pendientes: "Docs. Pendientes",
  aceptada: "Aceptada",
  rechazada: "Rechazada",
};

interface Props {
  programs: Program[];
  noticias: Pick<Noticia, "id" | "titulo" | "slug">[];
  fechas: Pick<FechaImportante, "id" | "titulo" | "fecha">[];
}

export default function MensajesClient({ programs, noticias, fechas }: Props) {
  // Tab state
  const [audiencia, setAudiencia] = useState<MessageAudiencia>("estudiantes");

  // Filter state
  const [programa, setPrograma] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [cuatrimestre, setCuatrimestre] = useState("all");
  const [missingDocs, setMissingDocs] = useState(false);

  // Recipient state
  const [count, setCount] = useState<number | null>(null);
  const [loadingCount, setLoadingCount] = useState(false);
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showRecipients, setShowRecipients] = useState(false);
  const [loadingRecipients, setLoadingRecipients] = useState(false);

  // Manual add search
  const [addSearchQuery, setAddSearchQuery] = useState("");
  const [addSearchResults, setAddSearchResults] = useState<Recipient[]>([]);
  const [searchingAdd, setSearchingAdd] = useState(false);
  const [showAddSearch, setShowAddSearch] = useState(false);

  // Compose state
  const [channel, setChannel] = useState<"email" | "whatsapp">("email");
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [linkedNoticia, setLinkedNoticia] = useState("none");
  const [linkedFecha, setLinkedFecha] = useState("none");

  // Send state
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // WhatsApp list state
  const [whatsappList, setWhatsappList] = useState<
    { nombre: string; telefono: string }[] | null
  >(null);

  // History state
  const [history, setHistory] = useState<MessageSend[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // ── Fetch count on filter change ────────────────────────

  const fetchCount = useCallback(async () => {
    setLoadingCount(true);
    setShowRecipients(false);
    setWhatsappList(null);
    setResult(null);

    if (audiencia === "estudiantes") {
      const filters: StudentFilters = {};
      if (programa !== "all") filters.programa = programa;
      if (cuatrimestre !== "all") filters.cuatrimestre = cuatrimestre;
      if (statusFilter !== "all") filters.status = statusFilter;
      const res = await getStudentRecipientCount(filters);
      setCount("count" in res ? res.count : 0);
    } else {
      const filters: ApplicantFilters = {};
      if (programa !== "all") filters.programa = programa;
      if (statusFilter !== "all") filters.status = statusFilter;
      if (missingDocs) filters.missing_docs = true;
      const res = await getApplicantRecipientCount(filters);
      setCount("count" in res ? res.count : 0);
    }
    setLoadingCount(false);
  }, [audiencia, programa, statusFilter, cuatrimestre, missingDocs]);

  useEffect(() => {
    fetchCount();
  }, [fetchCount]);

  // ── Fetch history on tab change ─────────────────────────

  const fetchHistory = useCallback(async () => {
    setLoadingHistory(true);
    const res = await getMessageHistory(audiencia);
    if ("sends" in res) setHistory(res.sends);
    setLoadingHistory(false);
  }, [audiencia]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // ── Load full recipient list ────────────────────────────

  async function handleShowRecipients(): Promise<void> {
    setLoadingRecipients(true);

    let res: Recipient[] | { error: string };
    if (audiencia === "estudiantes") {
      const filters: StudentFilters = {};
      if (programa !== "all") filters.programa = programa;
      if (cuatrimestre !== "all") filters.cuatrimestre = cuatrimestre;
      if (statusFilter !== "all") filters.status = statusFilter;
      res = await getStudentRecipients(filters);
    } else {
      const filters: ApplicantFilters = {};
      if (programa !== "all") filters.programa = programa;
      if (statusFilter !== "all") filters.status = statusFilter;
      if (missingDocs) filters.missing_docs = true;
      res = await getApplicantRecipients(filters);
    }

    if (Array.isArray(res)) {
      setRecipients(res);
      setSelectedIds(new Set(res.map((r) => r.id)));
      setShowRecipients(true);
    }
    setLoadingRecipients(false);
  }

  // ── Toggle selection ────────────────────────────────────

  function toggleRecipient(id: string): void {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function selectAll(): void {
    setSelectedIds(new Set(recipients.map((r) => r.id)));
  }

  function deselectAll(): void {
    setSelectedIds(new Set());
  }

  // ── Manual add search ───────────────────────────────────

  async function handleAddSearch(): Promise<void> {
    if (!addSearchQuery.trim()) return;
    setSearchingAdd(true);

    const res =
      audiencia === "estudiantes"
        ? await searchStudents(addSearchQuery)
        : await searchApplicants(addSearchQuery);

    if (Array.isArray(res)) {
      // Filter out already-in-list recipients
      const existingIds = new Set(recipients.map((r) => r.id));
      setAddSearchResults(res.filter((r) => !existingIds.has(r.id)));
    }
    setSearchingAdd(false);
  }

  function addRecipient(recipient: Recipient): void {
    setRecipients((prev) => [...prev, recipient]);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.add(recipient.id);
      return next;
    });
    setAddSearchResults((prev) => prev.filter((r) => r.id !== recipient.id));
  }

  // ── Link to noticia/fecha ───────────────────────────────

  function handleLinkNoticia(noticiaId: string): void {
    setLinkedNoticia(noticiaId);
    setLinkedFecha("none");
    if (noticiaId !== "none") {
      const noticia = noticias.find((n) => n.id === noticiaId);
      if (noticia && !asunto) setAsunto(noticia.titulo);
    }
  }

  function handleLinkFecha(fechaId: string): void {
    setLinkedFecha(fechaId);
    setLinkedNoticia("none");
    if (fechaId !== "none") {
      const fecha = fechas.find((f) => f.id === fechaId);
      if (fecha && !asunto) setAsunto(fecha.titulo);
    }
  }

  // ── Build current filters object ────────────────────────

  function getCurrentFilters(): Record<string, unknown> {
    const filters: Record<string, unknown> = {};
    if (programa !== "all") filters.programa = programa;
    if (statusFilter !== "all") filters.status = statusFilter;
    if (audiencia === "estudiantes" && cuatrimestre !== "all")
      filters.cuatrimestre = cuatrimestre;
    if (audiencia === "aplicantes" && missingDocs)
      filters.missing_docs = true;
    return filters;
  }

  // ── Send ────────────────────────────────────────────────

  async function handleSend(): Promise<void> {
    if (selectedIds.size === 0) return;
    setSending(true);
    setResult(null);
    setWhatsappList(null);

    if (channel === "email") {
      const res = await sendTargetedEmail({
        audiencia,
        recipientIds: Array.from(selectedIds),
        asunto,
        mensaje,
        filtros: getCurrentFilters(),
        noticiaId: linkedNoticia !== "none" ? linkedNoticia : undefined,
        fechaId: linkedFecha !== "none" ? linkedFecha : undefined,
      });

      if ("error" in res) {
        setResult({ type: "error", message: res.error });
      } else {
        setResult({
          type: "success",
          message: `Correo enviado a ${res.count} destinatario(s).`,
        });
        fetchHistory();
      }
    } else {
      // WhatsApp list
      const res = await getWhatsAppList(
        audiencia,
        Array.from(selectedIds)
      );
      if ("error" in res) {
        setResult({ type: "error", message: res.error });
      } else {
        setWhatsappList(res.recipients);
        await logWhatsAppSend({
          audiencia,
          filtros: getCurrentFilters(),
          asunto,
          mensaje,
          totalDestinatarios: res.recipients.length,
        });
        setResult({
          type: "success",
          message: `Lista de ${res.recipients.length} contacto(s) generada.`,
        });
        fetchHistory();
      }
    }
    setSending(false);
  }

  function copyPhoneNumbers(): void {
    if (!whatsappList) return;
    const text = whatsappList.map((r) => r.telefono).join("\n");
    navigator.clipboard.writeText(text);
  }

  // ── Reset on tab change ─────────────────────────────────

  function handleTabChange(tab: MessageAudiencia): void {
    setAudiencia(tab);
    setPrograma("all");
    setStatusFilter("all");
    setCuatrimestre("all");
    setMissingDocs(false);
    setShowRecipients(false);
    setRecipients([]);
    setSelectedIds(new Set());
    setWhatsappList(null);
    setResult(null);
    setAsunto("");
    setMensaje("");
    setLinkedNoticia("none");
    setLinkedFecha("none");
    setShowAddSearch(false);
    setAddSearchQuery("");
    setAddSearchResults([]);
  }

  const selectedCount = showRecipients ? selectedIds.size : (count ?? 0);

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-1 rounded-lg border bg-muted/50 p-1 w-fit">
        <button
          onClick={() => handleTabChange("estudiantes")}
          className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            audiencia === "estudiantes"
              ? "bg-white shadow-sm text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Estudiantes
        </button>
        <button
          onClick={() => handleTabChange("aplicantes")}
          className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            audiencia === "aplicantes"
              ? "bg-white shadow-sm text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Aplicantes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column: Audience Builder + Recipients */}
        <div className="space-y-4">
          {/* Filters */}
          <div className="rounded-lg border bg-white p-4 space-y-4">
            <h2 className="font-semibold">Filtros</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Programa</Label>
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

              {audiencia === "estudiantes" ? (
                <>
                  <div className="space-y-1.5">
                    <Label>Cuatrimestre</Label>
                    <Select
                      value={cuatrimestre}
                      onValueChange={setCuatrimestre}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        {Array.from({ length: 9 }, (_, i) => i + 1).map(
                          (n) => (
                            <SelectItem key={n} value={String(n)}>
                              {n}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Estado</Label>
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="activo">Activo</SelectItem>
                        <SelectItem value="egresado">Egresado</SelectItem>
                        <SelectItem value="baja">Baja</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-1.5">
                    <Label>Estado</Label>
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        {Object.entries(applicationStatusLabels).map(
                          ([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={missingDocs}
                        onChange={(e) => setMissingDocs(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <span className="text-sm">
                        Solo con documentos pendientes
                      </span>
                    </label>
                  </div>
                </>
              )}
            </div>

            {/* Count */}
            <div className="flex items-center justify-between rounded-md border bg-muted/50 px-4 py-3">
              <span className="text-sm">
                {loadingCount ? (
                  <span className="text-muted-foreground">Contando...</span>
                ) : (
                  <span className="font-medium">
                    <Users className="inline mr-1.5 h-4 w-4" />
                    {count ?? 0} destinatario(s)
                  </span>
                )}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShowRecipients}
                disabled={loadingRecipients || count === 0}
              >
                {loadingRecipients ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Ver destinatarios
              </Button>
            </div>
          </div>

          {/* Recipient List */}
          {showRecipients && (
            <div className="rounded-lg border bg-white p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-sm">
                  {selectedIds.size} de {recipients.length} seleccionado(s)
                </h2>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={selectAll}>
                    Todos
                  </Button>
                  <Button variant="ghost" size="sm" onClick={deselectAll}>
                    Ninguno
                  </Button>
                </div>
              </div>

              <div className="max-h-64 overflow-y-auto space-y-1">
                {recipients.map((r) => (
                  <label
                    key={r.id}
                    className="flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-muted/50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedIds.has(r.id)}
                      onChange={() => toggleRecipient(r.id)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{r.nombre}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {r.email}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-xs shrink-0">
                      {r.extra}
                    </Badge>
                  </label>
                ))}
              </div>

              {/* Manual add */}
              <div className="border-t pt-3">
                {!showAddSearch ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAddSearch(true)}
                  >
                    <Plus className="mr-1.5 h-4 w-4" />
                    Agregar destinatario
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Buscar por nombre o email..."
                        value={addSearchQuery}
                        onChange={(e) => setAddSearchQuery(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleAddSearch()
                        }
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleAddSearch}
                        disabled={searchingAdd}
                      >
                        {searchingAdd ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Search className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setShowAddSearch(false);
                          setAddSearchResults([]);
                          setAddSearchQuery("");
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    {addSearchResults.length > 0 && (
                      <div className="max-h-32 overflow-y-auto space-y-1 border rounded-md p-2">
                        {addSearchResults.map((r) => (
                          <div
                            key={r.id}
                            className="flex items-center justify-between px-2 py-1 text-sm"
                          >
                            <div className="min-w-0">
                              <p className="font-medium truncate">{r.nombre}</p>
                              <p className="text-xs text-muted-foreground">
                                {r.email}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => addRecipient(r)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right column: Compose + Send */}
        <div className="space-y-4">
          <div className="rounded-lg border bg-white p-4 space-y-4">
            <h2 className="font-semibold">Componer Mensaje</h2>

            {/* Link to content */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Vincular a noticia</Label>
                <Select
                  value={linkedNoticia}
                  onValueChange={handleLinkNoticia}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Ninguna</SelectItem>
                    {noticias.map((n) => (
                      <SelectItem key={n.id} value={n.id}>
                        {n.titulo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Vincular a fecha</Label>
                <Select value={linkedFecha} onValueChange={handleLinkFecha}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Ninguna</SelectItem>
                    {fechas.map((f) => (
                      <SelectItem key={f.id} value={f.id}>
                        {f.titulo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Subject & Message */}
            <div className="space-y-1.5">
              <Label htmlFor="msg-asunto">Asunto</Label>
              <Input
                id="msg-asunto"
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
                placeholder="Asunto del mensaje"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="msg-mensaje">Mensaje</Label>
              <Textarea
                id="msg-mensaje"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Escribe tu mensaje..."
                rows={6}
              />
            </div>

            {/* Channel toggle */}
            <div className="flex gap-1 rounded-lg border bg-muted/50 p-1">
              <button
                onClick={() => {
                  setChannel("email");
                  setWhatsappList(null);
                }}
                className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                  channel === "email"
                    ? "bg-white shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Mail className="h-4 w-4" />
                Email
              </button>
              <button
                onClick={() => {
                  setChannel("whatsapp");
                  setWhatsappList(null);
                }}
                className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                  channel === "whatsapp"
                    ? "bg-white shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <MessageCircle className="h-4 w-4" />
                Lista WhatsApp
              </button>
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
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 shrink-0" />
                )}
                {result.message}
              </div>
            )}

            {/* WhatsApp list display */}
            {whatsappList && (
              <div className="space-y-2 rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {whatsappList.length} contacto(s)
                  </span>
                  <Button variant="outline" size="sm" onClick={copyPhoneNumbers}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copiar números
                  </Button>
                </div>
                <div className="max-h-40 overflow-y-auto space-y-1 text-sm">
                  {whatsappList.map((r, i) => (
                    <div
                      key={i}
                      className="flex justify-between px-2 py-1 rounded hover:bg-muted/50"
                    >
                      <span>{r.nombre}</span>
                      <span className="text-muted-foreground font-mono text-xs">
                        {r.telefono}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Send button */}
            <Button
              onClick={handleSend}
              disabled={
                sending ||
                selectedCount === 0 ||
                !asunto.trim() ||
                !mensaje.trim()
              }
              className="w-full"
            >
              {sending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {channel === "email" ? "Enviando..." : "Generando lista..."}
                </>
              ) : (
                <>
                  {channel === "email" ? (
                    <Mail className="mr-2 h-4 w-4" />
                  ) : (
                    <MessageCircle className="mr-2 h-4 w-4" />
                  )}
                  {channel === "email"
                    ? `Enviar a ${selectedCount} destinatario(s)`
                    : `Generar lista (${selectedCount})`}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Send History */}
      <div className="rounded-lg border bg-white p-4 space-y-3">
        <h2 className="font-semibold">Historial de Envíos</h2>
        {loadingHistory ? (
          <p className="text-sm text-muted-foreground">Cargando...</p>
        ) : history.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No hay envíos anteriores para{" "}
            {audiencia === "estudiantes" ? "estudiantes" : "aplicantes"}.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                    Fecha
                  </th>
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                    Canal
                  </th>
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                    Asunto
                  </th>
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                    Filtros
                  </th>
                  <th className="px-3 py-2 text-right font-medium text-muted-foreground">
                    Destinatarios
                  </th>
                </tr>
              </thead>
              <tbody>
                {history.map((send) => (
                  <tr key={send.id} className="border-b last:border-0">
                    <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">
                      {new Date(send.created_at).toLocaleDateString("es-MX", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-3 py-2">
                      <Badge
                        variant="secondary"
                        className={
                          send.tipo === "email"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }
                      >
                        {send.tipo === "email" ? "Email" : "WhatsApp"}
                      </Badge>
                    </td>
                    <td className="px-3 py-2 max-w-[200px] truncate">
                      {send.asunto}
                    </td>
                    <td className="px-3 py-2">
                      <span className="text-xs text-muted-foreground">
                        {formatFilters(send.filtros, programs)}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right font-medium">
                      {send.total_destinatarios}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function formatFilters(
  filtros: Record<string, unknown>,
  programs: Program[]
): string {
  const parts: string[] = [];
  if (filtros.programa) {
    const p = programs.find((pr) => pr.slug === filtros.programa);
    parts.push(p?.shortName ?? String(filtros.programa));
  }
  if (filtros.status) {
    parts.push(
      applicationStatusLabels[String(filtros.status)] ?? String(filtros.status)
    );
  }
  if (filtros.cuatrimestre) {
    parts.push(`Cuatrimestre ${filtros.cuatrimestre}`);
  }
  if (filtros.missing_docs) {
    parts.push("Docs pendientes");
  }
  return parts.length > 0 ? parts.join(", ") : "Todos";
}
