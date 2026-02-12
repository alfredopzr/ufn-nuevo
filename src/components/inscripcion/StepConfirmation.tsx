import { CheckCircle2, Mail } from "lucide-react";

export default function StepConfirmation() {
  return (
    <div className="rounded-lg border border-green-300 bg-green-50 p-8 text-center">
      <CheckCircle2 className="mx-auto h-12 w-12 text-green-600 mb-4" />
      <h3 className="text-xl font-semibold text-green-800">
        ¡Solicitud enviada exitosamente!
      </h3>
      <p className="mt-2 text-green-700">
        Tu solicitud ha sido recibida. Te contactaremos por correo electrónico
        con los siguientes pasos.
      </p>
      <div className="mt-4 inline-flex items-center gap-2 rounded-md bg-green-100 px-4 py-2 text-sm text-green-700">
        <Mail className="h-4 w-4" />
        Revisa tu bandeja de entrada para el correo de confirmación
      </div>
    </div>
  );
}
