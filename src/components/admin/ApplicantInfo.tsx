"use client";

import type { Application } from "@/types/database";
import { Phone, Mail, MapPin, User, School, FileText } from "lucide-react";

interface Props {
  application: Application;
  programName: string;
}

export default function ApplicantInfo({ application, programName }: Props) {
  const whatsappUrl = `https://wa.me/52${application.telefono.replace(/[-\s]/g, "")}`;

  return (
    <div className="rounded-lg border bg-white p-6 space-y-4">
      <h2 className="font-semibold text-lg">Información del Solicitante</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="flex items-start gap-3">
          <User className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
          <div>
            <p className="text-muted-foreground">Nombre</p>
            <p className="font-medium">{application.nombre}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Mail className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
          <div>
            <p className="text-muted-foreground">Correo</p>
            <a
              href={`mailto:${application.email}`}
              className="font-medium hover:text-primary transition-colors"
            >
              {application.email}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
          <div>
            <p className="text-muted-foreground">Teléfono / WhatsApp</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-green-600 hover:text-green-700 transition-colors"
            >
              {application.telefono} ↗ WhatsApp
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <FileText className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
          <div>
            <p className="text-muted-foreground">CURP</p>
            <p className="font-medium font-mono">{application.curp}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <School className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
          <div>
            <p className="text-muted-foreground">Preparatoria</p>
            <p className="font-medium">{application.preparatoria}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <FileText className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
          <div>
            <p className="text-muted-foreground">Programa</p>
            <p className="font-medium">{programName}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 sm:col-span-2">
          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
          <div>
            <p className="text-muted-foreground">Domicilio</p>
            <p className="font-medium">{application.direccion}</p>
          </div>
        </div>

        {application.como_se_entero && (
          <div className="flex items-start gap-3 sm:col-span-2">
            <User className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <p className="text-muted-foreground">¿Cómo se enteró?</p>
              <p className="font-medium">{application.como_se_entero}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
