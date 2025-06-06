"use client";
import { Controller, Control } from "react-hook-form";
import Tooltip from "./UI/Tooltip";
import { Info } from "lucide-react";
import PartyScaleIcons from "./PartyScaleIcons";

interface Props {
  name: "security" | "socioEconomic" | "religious";
  label: string;
  control: Control<{
    security: number;
    socioEconomic: number;
    religious: number;
  }>;
  minLabel: string;
  maxLabel: string;
}

const extremes = {
  security: { left: "שמאל", right: "ימין" },
  socioEconomic: { left: "שמאל", right: "ימין" }, // econ spectrum
  religious: { left: "חילוני", right: "דתי" },
} as const;

const explanations = {
  security: "0 = שמאל, גישה פייסנית • 100 = ימין, גישה תקיפה",
  socioEconomic: "0 = מדינת רווחה • 100 = שוק חופשי",
  religious: "0 = חילוני • 100 = דתי מאוד",
} as const;

export default function SliderField({ name, label, control, minLabel, maxLabel }: Props) {
  return (
    <div className="mb-16">
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <Tooltip content={explanations[name]}>
          <Info className="h-4 w-4 cursor-help text-neutral-500" />
        </Tooltip>
      </div>
      <div className="relative px-12">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <div className="relative">
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                {...field}
                className="h-2 w-full appearance-none rounded-lg bg-gray-200"
              />
              <div className="mt-2 flex justify-between text-xs text-gray-500">
                <span>{minLabel}</span>
                <span>{maxLabel}</span>
              </div>
              {/* Party icons along the track */}
              <div className="mt-8">
                <PartyScaleIcons axis={name} />
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}
