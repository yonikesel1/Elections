/** Party icons along slider with tool-tips */
"use client";
import Image from "next/image";
import { parties, Party } from "../data/parties";
import MobilePopover from "./UI/MobilePopover";

export type Axis = "security" | "socioEconomic" | "religious";

export default function PartyScaleIcons({ axis, current }: { axis: Axis; current: number }) {
  const field = {
    security: "security",
    socioEconomic: "socioEconomic",
    religious: "religious",
  }[axis] as keyof Party;

  // sort by distance & keep nearest 6, mark nearest 2
  const sorted = [...parties].sort(
    (a, b) => Math.abs((a[field] as number) - current) - Math.abs((b[field] as number) - current),
  );
  const visible = sorted.slice(0, 6);
  const closestIds = visible.slice(0, 2).map((p) => p.id);

  return (
    <div className="relative h-14 mob:h-10 w-full select-none flex items-center">
      {visible.map((p) => {
        const value = p[field] as number; // 0-100
        return (
          <div key={p.id} style={{ left: `${value}%` }} className="absolute -translate-x-1/2">
            <MobilePopover content={`${p.name} (${value})`}>
              <Image
                src={p.logo ?? "/parties/placeholder.svg"}
                alt={p.name}
                width={40}
                height={40}
                className={`rounded-full border border-white shadow transition aspect-square object-cover
                  ${closestIds.includes(p.id) ? "ring-2 ring-brand-600" : "opacity-80"}`}
              />
            </MobilePopover>
          </div>
        );
      })}
    </div>
  );
}
