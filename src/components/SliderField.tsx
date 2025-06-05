"use client";
import { Controller, Control } from "react-hook-form";

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

export default function SliderField({ name, label, control }: Props) {
  return (
    <div className="space-y-2">
      <label className="block font-medium">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={field.value}
            /* convert value to number so validation passes */
            onChange={(e) => field.onChange(Number(e.target.value))}
            className="w-full accent-brand-600"
            dir="ltr" /* keep 0 on the LEFT even in RTL */
          />
        )}
      />
      <div className="flex justify-between text-xs text-neutral-500" dir="rtl">
        <span>{extremes[name].right}</span>
        <span>{extremes[name].left}</span>
      </div>
    </div>
  );
}
