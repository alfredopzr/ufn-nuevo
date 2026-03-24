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
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Wire to a server action with Resend
    // For now, open WhatsApp with the message content
    const whatsappText = `Hola, soy ${nombre}. ${mensaje}`;
    window.open(
      `https://wa.me/528991604645?text=${encodeURIComponent(whatsappText)}`,
      "_blank"
    );
    setIsSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-lg border bg-muted p-6 text-center">
        <p className="font-semibold text-lg">
          ¡Gracias por tu interés!
        </p>
        <p className="mt-2 text-muted-foreground">
          Te redirigimos a WhatsApp para continuar la conversación. Si prefieres, también puedes llamarnos directamente.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => setSubmitted(false)}
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

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
      </Button>
    </form>
  );
}
