import { z } from "zod";

// CURP format: 4 letters, 6 digits, 6 letters, 2 alphanumeric
const curpRegex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/;

export const applicationSchema = z.object({
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.string().email("Correo electrónico inválido"),
  telefono: z
    .string()
    .min(10, "El teléfono debe tener al menos 10 dígitos")
    .regex(/^[\d\s-]+$/, "Teléfono inválido"),
  curp: z
    .string()
    .length(18, "El CURP debe tener 18 caracteres")
    .regex(curpRegex, "Formato de CURP inválido")
    .transform((val) => val.toUpperCase()),
  preparatoria: z
    .string()
    .min(3, "La preparatoria debe tener al menos 3 caracteres"),
  direccion: z
    .string()
    .min(5, "El domicilio debe tener al menos 5 caracteres"),
  programa_id: z.string().min(1, "Selecciona una carrera"),
  como_se_entero: z.string().optional(),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
];
