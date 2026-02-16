import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { programs } from "@/data/programs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import StudentDetail from "@/components/admin/StudentDetail";
import type { Student } from "@/types/database";

export default async function StudentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();

  const { data: student } = await supabase
    .from("students")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!student) {
    notFound();
  }

  const program = programs.find(
    (p) => p.slug === (student as Student).programa_id
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/estudiantes">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">
            {(student as Student).nombre}
          </h1>
          <p className="text-sm text-muted-foreground">
            {program?.name ?? (student as Student).programa_id} —{" "}
            {(student as Student).matricula}
          </p>
        </div>
      </div>

      <StudentDetail
        student={student as Student}
        programs={programs}
      />
    </div>
  );
}
