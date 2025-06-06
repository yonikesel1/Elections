/** Party icons along slider with tool-tips */
"use client";
import Image from "next/image";
import Tooltip from "./UI/Tooltip";
import { parties, Party } from "../data/parties";

export type Axis = "security" | "socioEconomic" | "religious";

export default function PartyScaleIcons({ axis }: { axis: Axis }) {
  // pick numeric field by axis
  const field = {
    security: "security",
    socioEconomic: "socioEconomic",
    religious: "religious",
  }[axis] as keyof Party;

  // Sort parties by their position on this axis to handle overlapping
  const sortedParties = [...parties].sort((a, b) => (a[field] as number) - (b[field] as number));

  // Initialize positions array with original values
  const positions = sortedParties.map((p) => p[field] as number);

  // For religious axis, we need more space between clusters
  const minSpacing = axis === "religious" ? 5 : 8;

  // Adjust positions to prevent overlapping
  for (let i = 1; i < positions.length; i++) {
    const prevValue = positions[i - 1];
    const currentValue = positions[i];

    if (currentValue - prevValue < minSpacing) {
      // Shift current and all subsequent positions
      const shift = minSpacing - (currentValue - prevValue);
      for (let j = i; j < positions.length; j++) {
        positions[j] += shift;
      }
    }
  }

  // Scale positions to fit within 0-100 range if needed
  const maxPosition = Math.max(...positions);
  if (maxPosition > 100) {
    const scale = 100 / maxPosition;
    for (let i = 0; i < positions.length; i++) {
      positions[i] *= scale;
    }
  }

  return (
    <div className="relative h-16 w-full select-none" dir="ltr">
      {sortedParties.map((p: Party, index) => {
        const originalValue = p[field] as number;
        const adjustedValue = positions[index];
        return (
          <Tooltip key={p.id} content={`${p.name} (${originalValue}%)`}>
            <div
              className="absolute -top-6 -translate-x-1/2"
              style={{
                left: `${adjustedValue}%`,
                zIndex: index, // Later parties appear on top
              }}
            >
              <div className="w-9 h-9">
                {" "}
                {/* Fixed size container */}
                <Image
                  src={p.logo ?? "/parties/placeholder.svg"}
                  alt={p.name}
                  width={36}
                  height={36}
                  className="rounded-full border-2 border-white shadow-lg w-full h-full object-contain"
                  priority // Ensure images load immediately
                />
              </div>
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
}
