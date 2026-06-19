import type { StaticImageData } from "next/image";
import STPSLogo from "@/assets/partners/STPS_Logo_2019.svg.png";
import FILIJLogo from "@/assets/partners/FILIJ.png"
import IntergasLogo from "@/assets/partners/gasolineras-intergas-red-combustibles-reynosa-tamaulipas_mexico_logo-88px.png"
import ReynosaLogo from "@/assets/partners/Logo Vertical Oficial Reynosa  2024-2027.png"
import RMUPSLOGO from "@/assets/partners/LOGO-RMUPS.png"
import FUNDESLATAMLogo from "@/assets/partners/Fundes_Latinoamérica.png"
import CETIEMLogo from "@/assets/partners/CETIEMsc_Logobl_800x800.png"
import CANACARLogo from "@/assets/partners/logo_vertical.png"
import ParqueEolicoLogo from "@/assets/partners/parque-eolico.png"
import ZumaEnergiaLogo from "@/assets/partners/Zuma.png"

export interface Partner {
  id: string;
  name: string;
  image: StaticImageData;
  url?: string;
}

export const partners: Partner[] = [
  {
    id: "stps",
    name: "Secretaría del Trabajo y Previsión Social",
    image: STPSLogo,
  },
  {
    id: "filij",
    name: "Feria Internacional del Libro Infantil y Juvenil Tamaulipas",
    image: FILIJLogo,
  },
  {
    id: "intergas",
    name: "Red de Combustibles Intergas",
    image: IntergasLogo,
  },
  {
    id: "gobierno-reynosa",
    name: "Gobierno Municipal Reynosa",
    image: ReynosaLogo,
  },
  {
    id: "rmups",
    name: "Red Mexicana de Universidades Promotoras de Salud",
    image: RMUPSLOGO,
  },
  {
    id: "fundes",
    name: "FUNDES Latinoamérica",
    image: FUNDESLATAMLogo,
  },
  {
    id: "cetiem",
    name: "Centro Estudiantil de Tecnología y Emprendimiento",
    image: CETIEMLogo,
  },
  {
    id: "canacar",
    name: "Cámara Nacional del Autotransporte de Carga",
    image: CANACARLogo,
  },
  {
    id: "parque-eolico-reynosa",
    name: "Parque Eólico Reynosa",
    image: ParqueEolicoLogo,
  },
  {
    id: "zuma-energia",
    name: "Zuma Energía",
    image: ZumaEnergiaLogo,
  },
];
