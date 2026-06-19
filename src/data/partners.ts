import type { StaticImageData } from "next/image";
import partner1 from "@/assets/partners/partner-1.svg";
import partner2 from "@/assets/partners/partner-2.svg";
import partner3 from "@/assets/partners/partner-3.svg";
import partner4 from "@/assets/partners/partner-4.svg";
import partner5 from "@/assets/partners/partner-5.svg";
import partner6 from "@/assets/partners/partner-6.svg";
import partner7 from "@/assets/partners/partner-7.svg";
import partner8 from "@/assets/partners/partner-8.svg";

export interface Partner {
  id: string;
  name: string;
  image: StaticImageData;
  url?: string;
}

export const partners: Partner[] = [
  { id: "partner-1", name: "Aliado 1", image: partner1 },
  { id: "partner-2", name: "Aliado 2", image: partner2 },
  { id: "partner-3", name: "Aliado 3", image: partner3 },
  { id: "partner-4", name: "Aliado 4", image: partner4 },
  { id: "partner-5", name: "Aliado 5", image: partner5 },
  { id: "partner-6", name: "Aliado 6", image: partner6 },
  { id: "partner-7", name: "Aliado 7", image: partner7 },
  { id: "partner-8", name: "Aliado 8", image: partner8 },
];
