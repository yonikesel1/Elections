"use client";
import { ResponsiveBar } from "@nivo/bar";
import { parties } from "../data/parties";
import { supabase } from "../lib/supabaseClient";
import { useEffect, useState } from "react";
import Image from "next/image";

type HistoType = "intended_vote" | "party_id";

// Map party IDs to their leader image paths
const partyLeaderImages: Record<string, string> = {
  likud: "/leaders/netanyahu.jpg",
  yesh_atid: "/leaders/lapid.jpg",
  machane_mamlachti: "/leaders/beny_gantz.png",
  shas: "/leaders/deri.jpg",
  yahadut_hatora: "/leaders/gafni.jpg",
  tzionut_datit: "/leaders/smotrich.jpg",
  otzma_yehudit: "/leaders/ben_gvir.jpg",
  israel_beitenu: "/leaders/lieberman.jpg",
  hademokratim: "/leaders/golan.jpg",
  hadash_taal: "/leaders/ayman_odeh.jpg",
  raam: "/leaders/abbas.jpg",
  balad: "/leaders/shehadeh.jpg",
  bennett2026: "/leaders/bennett.jpg",
  undecided: "/parties/undecided.svg",
};

export default function PartyHistogram({ type, title }: { type: HistoType; title: string }) {
  const [data, setData] = useState<{ id: string; name: string; count: number; image: string }[]>(
    [],
  );

  /* fetch counts */
  useEffect(() => {
    (async () => {
      // For party_id, we need to get the final_party field instead
      const field = type === "party_id" ? "final_party" : type;
      const { data } = await supabase
        .from("responses")
        .select(field)
        .not(field, "is", null)
        .limit(10000);
      if (!data) return;

      const counts: Record<string, number> = {};
      data.forEach((row) => {
        const id = (row as Record<string, unknown>)[field] as string;
        counts[id] = (counts[id] || 0) + 1;
      });

      const enriched = Object.entries(counts)
        .map(([id, count]) => {
          if (id === "undecided") {
            return {
              id,
              name: "לא החלטתי",
              count,
              image: partyLeaderImages[id],
            };
          }
          const party = parties.find((p) => p.id === id);
          return {
            id,
            name: party ? party.name : id,
            count,
            image: partyLeaderImages[id] ?? "/leaders/placeholder.jpg",
          };
        })
        .sort((a, b) => b.count - a.count);

      setData(enriched);
    })();
  }, [type]);

  /* Nivo expects an array of objects with keys */
  const nivoData = data.map((d) => ({ party: d.name, קולות: d.count }));

  return (
    <div className="space-y-3 rounded-3xl bg-white p-4 shadow">
      <h4 className="text-center text-xl font-semibold">{title}</h4>

      <div className="h-56">
        <ResponsiveBar
          data={nivoData}
          keys={["קולות"]}
          indexBy="party"
          margin={{ top: 10, right: 20, bottom: 80, left: 40 }}
          padding={0.3}
          colors={{ scheme: "set3" }}
          borderRadius={4}
          enableLabel={false}
          animate
          axisLeft={{
            tickSize: 0,
            tickPadding: 4,
            tickRotation: 0,
          }}
          axisBottom={{
            tickSize: 0,
            tickPadding: 6,
            tickRotation: 0,
            renderTick: ({ x, y, value, tickIndex }) => {
              const image = data[tickIndex]?.image;
              return (
                <g transform={`translate(${x},${y + 20})`}>
                  <foreignObject
                    x={-20}
                    y={0}
                    width={40}
                    height={40}
                    style={{ overflow: "visible" }}
                  >
                    <div className="flex items-center justify-center">
                      <Image
                        src={image}
                        alt={value}
                        width={40}
                        height={40}
                        className="rounded-full border border-white shadow object-cover aspect-square"
                      />
                    </div>
                  </foreignObject>
                </g>
              );
            },
          }}
          tooltip={({ indexValue, data }) => (
            <div className="rounded bg-white px-2 py-1 text-sm shadow">
              {indexValue}: {data["קולות"]}
            </div>
          )}
        />
      </div>
    </div>
  );
}
