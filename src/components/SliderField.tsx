"use client";
import { Controller, Control } from "react-hook-form";
import Tooltip from "./UI/Tooltip";
import { Info } from "lucide-react";

interface Props {
  name: "security" | "socioEconomic" | "religious";
  label: string;
  control: Control<{
    security: number;
    socioEconomic: number;
    religious: number;
  }>;
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

export default function SliderField({ name, label, control }: Props) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1 font-medium">
        <label>{label}</label>
        <Tooltip content={explanations[name]}>
          <Info className="h-4 w-4 cursor-help text-neutral-500" />
        </Tooltip>
      </div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="relative">
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={field.value}
              onChange={(e) => field.onChange(Number(e.target.value))}
              className="w-full accent-brand-600"
              dir="ltr" /* keep 0 on the LEFT even in RTL */
            />
            <div className="mt-1 flex justify-between text-sm text-neutral-500" dir="rtl">
              <span>{extremes[name].right}</span>
              <span>{extremes[name].left}</span>
            </div>
          </div>
        )}
      />
    </div>
  );
}
