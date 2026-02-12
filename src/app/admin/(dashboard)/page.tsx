import { createClient } from "@/lib/supabase/server";
import { programs } from "@/data/programs";
import ApplicationsTable from "@/components/admin/ApplicationsTable";
import type { Application } from "@/types/database";

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: { status?: string; programa?: string; q?: string };
}) {
  const supabase = createClient();

  let query = supabase
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (searchParams.status) {
    query = query.eq("status", searchParams.status);
  }
  if (searchParams.programa) {
    query = query.eq("programa_id", searchParams.programa);
  }
  if (searchParams.q) {
    const search = `%${searchParams.q}%`;
    query = query.or(
      `nombre.ilike.${search},curp.ilike.${search},email.ilike.${search}`
    );
  }

  const { data: applications } = await query;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Solicitudes</h1>
          <p className="text-sm text-muted-foreground">
            {applications?.length ?? 0} solicitud(es)
          </p>
        </div>
      </div>

      <ApplicationsTable
        applications={(applications as Application[]) ?? []}
        programs={programs}
        currentFilters={searchParams}
      />
    </div>
  );
}
