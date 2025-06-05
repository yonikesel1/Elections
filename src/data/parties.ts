export interface Party {
  id: string;
  name: string;
  security: number;
  socioEconomic: number;
  religious: number;
  logo: string; // '/parties/{id}.svg'
}

export const parties: Party[] = [
  {
    id: "likud",
    name: "הליכוד",
    security: 80,
    socioEconomic: 65,
    religious: 70,
    logo: "/parties/likud.svg",
  },
  {
    id: "yesh_atid",
    name: "יש עתיד",
    security: 70,
    socioEconomic: 75,
    religious: 30,
    logo: "/parties/yesh_atid.svg",
  },
  {
    id: "machane_mamlachti",
    name: "המחנה הממלכתי",
    security: 75,
    socioEconomic: 70,
    religious: 35,
    logo: "/parties/machane_mamlachti.svg",
  },
  {
    id: "shas",
    name: "ש״ס",
    security: 60,
    socioEconomic: 40,
    religious: 95,
    logo: "/parties/shas.svg",
  },
  {
    id: "yahadut_hatora",
    name: "יהדות התורה",
    security: 50,
    socioEconomic: 30,
    religious: 100,
    logo: "/parties/yahadut_hatora.svg",
  },
  {
    id: "tzionut_datit",
    name: "הציונות הדתית",
    security: 85,
    socioEconomic: 50,
    religious: 90,
    logo: "/parties/tzionut_datit.svg",
  },
  {
    id: "otzma_yehudit",
    name: "עוצמה יהודית",
    security: 95,
    socioEconomic: 55,
    religious: 80,
    logo: "/parties/otzma_yehudit.svg",
  },
  {
    id: "israel_beitenu",
    name: "ישראל ביתנו",
    security: 90,
    socioEconomic: 60,
    religious: 20,
    logo: "/parties/israel_beitenu.svg",
  },
  {
    id: "haavoda",
    name: "העבודה",
    security: 60,
    socioEconomic: 80,
    religious: 30,
    logo: "/parties/haavoda.svg",
  },
  {
    id: "meretz",
    name: "מרצ",
    security: 40,
    socioEconomic: 85,
    religious: 20,
    logo: "/parties/meretz.svg",
  },
  {
    id: "hadash_taal",
    name: "חד״ש-תע״ל",
    security: 30,
    socioEconomic: 70,
    religious: 40,
    logo: "/parties/hadash_taal.svg",
  },
  {
    id: "raam",
    name: "רע״ם",
    security: 40,
    socioEconomic: 40,
    religious: 90,
    logo: "/parties/raam.svg",
  },
  {
    id: "balad",
    name: "בל״ד",
    security: 15,
    socioEconomic: 25,
    religious: 30,
    logo: "/parties/balad.svg",
  },
  {
    id: "bennett2026",
    name: "בנט 2026",
    security: 90,
    socioEconomic: 65,
    religious: 80,
    logo: "/parties/bennett2026.svg",
  },
];
