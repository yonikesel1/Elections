import { parties, Party } from "@/data/parties";

export interface Answers {
  security: number;
  socioEconomic: number;
  religious: number;
}

export function matchParty(answers: Answers): Party {
  let best: Party = parties[0];
  let bestDistance = Infinity;

  for (const p of parties) {
    const d =
      (answers.security - p.security) ** 2 +
      (answers.socioEconomic - p.socioEconomic) ** 2 +
      (answers.religious - p.religious) ** 2;

    if (d < bestDistance) {
      bestDistance = d;
      best = p;
    }
  }
  return best;
}
