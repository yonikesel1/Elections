"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const PartyHistogram = dynamic(() => import("../../components/PartyHistogram"), {
  ssr: false,
});

export default function StatsPage() {
  const [me, setMe] = useState({
    security: 50,
    socioEconomic: 50,
    religious: 50,
  });

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("myAnswers") || "{}");
      if (saved.security) setMe(saved);
    } catch {
      // ignore JSON parse errors
    }
  }, []);

  return (
    <main className="mx-auto max-w-6xl space-y-12 p-4">
      {/* Histograms */}
      <section className="space-y-8">
        <PartyHistogram type="party_id" title="תוצאות הסליידרים" />
        <PartyHistogram type="intended_vote" title="תוצאות הבחירה" />
      </section>
    </main>
  );
}
