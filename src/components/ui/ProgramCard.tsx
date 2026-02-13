import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Clock } from "lucide-react";
import type { Program } from "@/types";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProgramCardProps {
  program: Program;
}

export default function ProgramCard({ program }: ProgramCardProps) {
  const IconComponent = Icons[program.icon as keyof typeof Icons] as LucideIcon;

  const categoryLabel =
    program.category === "licenciatura" ? "Licenciatura" : "Ingenieria";

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-200 overflow-hidden group">
      {program.image && (
        <div className="relative h-40 overflow-hidden">
          <Image
            src={program.image}
            alt={program.shortName}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}

      <CardHeader>
        <div className="flex items-center justify-between mb-3">
          {IconComponent && (
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
              <IconComponent className="w-6 h-6" />
            </div>
          )}
          <Badge variant="secondary">{categoryLabel}</Badge>
        </div>
        <div className="font-semibold leading-none tracking-tight text-lg">
          {program.shortName}
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {program.description}
        </p>
        <div className="flex items-center gap-1.5 mt-4 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{program.duration}</span>
        </div>
      </CardContent>

      <CardFooter>
        <Link
          href={`/carreras/${program.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          Ver programa
          <ArrowRight className="w-4 h-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
