"use client";
export const dynamic = "force-dynamic"; // disable prerendering

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { matchParty } from "../../lib/matchParty";
import { saveResponse } from "../../lib/saveResponse";
import PartySelect from "../../components/PartySelect";

function parseNum(v: string | null): number | null {
  const n = Number(v);
  return Number.isFinite(n) ? Math.min(Math.max(n, 0), 100) : null;
}

function ResultContent() {
  const router = useRouter();
  const sp = useSearchParams();
  const [selected, setSelected] = useState<string | "">("");

  const security = parseNum(sp.get("s"));
  const socioEconomic = parseNum(sp.get("e"));
  const religious = parseNum(sp.get("r"));

  if (security === null || socioEconomic === null || religious === null) {
    return <p className="p-4">פרמטרים חסרים – נסה/י שוב.</p>;
  }

  const party = matchParty({ security, socioEconomic, religious });

  async function handleSubmit(intended: string | null) {
    await saveResponse({
      security: security as number,
      socio_economic: socioEconomic as number,
      religious: religious as number,
      intended_vote: intended,
      final_party: party.id,
    });
    router.push("/stats");
  }

  return (
    <div className="mx-auto max-w-md space-y-6 p-4">
      <h2 className="text-2xl font-semibold text-center">התוצאה שלך</h2>

      <div className="rounded-3xl bg-neutral-100 p-6 shadow-lg flex flex-col items-center gap-4">
        <Image
          src={party.logo}
          alt={party.name}
          width={64}
          height={64}
          className="rounded-full border border-white shadow object-cover aspect-square"
        />
        <p className="text-xl font-bold text-brand-600">{party.name}</p>
      </div>

      <div className="space-y-4 rounded bg-neutral-100 p-4">
        <p className="font-medium text-center">לאיזו מפלגה את/ה מתכנן/ת להצביע?</p>
        <PartySelect value={selected} onChange={setSelected} />

        <div className="flex gap-2">
          <button
            className="flex-1 rounded-lg bg-brand-600 py-2 text-white disabled:opacity-40"
            disabled={!selected}
            onClick={() => handleSubmit(selected)}
          >
            שלח/י
          </button>
          <button className="flex-1 rounded-lg border py-2" onClick={() => handleSubmit(null)}>
            דלג/י
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="p-4">טוען...</div>}>
      <ResultContent />
    </Suspense>
  );
}
