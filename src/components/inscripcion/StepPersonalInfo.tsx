"use client";

import { useState, type FormEvent } from "react";
import { programs } from "@/data/programs";
import { applicationSchema, type ApplicationFormData } from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight } from "lucide-react";

const referralOptions = [
  "Facebook",
  "Google",
  "Publicidad Exterior",
  "Recomendación",
  "Otro",
];

interface Props {
  defaultValues: ApplicationFormData | null;
  onComplete: (data: ApplicationFormData) => void;
}

export default function StepPersonalInfo({ defaultValues, onComplete }: Props) {
  const [nombre, setNombre] = useState(defaultValues?.nombre ?? "");
  const [email, setEmail] = useState(defaultValues?.email ?? "");
  const [telefono, setTelefono] = useState(defaultValues?.telefono ?? "");
  const [curp, setCurp] = useState(defaultValues?.curp ?? "");
  const [preparatoria, setPreparatoria] = useState(
    defaultValues?.preparatoria ?? ""
  );
  const [direccion, setDireccion] = useState(defaultValues?.direccion ?? "");
  const [programaId, setProgramaId] = useState(
    defaultValues?.programa_id ?? ""
  );
  const [comoSeEntero, setComoSeEntero] = useState(
    defaultValues?.como_se_entero ?? ""
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const raw = {
      nombre,
      email,
      telefono,
      curp: curp.toUpperCase(),
      preparatoria,
      direccion,
      programa_id: programaId,
      como_se_entero: comoSeEntero || undefined,
    };

    const result = applicationSchema.safeParse(raw);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const key = err.path[0] as string;
        if (!fieldErrors[key]) fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    onComplete(result.data);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Carrera */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="programa_id">Carrera *</Label>
          <Select value={programaId} onValueChange={setProgramaId}>
            <SelectTrigger id="programa_id">
              <SelectValue placeholder="Selecciona una carrera" />
            </SelectTrigger>
            <SelectContent>
              {programs.map((program) => (
                <SelectItem key={program.slug} value={program.slug}>
                  {program.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.programa_id && (
            <p className="text-sm text-destructive">{errors.programa_id}</p>
          )}
        </div>

        {/* Nombre */}
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre Completo *</Label>
          <Input
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre completo"
          />
          {errors.nombre && (
            <p className="text-sm text-destructive">{errors.nombre}</p>
          )}
        </div>

        {/* Preparatoria */}
        <div className="space-y-2">
          <Label htmlFor="preparatoria">Preparatoria de Procedencia *</Label>
          <Input
            id="preparatoria"
            value={preparatoria}
            onChange={(e) => setPreparatoria(e.target.value)}
            placeholder="Nombre de tu preparatoria"
          />
          {errors.preparatoria && (
            <p className="text-sm text-destructive">{errors.preparatoria}</p>
          )}
        </div>

        {/* Domicilio */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="direccion">Domicilio *</Label>
          <Input
            id="direccion"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            placeholder="Calle, número, colonia, ciudad"
          />
          {errors.direccion && (
            <p className="text-sm text-destructive">{errors.direccion}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Correo Electrónico *</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>

        {/* Teléfono */}
        <div className="space-y-2">
          <Label htmlFor="telefono">Teléfono *</Label>
          <Input
            id="telefono"
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="899-000-0000"
          />
          {errors.telefono && (
            <p className="text-sm text-destructive">{errors.telefono}</p>
          )}
        </div>

        {/* CURP */}
        <div className="space-y-2">
          <Label htmlFor="curp">CURP *</Label>
          <Input
            id="curp"
            value={curp}
            onChange={(e) => setCurp(e.target.value)}
            maxLength={18}
            className="uppercase"
            placeholder="XXXX000000XXXXXX00"
          />
          {errors.curp && (
            <p className="text-sm text-destructive">{errors.curp}</p>
          )}
        </div>

        {/* Como se enteró */}
        <div className="space-y-2">
          <Label htmlFor="como_se_entero">¿Cómo se enteró de nosotros?</Label>
          <Select value={comoSeEntero} onValueChange={setComoSeEntero}>
            <SelectTrigger id="como_se_entero">
              <SelectValue placeholder="Selecciona una opción" />
            </SelectTrigger>
            <SelectContent>
              {referralOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Submit */}
        <div className="md:col-span-2 pt-2">
          <Button type="submit" className="w-full">
            Continuar
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </form>
  );
}
