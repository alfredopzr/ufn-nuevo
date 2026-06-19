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
    <Link
      href={`/carreras/${program.slug}`}
      className="block h-full group rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Card className="flex flex-row md:flex-col h-full hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer">
        <div className="relative w-28 sm:w-32 shrink-0 md:w-full md:h-40 self-stretch">
          <Image
            src={program.image}
            alt={program.shortName}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 128px, (max-width: 1024px) 50vw, 33vw"
            placeholder="blur"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        <div className="flex flex-1 flex-col min-w-0">
          <CardHeader className="p-3 pb-0 md:p-6">
            <div className="flex items-center justify-between gap-2 mb-1 md:mb-3">
              {IconComponent && (
                <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                  <IconComponent className="w-6 h-6" />
                </div>
              )}
              <Badge variant="secondary" className="text-[10px] md:text-xs ml-auto md:ml-0">
                {categoryLabel}
              </Badge>
            </div>
            <div className="font-semibold leading-tight tracking-tight text-sm md:text-lg">
              {program.shortName}
            </div>
          </CardHeader>

          <CardContent className="flex-1 p-3 pt-1 md:p-6 md:pt-0">
            <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {program.description}
            </p>
            <div className="flex items-center gap-1.5 mt-2 md:mt-4 text-xs md:text-sm text-muted-foreground">
              <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span>{program.duration}</span>
            </div>
          </CardContent>

          <CardFooter className="hidden md:flex p-6 pt-0">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:underline">
              Ver programa
              <ArrowRight className="w-4 h-4" />
            </span>
          </CardFooter>
        </div>

        <div className="flex items-center pr-3 md:hidden shrink-0">
          <ArrowRight className="w-4 h-4 text-primary" />
        </div>
      </Card>
    </Link>
  );
}
