import { Program } from "@/types";

export const programs: Program[] = [
  // ── Licenciaturas ──────────────────────────────────────────────
  {
    slug: "administracion-de-empresas",
    name: "Licenciatura en Administración de Empresas",
    shortName: "Administración de Empresas",
    category: "licenciatura",
    icon: "Briefcase",
    image: "/images/programs/administracion.jpg",
    duration: "9 Cuatrimestres",
    description:
      "Formar líderes administrativos con conocimientos conceptuales y prácticos para gestionar recursos eficientemente y formular estrategias competitivas con ética profesional.",
    perfilIngreso:
      "Interés en negocios, habilidades para el trabajo en equipo, comunicación efectiva, pensamiento analítico, proactividad, y compromiso con la administración.",
    perfilEgreso:
      "Profesionales aptos para analizar y dirigir empresas, desde micro a medianas, creando y operando planes de negocio, satisfaciendo necesidades organizacionales.",
    campoLaboral:
      "Desempeño en empresas públicas o privadas, nacionales o internacionales, donde la innovación administrativa sea clave.",
    semesters: [
      {
        number: 1,
        subjects: [
          "Matemáticas Financieras I",
          "Administración I",
          "Contabilidad I",
          "Informática I",
          "Introducción al Derecho",
          "Organización Social",
          "Metodología de la Investigación",
        ],
      },
      {
        number: 2,
        subjects: [
          "Matemáticas Financieras II",
          "Administración II",
          "Contabilidad II",
          "Informática II",
          "Derecho Civil",
          "Microeconomía",
          "Estadística",
        ],
      },
      {
        number: 3,
        subjects: [
          "Gestión de Empresas",
          "Administración III",
          "Contabilidad III",
          "Informática III",
          "Derecho Mercantil",
          "Macroeconomía",
        ],
      },
      {
        number: 4,
        subjects: [
          "Humanística I",
          "Administración IV",
          "Contabilidad IV",
          "Informática IV",
          "Francés I",
        ],
      },
      {
        number: 5,
        subjects: [
          "Humanística II",
          "Administración V",
          "Costos",
          "Informática V",
          "Francés II",
          "Administración del Personal I",
          "Derecho Laboral",
        ],
      },
      {
        number: 6,
        subjects: [
          "Finanzas",
          "Administración VI",
          "Administración Financiera",
          "Expresión Oral y Escrita",
          "Francés III",
          "Administración de Personal II",
        ],
      },
      {
        number: 7,
        subjects: [
          "Análisis Financiero",
          "Desarrollo Organizacional",
          "Administración del Capital del Trabajo",
          "Administración por Objetivos",
          "Impuestos",
          "Inglés I",
        ],
      },
      {
        number: 8,
        subjects: [
          "Evaluación de Proyectos de Inversión",
          "Administración de la Producción I",
          "Presupuestos",
          "Administración de PYMES",
          "Contabilidad Fiscal",
          "Inglés II",
        ],
      },
      {
        number: 9,
        subjects: [
          "Desarrollo Profesional",
          "Administración de la Producción II",
          "Temas Selectos de Administración",
          "Administración Estratégica",
          "Inglés III",
        ],
      },
    ],
  },
  {
    slug: "comercio-internacional",
    name: "Licenciatura en Comercio Internacional",
    shortName: "Comercio Internacional",
    category: "licenciatura",
    icon: "Globe",
    image: "/images/programs/comercio-internacional.jpg",
    duration: "9 Cuatrimestres",
    description:
      "Formar expertos en comercio internacional capaces de analizar mercados, negociar en contextos multiculturales, manejar logística y operaciones aduaneras, con un enfoque emprendedor y socialmente responsable.",
    perfilIngreso:
      "Conocimientos en administración, derecho, economía, inglés, y análisis socioeconómico. Apertura al cambio y trabajo en equipo.",
    perfilEgreso:
      "Profesionales aptos para gestionar y mejorar procesos de comercio internacional, desarrollar estrategias de mercado, y operar en finanzas internacionales.",
    campoLaboral:
      "Sector privado y público, aduanas, consultoría estratégica, empresas internacionales, logística global, y emprendimiento propio en importación-exportación.",
    semesters: [
      {
        number: 1,
        subjects: [
          "Administración I",
          "Comercio Exterior I",
          "Introducción al Derecho",
          "Matemáticas Financieras I",
          "Metodología de la Investigación",
          "Contabilidad I",
          "Organización Social",
        ],
      },
      {
        number: 2,
        subjects: [
          "Administración II",
          "Contabilidad II",
          "Comercio Exterior II",
          "Mercadotecnia I",
          "Matemáticas Financieras II",
          "Microeconomía",
        ],
      },
      {
        number: 3,
        subjects: [
          "Administración III",
          "Contabilidad III",
          "Marco Legal de la Empresa",
          "Gestión de Empresas",
          "Mercadotecnia II",
          "Macroeconomía",
        ],
      },
      {
        number: 4,
        subjects: [
          "Administración IV",
          "Contabilidad IV",
          "Francés I",
          "Técnicas de Investigación Aplicadas al Comercio",
          "Derecho Mercantil",
          "Administración del Comercio",
        ],
      },
      {
        number: 5,
        subjects: [
          "Administración de las Cadenas de Suministro",
          "Administración V",
          "Costos",
          "Derecho de Comercio Exterior",
          "Francés II",
          "Derecho Fiscal",
          "Estrategia de Mercado",
        ],
      },
      {
        number: 6,
        subjects: [
          "Introducción a la Mercadotecnia Global",
          "Administración Financiera",
          "Administración VI",
          "Expresión Oral y Escrita",
          "Finanzas",
          "Francés III",
        ],
      },
      {
        number: 7,
        subjects: [
          "Logística I",
          "Mercado Laboral",
          "Análisis Financiero",
          "Desarrollo Organizacional",
          "Impuestos",
          "Inglés I",
          "Mercadotecnia Global",
        ],
      },
      {
        number: 8,
        subjects: [
          "Análisis de Costos y Estructuras de Precios",
          "Mercadotecnia Internacional",
          "Evaluación de Proyectos de Inversión",
          "Inglés II",
          "Ley Aduanera",
          "Organismos Internacionales",
          "Logística II",
        ],
      },
      {
        number: 9,
        subjects: [
          "Relaciones Internacionales",
          "Administración Estratégica",
          "Desarrollo Profesional",
          "Inglés III",
          "Logística III",
          "Tratados y Acuerdos Comerciales Internacionales",
        ],
      },
    ],
  },
  {
    slug: "logistica",
    name: "Licenciatura en Logística",
    shortName: "Logística",
    category: "licenciatura",
    icon: "Truck",
    image: "/images/programs/logistica.jpg",
    duration: "9 Cuatrimestres",
    description:
      "Formar expertos en logística con habilidades en administración, finanzas, y comercio internacional, aptos para identificar oportunidades de mercado y gestionar operaciones de importación-exportación con un enfoque multicultural.",
    perfilIngreso:
      "Conocimientos en administración, derecho, economía, investigación, e inglés. Interés en el entorno socioeconómico y político global, capacidad de análisis y trabajo en equipo.",
    perfilEgreso:
      "Profesionales capaces de optimizar procesos logísticos y comerciales internacionales. Habilidad para consultoría, planeación estratégica, y desarrollo de nuevos mercados. Emprendedores con capacidad para iniciar negocios internacionales.",
    campoLaboral:
      "Sectores privado y público, aduanas, empresas internacionales. Consultoría estratégica, diseño de logística global, y creación de empresas de importación-exportación.",
    semesters: [
      {
        number: 1,
        subjects: [
          "Matemáticas Financieras I",
          "Introducción al Derecho",
          "Comercio Exterior I",
          "Administración I",
          "Contabilidad I",
          "Organización",
          "Metodología de la Investigación",
        ],
      },
      {
        number: 2,
        subjects: [
          "Matemáticas Financieras II",
          "Microeconomía",
          "Comercio Exterior II",
          "Administración II",
          "Contabilidad II",
          "Mercadotecnia I",
        ],
      },
      {
        number: 3,
        subjects: [
          "Marco Legal de la Empresa",
          "Macroeconomía",
          "Introducción a la Logística",
          "Administración III",
          "Contabilidad III",
          "Mercadotecnia II",
        ],
      },
      {
        number: 4,
        subjects: [
          "Derecho Mercantil",
          "Técnicas de Investigación Aplicadas al Comercio",
          "Logística de Canales",
          "Administración IV",
          "Envases y Embalajes",
          "Francés I",
        ],
      },
      {
        number: 5,
        subjects: [
          "Derecho del Comercio Exterior",
          "Estadística",
          "Logística Geográfica I",
          "Logística de Mercados I",
          "Administración de la Cadena de Suministros",
          "Francés II",
        ],
      },
      {
        number: 6,
        subjects: [
          "Finanzas",
          "Administración Financiera",
          "Logística Geográfica II",
          "Logística de Mercados II",
          "Expresión Oral y Escrita",
          "Francés III",
        ],
      },
      {
        number: 7,
        subjects: [
          "Análisis Financiero",
          "Tráfico y Transporte I",
          "Logística Geográfica III",
          "Logística de Mercados III",
          "Almacenamiento y Centro de Distribución",
          "Impuestos",
          "Inglés I",
        ],
      },
      {
        number: 8,
        subjects: [
          "Ley Aduanera",
          "Tráfico y Transporte II",
          "Organismos Internacionales",
          "Mercadotecnia Internacional",
          "Evaluación de Proyectos de Inversión",
          "Análisis de Costos y Estructura de Precios",
          "Inglés II",
        ],
      },
      {
        number: 9,
        subjects: [
          "Sistema Aduanal",
          "Contratos y Seguros",
          "Administración Estratégica",
          "Logística Inversa",
          "Tecnología, Negocios y Logística",
          "Desarrollo Profesional",
          "Inglés III",
        ],
      },
    ],
  },

  // ── Ingenierías ────────────────────────────────────────────────
  {
    slug: "ingenieria-industrial-administrativa",
    name: "Ingeniería Industrial Administrativa",
    shortName: "Industrial Administrativa",
    category: "ingenieria",
    icon: "Factory",
    image: "/images/programs/industrial.jpg",
    duration: "9 Cuatrimestres",
    description:
      "Formar ingenieros con excelencia en competencias profesionales, enfocados en la planeación y operación de sistemas de producción y recursos humanos.",
    perfilIngreso:
      "Hábitos de estudio para aprendizaje autónomo, pensamiento crítico, trabajo colaborativo, y organización del tiempo. Conocimientos básicos en matemáticas, estadística, computación, investigación, e inglés. Capacidad de análisis y adaptación a ambientes multiculturales.",
    perfilEgreso:
      "Profesionales éticos y comprometidos, capaces de diseñar y optimizar sistemas de producción, administrar recursos humanos y materiales, y mejorar la rentabilidad empresarial, contribuyendo al desarrollo social y ambiental.",
    campoLaboral:
      "Empresas manufactureras, administrativas, y organizaciones enfocadas en mejoramiento continuo, tanto nacionales como internacionales.",
    semesters: [
      {
        number: 1,
        subjects: [
          "Estática",
          "Álgebra I",
          "Química",
          "Fundamentos de Electrónica",
          "Introducción a la Programación",
          "Introducción a la Contabilidad",
          "Metodología de la Investigación",
        ],
      },
      {
        number: 2,
        subjects: [
          "Dinámica",
          "Álgebra II",
          "Cálculo Diferencial",
          "Fundamentos de Manufactura",
          "Formación del Pensamiento",
          "Introducción a la Administración",
        ],
      },
      {
        number: 3,
        subjects: [
          "Electricidad y Magnetismo",
          "Estadística I",
          "Cálculo Integral",
          "Tecnología de los Materiales",
          "Computación I",
          "Introducción a la Calidad",
          "Psicología Industrial",
        ],
      },
      {
        number: 4,
        subjects: [
          "Sistemas de Medición",
          "Estadística II",
          "Ecuaciones Diferenciales",
          "Teoría de Sistemas",
          "Computación II",
          "Control de Calidad",
        ],
      },
      {
        number: 5,
        subjects: [
          "Instrumentación Industrial",
          "Relaciones Industriales",
          "Transformadas de Laplace",
          "Planeación de la Producción",
          "Sistemas de Producción",
          "Administración de la Cadena de Suministros",
          "Administración del Personal I",
        ],
      },
      {
        number: 6,
        subjects: [
          "Ingeniería de Métodos",
          "Estructura de los Materiales",
          "Administración Financiera",
          "Control de la Producción",
          "Contabilidad de Costos",
          "Expresión Oral y Escrita",
          "Administración del Personal II",
        ],
      },
      {
        number: 7,
        subjects: [
          "Electrónica Industrial",
          "Investigación de Operaciones I",
          "Análisis y Diseño de Planta",
          "Seguridad e Higiene Industrial",
          "Diseño Asistido por Computadora",
          "Inglés I",
          "Administración del Capital de Trabajo",
        ],
      },
      {
        number: 8,
        subjects: [
          "Evaluación de Proyectos de Inversión",
          "Investigación de Operaciones II",
          "Instalaciones Industriales",
          "Legislación Industrial",
          "Procesos de Manufactura",
          "Inglés II",
          "Administración de la Producción I",
        ],
      },
      {
        number: 9,
        subjects: [
          "Desarrollo Profesional",
          "Ingeniería Económica",
          "Ergonomía Industrial",
          "Logística Industrial",
          "Inglés III",
          "Administración de la Producción II",
        ],
      },
    ],
  },
  {
    slug: "ingenieria-en-sistemas-computacionales",
    name: "Ingeniería en Sistemas Computacionales",
    shortName: "Sistemas Computacionales",
    category: "ingenieria",
    icon: "Monitor",
    image: "/images/programs/sistemas.jpg",
    duration: "9 Cuatrimestres",
    description:
      "Formar ingenieros excelentes en competencias profesionales y personales, enfocados en desarrollar, implementar y automatizar sistemas tecnológicos, con una visión emprendedora y sustentable.",
    perfilIngreso:
      "Conocimientos en investigación, matemáticas, estadística, computación e inglés. Habilidades para el razonamiento lógico, trabajo en equipo, y adaptación a ambientes multiculturales.",
    perfilEgreso:
      "Profesionales capaces de diseñar, implementar y administrar software, redes y hardware, optimizando procesos empresariales. Competentes en la integración de tecnologías emergentes, manejo de bases de datos, y liderazgo de proyectos interdisciplinarios, siempre con un enfoque ético y de responsabilidad social.",
    campoLaboral:
      "Empresas de desarrollo de software, tecnología de la información, y cualquier organización con necesidades de soporte tecnológico, a nivel nacional e internacional.",
    semesters: [
      {
        number: 1,
        subjects: [
          "Estática",
          "Álgebra I",
          "Química",
          "Fundamentos de Electrónica",
          "Introducción a la Programación",
          "Introducción a la Contabilidad",
          "Metodología de la Investigación",
        ],
      },
      {
        number: 2,
        subjects: [
          "Dinámica",
          "Álgebra II",
          "Cálculo Diferencial",
          "Diseño de Algoritmos",
          "Formación del Pensamiento",
          "Matemáticas Discretas",
        ],
      },
      {
        number: 3,
        subjects: [
          "Electricidad y Magnetismo",
          "Estadística I",
          "Cálculo Integral",
          "Estructura de Datos",
          "Computación I",
          "Arquitectura de Computadoras",
          "Psicología Industrial",
        ],
      },
      {
        number: 4,
        subjects: [
          "Estadística II",
          "Ecuaciones Diferenciales",
          "Teoría de Sistemas",
          "Computación II",
          "Programación I",
          "Introducción a la Base de Datos",
        ],
      },
      {
        number: 5,
        subjects: [
          "Relaciones Industriales",
          "Transformadas de Laplace",
          "Desarrollo de Aplicaciones I",
          "Programación II",
          "Ética",
          "Base de Datos",
        ],
      },
      {
        number: 6,
        subjects: [
          "Software de Sistemas",
          "Redes I",
          "Contabilidad de Costos",
          "Desarrollo de Aplicaciones II",
          "Expresión Oral y Escrita",
        ],
      },
      {
        number: 7,
        subjects: [
          "Diseño Asistido por Computadora",
          "Inglés I",
          "Desarrollo Organizacional",
          "Administración por Objetivos",
          "Sistemas Operativos",
          "Diseño de Interfaces",
        ],
      },
      {
        number: 8,
        subjects: [
          "Evaluación de Proyectos de Inversión",
          "Telecomunicaciones",
          "Inteligencia Artificial",
          "Desarrollo de Aplicaciones III",
          "Redes II",
          "Inglés II",
        ],
      },
      {
        number: 9,
        subjects: [
          "Desarrollo Profesional",
          "Compiladores",
          "Seguridad en los Sistemas Computacionales",
          "Desarrollo de Aplicaciones IV",
          "Inglés III",
        ],
      },
    ],
  },
  {
    slug: "ingenieria-en-electronica-industrial",
    name: "Ingeniería en Electrónica Industrial",
    shortName: "Electrónica Industrial",
    category: "ingenieria",
    icon: "Cpu",
    image: "/images/programs/electronica.jpg",
    duration: "9 Cuatrimestres",
    description:
      "Formar ingenieros excelentes en su campo, con un enfoque emprendedor, ético y social. Capacitar para identificar y explotar oportunidades empresariales.",
    perfilIngreso:
      "Conocimientos en matemáticas, estadística, computación, e inglés. Habilidades en razonamiento lógico, trabajo en equipo, y autodidactismo.",
    perfilEgreso:
      "Implementación y desarrollo de tecnología para optimizar procesos empresariales. Diseño y administración de redes y software. Gestión de proyectos interdisciplinarios e investigación en tecnologías emergentes.",
    campoLaboral:
      "Empresas de desarrollo de software y TI, producción privada, consultoría técnica, docencia e investigación en centros públicos y privados, y administración pública.",
    semesters: [
      {
        number: 1,
        subjects: [
          "Estática",
          "Álgebra I",
          "Química",
          "Fundamentos de la Electrónica",
          "Introducción a la Programación",
          "Introducción a la Contabilidad",
          "Metodología de la Investigación",
        ],
      },
      {
        number: 2,
        subjects: [
          "Dinámica",
          "Álgebra II",
          "Cálculo Diferencial",
          "Matemáticas Discretas",
          "Electrónica I",
          "Formación del Pensamiento",
        ],
      },
      {
        number: 3,
        subjects: [
          "Electricidad y Magnetismo",
          "Cálculo Integral",
          "Probabilidad y Estadística I",
          "Análisis Vectorial",
          "Electrónica II",
          "Computación I",
          "Psicología Industrial",
        ],
      },
      {
        number: 4,
        subjects: [
          "Ecuaciones Diferenciales",
          "Teoría Electromagnética",
          "Introducción a la Electrónica Lógica",
          "Computación II",
          "Probabilidad y Estadística II",
          "Teoría de Sistemas",
        ],
      },
      {
        number: 5,
        subjects: [
          "Transformadas de Laplace",
          "Circuitos Eléctricos I",
          "Electrónica Lógica I",
          "Sistemas de Producción",
          "Relaciones Industriales",
          "Ética",
        ],
      },
      {
        number: 6,
        subjects: [
          "Circuitos Eléctricos II",
          "Introducción a la Transmisión de Datos",
          "Ingeniería Térmica",
          "Electrónica Lógica II",
          "Contabilidad de Costos",
          "Expresión Oral y Escrita",
        ],
      },
      {
        number: 7,
        subjects: [
          "Teoría de Comunicaciones",
          "Transmisión de Datos",
          "Sistemas Telefónicos",
          "Electrónica para Comunicaciones",
          "Diseño Asistido por Computadora",
          "Inglés I",
        ],
      },
      {
        number: 8,
        subjects: [
          "Electrónica de Potencia I",
          "Electrónica Industrial I",
          "Sistemas de Microondas I",
          "Instrumentación",
          "Inglés II",
          "Evaluación de Proyectos de Inversión",
        ],
      },
      {
        number: 9,
        subjects: [
          "Electrónica de Potencia II",
          "Electrónica Industrial II",
          "Sistemas de Microondas II",
          "Inglés III",
          "Desarrollo Profesional",
        ],
      },
    ],
  },
];

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}

export function getProgramsByCategory(
  category: "licenciatura" | "ingenieria"
): Program[] {
  return programs.filter((p) => p.category === category);
}
