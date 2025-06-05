export interface Party {
  id: string;
  name: string;
  security: number;
  socioEconomic: number;
  religious: number;
}

export const parties: Party[] = [
  { id: "likud", name: "הליכוד", security: 80, socioEconomic: 65, religious: 70 },
  { id: "yesh_atid", name: "יש עתיד", security: 60, socioEconomic: 40, religious: 30 },
  {
    id: "machane_mamlachti",
    name: "המחנה הממלכתי",
    security: 75,
    socioEconomic: 45,
    religious: 35,
  },
  { id: "shas", name: "ש״ס", security: 60, socioEconomic: 35, religious: 90 },
  { id: "yahadut_hatora", name: "יהדות התורה", security: 40, socioEconomic: 30, religious: 95 },
  { id: "tzionut_datit", name: "הציונות הדתית", security: 90, socioEconomic: 60, religious: 85 },
  { id: "otzma_yehudit", name: "עוצמה יהודית", security: 95, socioEconomic: 55, religious: 80 },
  { id: "yisrael_beitenu", name: "ישראל ביתנו", security: 85, socioEconomic: 70, religious: 15 },
  { id: "avoda", name: "העבודה", security: 40, socioEconomic: 25, religious: 20 },
  { id: "meretz", name: "מרצ", security: 25, socioEconomic: 20, religious: 10 },
  { id: "hadash_taal", name: "חד״ש-תע״ל", security: 20, socioEconomic: 30, religious: 10 },
  { id: "raam", name: "רע״ם", security: 30, socioEconomic: 35, religious: 60 },
  { id: "balad", name: "בל״ד", security: 15, socioEconomic: 25, religious: 30 },
  { id: "bennett2026", name: "בנט 2026", security: 90, socioEconomic: 65, religious: 80 },
];
