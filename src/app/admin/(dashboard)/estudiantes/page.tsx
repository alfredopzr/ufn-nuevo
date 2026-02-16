import { createClient } from "@/lib/supabase/server";
import { programs } from "@/data/programs";
import StudentsTable from "@/components/admin/StudentsTable";
import type { Student } from "@/types/database";

export default async function AdminEstudiantesPage({
  searchParams,
}: {
  searchParams: {
    status?: string;
    programa?: string;
    cuatrimestre?: string;
    q?: string;
  };
}) {
  const supabase = createClient();

  let query = supabase
    .from("students")
    .select("*")
    .order("created_at", { ascending: false });

  if (searchParams.status) {
    query = query.eq("status", searchParams.status);
  }
  if (searchParams.programa) {
    query = query.eq("programa_id", searchParams.programa);
  }
  if (searchParams.cuatrimestre) {
    query = query.eq("cuatrimestre", Number(searchParams.cuatrimestre));
  }
  if (searchParams.q) {
    const search = `%${searchParams.q}%`;
    query = query.or(
      `nombre.ilike.${search},matricula.ilike.${search},curp.ilike.${search},email.ilike.${search}`
    );
  }

  const { data: students } = await query;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Estudiantes</h1>
          <p className="text-sm text-muted-foreground">
            {students?.length ?? 0} estudiante(s)
          </p>
        </div>
      </div>

      <StudentsTable
        students={(students as Student[]) ?? []}
        programs={programs}
        currentFilters={searchParams}
      />
    </div>
  );
}
