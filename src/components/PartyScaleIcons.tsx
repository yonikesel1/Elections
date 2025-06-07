/** Party icons along slider with tool-tips */
"use client";
import Image from "next/image";
import Tooltip from "./UI/Tooltip";
import { parties, Party } from "../data/parties";

export type Axis = "security" | "socioEconomic" | "religious";

export default function PartyScaleIcons({ axis, current }: { axis: Axis; current: number }) {
  const field = {
    security: "security",
    socioEconomic: "socioEconomic",
    religious: "religious",
  }[axis] as keyof Party;

  // find two closest parties on this axis
  const closestIds = [...parties]
    .sort(
      (a, b) => Math.abs((a[field] as number) - current) - Math.abs((b[field] as number) - current),
    )
    .slice(0, 2)
    .map((p) => p.id);

  return (
    <div className="relative h-10 sm:h-7 w-full select-none">
      {parties.map((p: Party) => {
        const value = p[field] as number; // 0-100
        return (
          <Tooltip key={p.id} content={`${p.name} (${value}%)`}>
            <div
              className="absolute -top-4 sm:-top-2 -translate-x-1/2"
              style={{ left: `${value}%` }}
            >
              <Image
                src={p.logo ?? "/parties/placeholder.svg"}
                alt={p.name}
                width={36}
                height={36}
                className={`rounded-full border border-white shadow transition
                  ${closestIds.includes(p.id) ? "ring-2 ring-brand-600" : "opacity-80"}`}
              />
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
}
