"use client";

import { useState, type FormEvent } from "react";
import { programs } from "@/data/programs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ContactForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [carrera, setCarrera] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [success, setSuccess] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // In a real application this would send data to an API
    setSuccess(true);
    setNombre("");
    setEmail("");
    setTelefono("");
    setCarrera("");
    setMensaje("");
  }

  if (success) {
    return (
      <div className="rounded-lg border border-green-300 bg-green-50 p-6 text-green-800 text-center">
        <p className="font-semibold text-lg">
          ¡Mensaje enviado!
        </p>
        <p className="mt-1">
          Nos pondremos en contacto contigo pronto.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => setSuccess(false)}
        >
          Enviar otro mensaje
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="contact-nombre">Nombre</Label>
        <Input
          id="contact-nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          placeholder="Tu nombre completo"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-email">Email</Label>
        <Input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="correo@ejemplo.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-telefono">Telefono</Label>
        <Input
          id="contact-telefono"
          type="tel"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
          placeholder="899-000-0000"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-carrera">Carrera de Interes</Label>
        <Select value={carrera} onValueChange={setCarrera}>
          <SelectTrigger id="contact-carrera">
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

      <div className="space-y-2">
        <Label htmlFor="contact-mensaje">Mensaje</Label>
        <Textarea
          id="contact-mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribe tu mensaje aqui..."
          rows={4}
        />
      </div>

      <Button type="submit" className="w-full">
        Enviar Mensaje
      </Button>
    </form>
  );
}
