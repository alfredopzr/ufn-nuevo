import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { programs } from "@/data/programs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ApplicantInfo from "@/components/admin/ApplicantInfo";
import StatusSelector from "@/components/admin/StatusSelector";
import DocumentChecklist from "@/components/admin/DocumentChecklist";
import InternalNotes from "@/components/admin/InternalNotes";
import CommunicationSection from "@/components/admin/CommunicationSection";
import ExportPDFButton from "@/components/admin/ExportPDFButton";

export default async function ApplicationDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();

  // Fetch application
  const { data: application } = await supabase
    .from("applications")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!application) {
    notFound();
  }

  // Fetch document records with their required_document info
  const { data: applicationDocs } = await supabase
    .from("application_documents")
    .select("*, required_documents(*)")
    .eq("application_id", params.id);

  // Fetch communications
  const { data: communications } = await supabase
    .from("communications")
    .select("*")
    .eq("application_id", params.id)
    .order("created_at", { ascending: false });

  // Get current user email for sending emails
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const program = programs.find((p) => p.slug === application.programa_id);

  // Build pending doc names for email template
  interface DocRecord {
    estado: string;
    required_documents: { nombre: string } | null;
  }
  const pendingDocNames = ((applicationDocs ?? []) as DocRecord[])
    .filter((d) => d.estado === "pendiente")
    .map((d) => d.required_documents?.nombre ?? "Documento")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">{application.nombre}</h1>
            <p className="text-sm text-muted-foreground">
              {program?.name ?? application.programa_id} — Solicitud del{" "}
              {new Date(application.created_at).toLocaleDateString("es-MX", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        <ExportPDFButton
          application={application}
          programName={program?.name ?? application.programa_id}
          applicationDocs={applicationDocs ?? []}
          communications={communications ?? []}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-6">
          <ApplicantInfo
            application={application}
            programName={program?.name ?? application.programa_id}
          />
          <DocumentChecklist
            documents={applicationDocs ?? []}
          />
          <CommunicationSection
            applicationId={application.id}
            applicantEmail={application.email}
            applicantName={application.nombre}
            senderEmail={user?.email ?? ""}
            communications={communications ?? []}
            pendingDocNames={pendingDocNames}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <StatusSelector
            applicationId={application.id}
            currentStatus={application.status}
          />
          <InternalNotes
            applicationId={application.id}
            currentNotes={application.notas_internas ?? ""}
          />
        </div>
      </div>
    </div>
  );
}
