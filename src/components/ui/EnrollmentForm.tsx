"use client";

import { useState, type FormEvent } from "react";
import { programs } from "@/data/programs";
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

const referralOptions = [
  "Facebook",
  "Google",
  "Publicidad Exterior",
  "Recomendacion",
  "Otro",
];

export default function EnrollmentForm() {
  const [carrera, setCarrera] = useState("");
  const [nombre, setNombre] = useState("");
  const [preparatoria, setPreparatoria] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [curp, setCurp] = useState("");
  const [comoSeEntero, setComoSeEntero] = useState("");
  const [success, setSuccess] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // In a real application this would send data to an API
    setSuccess(true);
    setCarrera("");
    setNombre("");
    setPreparatoria("");
    setDomicilio("");
    setEmail("");
    setTelefono("");
    setCurp("");
    setComoSeEntero("");
  }

  if (success) {
    return (
      <div className="rounded-lg border border-green-300 bg-green-50 p-6 text-green-800 text-center">
        <p className="font-semibold text-lg">
          ¡Solicitud enviada exitosamente!
        </p>
        <p className="mt-1">
          Nos pondremos en contacto contigo para continuar con el proceso de
          inscripcion.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => setSuccess(false)}
        >
          Enviar otra solicitud
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Carrera - full width */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="enroll-carrera">Carrera</Label>
          <Select value={carrera} onValueChange={setCarrera} required>
            <SelectTrigger id="enroll-carrera">
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
        </div>

        {/* Nombre Completo */}
        <div className="space-y-2">
          <Label htmlFor="enroll-nombre">Nombre Completo</Label>
          <Input
            id="enroll-nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            placeholder="Tu nombre completo"
          />
        </div>

        {/* Preparatoria de Procedencia */}
        <div className="space-y-2">
          <Label htmlFor="enroll-preparatoria">
            Preparatoria de Procedencia
          </Label>
          <Input
            id="enroll-preparatoria"
            value={preparatoria}
            onChange={(e) => setPreparatoria(e.target.value)}
            required
            placeholder="Nombre de tu preparatoria"
          />
        </div>

        {/* Domicilio - full width */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="enroll-domicilio">Domicilio</Label>
          <Input
            id="enroll-domicilio"
            value={domicilio}
            onChange={(e) => setDomicilio(e.target.value)}
            required
            placeholder="Calle, numero, colonia, ciudad"
          />
        </div>

        {/* Correo Electronico */}
        <div className="space-y-2">
          <Label htmlFor="enroll-email">Correo Electronico</Label>
          <Input
            id="enroll-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="correo@ejemplo.com"
          />
        </div>

        {/* Telefono */}
        <div className="space-y-2">
          <Label htmlFor="enroll-telefono">Telefono</Label>
          <Input
            id="enroll-telefono"
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
            placeholder="899-000-0000"
          />
        </div>

        {/* CURP */}
        <div className="space-y-2">
          <Label htmlFor="enroll-curp">CURP</Label>
          <Input
            id="enroll-curp"
            value={curp}
            onChange={(e) => setCurp(e.target.value)}
            required
            maxLength={18}
            className="uppercase"
            placeholder="XXXX000000XXXXXX00"
          />
        </div>

        {/* Como se entero */}
        <div className="space-y-2">
          <Label htmlFor="enroll-referral">
            ¿Como se entero de nosotros?
          </Label>
          <Select value={comoSeEntero} onValueChange={setComoSeEntero}>
            <SelectTrigger id="enroll-referral">
              <SelectValue placeholder="Selecciona una opcion" />
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

        {/* Submit button - full width */}
        <div className="md:col-span-2 pt-2">
          <Button type="submit" className="w-full">
            Enviar Solicitud de Inscripcion
          </Button>
        </div>
      </div>
    </form>
  );
}
