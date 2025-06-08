export interface Party {
  id: string;
  name: string;
  security: number;
  socioEconomic: number;
  religious: number;
  logo: string; // '/leaders/{leader}.jpg'
}

export const parties: Party[] = [
  {
    id: "likud",
    name: "הליכוד",
    security: 80,
    socioEconomic: 65,
    religious: 70,
    logo: "/leaders/netanyahu.jpg",
  },
  {
    id: "yesh_atid",
    name: "יש עתיד",
    security: 70,
    socioEconomic: 75,
    religious: 30,
    logo: "/leaders/lapid.jpg",
  },
  {
    id: "machane_mamlachti",
    name: "המחנה הממלכתי",
    security: 75,
    socioEconomic: 70,
    religious: 35,
    logo: "/leaders/beny_gantz.png",
  },
  {
    id: "shas",
    name: "ש״ס",
    security: 60,
    socioEconomic: 40,
    religious: 95,
    logo: "/leaders/deri.jpg",
  },
  {
    id: "yahadut_hatora",
    name: "יהדות התורה",
    security: 50,
    socioEconomic: 30,
    religious: 100,
    logo: "/leaders/gafni.jpg",
  },
  {
    id: "tzionut_datit",
    name: "הציונות הדתית",
    security: 85,
    socioEconomic: 50,
    religious: 90,
    logo: "/leaders/smotrich.jpg",
  },
  {
    id: "otzma_yehudit",
    name: "עוצמה יהודית",
    security: 95,
    socioEconomic: 55,
    religious: 80,
    logo: "/leaders/ben_gvir.jpg",
  },
  {
    id: "israel_beitenu",
    name: "ישראל ביתנו",
    security: 90,
    socioEconomic: 60,
    religious: 20,
    logo: "/leaders/lieberman.jpg",
  },
  {
    id: "hademokratim",
    name: "הדמוקרטים",
    security: 65,
    socioEconomic: 75,
    religious: 25,
    logo: "/leaders/golan.jpg",
  },
  {
    id: "hadash_taal",
    name: "חד״ש-תע״ל",
    security: 30,
    socioEconomic: 70,
    religious: 40,
    logo: "/leaders/ayman_odeh.jpg",
  },
  {
    id: "raam",
    name: "רע״ם",
    security: 40,
    socioEconomic: 40,
    religious: 90,
    logo: "/leaders/abbas.jpg",
  },
  {
    id: "balad",
    name: "בל״ד",
    security: 15,
    socioEconomic: 25,
    religious: 30,
    logo: "/leaders/shehadeh.jpg",
  },
  {
    id: "bennett2026",
    name: "בנט 2026",
    security: 90,
    socioEconomic: 65,
    religious: 80,
    logo: "/leaders/bennett.jpg",
  },
];
