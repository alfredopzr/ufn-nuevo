export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const faqCategories = [
  "Admisiones",
  "Costos y Pagos",
  "Vida Académica",
  "Documentos y Trámites",
];

export const faqItems: FAQItem[] = [
  // ── Admisiones ──────────────────────────────────────────────
  {
    question: "¿Cuáles son los requisitos para inscribirme?",
    answer:
      "Para inscribirte necesitas: certificado de bachillerato o constancia de estudios, acta de nacimiento, CURP, identificación oficial (INE o pasaporte), 6 fotografías tamaño infantil y comprobante de domicilio reciente. Si eres extranjero, también necesitas tu documento migratorio vigente.",
    category: "Admisiones",
  },
  {
    question: "¿Cuándo son los periodos de inscripción?",
    answer:
      "Manejamos inscripciones en dos periodos: enero y agosto de cada año. Sin embargo, puedes iniciar tu proceso de pre-registro en cualquier momento a través de nuestro formulario en línea para asegurar tu lugar.",
    category: "Admisiones",
  },
  {
    question: "¿Necesito presentar examen de admisión?",
    answer:
      "No, la Universidad Frontera Norte no aplica examen de admisión. El proceso de inscripción se basa en la entrega completa de tu documentación y el cumplimiento de los requisitos establecidos.",
    category: "Admisiones",
  },
  {
    question:
      "¿Puedo inscribirme si aún no tengo mi certificado de bachillerato?",
    answer:
      "Sí, puedes iniciar tu proceso con una constancia de estudios que indique que estás cursando el último semestre de bachillerato. Tendrás un plazo determinado después del inicio de clases para entregar tu certificado oficial.",
    category: "Admisiones",
  },

  // ── Costos y Pagos ─────────────────────────────────────────
  {
    question: "¿Cuánto cuesta la inscripción y las mensualidades?",
    answer:
      "Los costos varían según el programa académico. Te invitamos a comunicarte directamente con nosotros al 899-454-6840 o por WhatsApp al 899-160-4645 para recibir información detallada sobre costos de inscripción, mensualidades y cualquier promoción vigente.",
    category: "Costos y Pagos",
  },
  {
    question: "¿Ofrecen planes de pago o facilidades de pago?",
    answer:
      "Sí, contamos con planes de pago flexibles para que puedas cubrir tus mensualidades de manera cómoda. También manejamos descuentos por pago anticipado del semestre y becas para estudiantes destacados.",
    category: "Costos y Pagos",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Aceptamos pagos en efectivo directamente en caja, transferencia bancaria, depósito en ventanilla y pago con tarjeta de débito o crédito. Al realizar tu pago, recibirás un comprobante oficial de la universidad.",
    category: "Costos y Pagos",
  },
  {
    question: "¿Hay becas disponibles para los estudiantes?",
    answer:
      "Sí, la Universidad Frontera Norte ofrece diferentes esquemas de becas: beca por promedio académico, beca deportiva y beca socioeconómica. Los requisitos y porcentajes varían según el tipo de beca. Consulta con el departamento de servicios escolares para más detalles.",
    category: "Costos y Pagos",
  },

  // ── Vida Académica ─────────────────────────────────────────
  {
    question: "¿Cuánto duran las carreras?",
    answer:
      "Nuestras licenciaturas e ingenierías tienen una duración de 9 cuatrimestres, dependiendo del programa. Cada cuatrimestre tiene una duración aproximada de 4 meses, por lo que puedes concluir tu carrera en aproximadamente 3 años.",
    category: "Vida Académica",
  },
  {
    question: "¿Los programas tienen validez oficial de la SEP?",
    answer:
      "Sí, todos nuestros programas académicos cuentan con Reconocimiento de Validez Oficial de Estudios (RVOE) otorgado por la Secretaría de Educación Pública (SEP). Nuestra clave de incorporación es 28PSU0198S, lo que garantiza que tu título profesional y cédula serán reconocidos a nivel nacional.",
    category: "Vida Académica",
  },
  {
    question: "¿Cuáles son los horarios de clases?",
    answer:
      "Ofrecemos horarios flexibles diseñados para quienes trabajan. Contamos con turnos matutino, vespertino y sabatino, dependiendo del programa y la disponibilidad. Consulta los horarios específicos de la carrera que te interesa.",
    category: "Vida Académica",
  },
  {
    question: "¿Ofrecen modalidad en línea o híbrida?",
    answer:
      "Actualmente nuestros programas son presenciales, lo que permite una interacción directa con profesores y compañeros. Sin embargo, utilizamos plataformas digitales como apoyo para la entrega de tareas, materiales de estudio y comunicación académica.",
    category: "Vida Académica",
  },

  // ── Documentos y Trámites ──────────────────────────────────
  {
    question: "¿Cómo puedo tramitar mi CURP si no la tengo?",
    answer:
      "Puedes obtener tu CURP de forma gratuita en línea a través del sitio oficial del gobierno: gob.mx/curp. Solo necesitas ingresar tus datos personales y podrás descargarla e imprimirla al instante. Si tienes alguna dificultad, nuestro equipo de servicios escolares puede orientarte.",
    category: "Documentos y Trámites",
  },
  {
    question: "¿Puedo subir mis documentos en línea?",
    answer:
      "Sí, durante el proceso de pre-registro en línea puedes subir copias digitales de tus documentos (formato PDF o imagen). Sin embargo, será necesario entregar los documentos originales y copias físicas al momento de formalizar tu inscripción en nuestras instalaciones.",
    category: "Documentos y Trámites",
  },
  {
    question:
      "¿Cómo solicito una constancia de estudios o historial académico?",
    answer:
      "Puedes solicitar constancias de estudios, historiales académicos y otros documentos oficiales directamente en el departamento de servicios escolares. El tiempo de entrega es de 3 a 5 días hábiles. Algunos documentos pueden tener un costo administrativo.",
    category: "Documentos y Trámites",
  },
  {
    question: "¿Cuál es el proceso de titulación?",
    answer:
      "El proceso de titulación incluye: haber concluido el 100% de los créditos, cumplir con el servicio social, no tener adeudos, y presentar el trabajo recepcional según la modalidad elegida (tesis, tesina, examen de conocimientos, entre otras). El departamento de titulación te guiará durante todo el proceso.",
    category: "Documentos y Trámites",
  },
];
