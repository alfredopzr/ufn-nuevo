import { createClient } from "@/lib/supabase/server";
import { programs } from "@/data/programs";
import ApplicationsTable from "@/components/admin/ApplicationsTable";
import DashboardStats from "@/components/admin/DashboardStats";
import type { Application } from "@/types/database";

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: { status?: string; programa?: string; q?: string };
}) {
  const supabase = createClient();

  // Unfiltered query for stats (lightweight — only needed columns)
  const statsQuery = supabase
    .from("applications")
    .select("id, status, created_at, programa_id");

  // Filtered query for the table
  let tableQuery = supabase
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (searchParams.status) {
    tableQuery = tableQuery.eq("status", searchParams.status);
  }
  if (searchParams.programa) {
    tableQuery = tableQuery.eq("programa_id", searchParams.programa);
  }
  if (searchParams.q) {
    const search = `%${searchParams.q}%`;
    tableQuery = tableQuery.or(
      `nombre.ilike.${search},curp.ilike.${search},email.ilike.${search}`
    );
  }

  // Run both queries in parallel
  const [{ data: allApplications }, { data: filteredApplications }] =
    await Promise.all([statsQuery, tableQuery]);

  return (
    <div className="space-y-6">
      <DashboardStats
        applications={(allApplications as Application[]) ?? []}
      />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Solicitudes</h1>
          <p className="text-sm text-muted-foreground">
            {filteredApplications?.length ?? 0} solicitud(es)
          </p>
        </div>
      </div>

      <ApplicationsTable
        applications={(filteredApplications as Application[]) ?? []}
        programs={programs}
        currentFilters={searchParams}
      />
    </div>
  );
}
