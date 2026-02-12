import {
  FileText,
  CalendarDays,
  Plus,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Application } from "@/types/database";

interface DashboardStatsProps {
  applications: Application[];
}

interface StatCard {
  label: string;
  value: number;
  icon: React.ReactNode;
  colorClass: string;
}

export default function DashboardStats({ applications }: DashboardStatsProps) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const thisMonth = applications.filter((app) => {
    const d = new Date(app.created_at);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  }).length;

  const byStatus = (status: Application["status"]) =>
    applications.filter((app) => app.status === status).length;

  const cards: StatCard[] = [
    {
      label: "Total",
      value: applications.length,
      icon: <FileText className="h-4 w-4" />,
      colorClass: "text-muted-foreground",
    },
    {
      label: "Este Mes",
      value: thisMonth,
      icon: <CalendarDays className="h-4 w-4" />,
      colorClass: "text-muted-foreground",
    },
    {
      label: "Nuevas",
      value: byStatus("nueva"),
      icon: <Plus className="h-4 w-4" />,
      colorClass: "text-blue-600",
    },
    {
      label: "Aceptadas",
      value: byStatus("aceptada"),
      icon: <CheckCircle2 className="h-4 w-4" />,
      colorClass: "text-green-600",
    },
    {
      label: "En Revisión",
      value: byStatus("en_revision"),
      icon: <Clock className="h-4 w-4" />,
      colorClass: "text-amber-500",
    },
    {
      label: "Rechazadas",
      value: byStatus("rechazada"),
      icon: <XCircle className="h-4 w-4" />,
      colorClass: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {cards.map((card) => (
        <Card key={card.label}>
          <CardContent className="flex flex-col items-center justify-center p-4">
            <span className={card.colorClass}>{card.icon}</span>
            <span className="mt-2 text-2xl font-bold">{card.value}</span>
            <span className="text-xs text-muted-foreground">{card.label}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
