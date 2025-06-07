"use client";
import { Controller, Control } from "react-hook-form";
import { useWatch } from "react-hook-form";
import PartyScaleIcons from "./PartyScaleIcons";

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
  security: { left: "ימין", right: "שמאל" },
  socioEconomic: { left: "ימין", right: "שמאל" },
  religious: { left: "חילוני", right: "דתי" },
} as const;

const explanations = {
  security: "0 = שמאל, גישה פייסנית • 100 = ימין, גישה תקיפה",
  socioEconomic: "0 = מדינת רווחה • 100 = שוק חופשי",
  religious: "0 = חילוני • 100 = דתי מאוד",
} as const;

export default function SliderField({ name, label, control }: Props) {
  const currentValue = useWatch({ control, name, defaultValue: 50 });
  return (
    <div className="space-y-3">
      <label className="font-medium">{label}</label>

      {/* Current value display */}
      <div className="text-center text-sm font-medium text-brand-600">{currentValue}</div>

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
            onChange={(e) => field.onChange(Number(e.target.value))}
            className="w-full accent-brand-600 mob:h-2"
            dir="ltr" /* keep 0 on the LEFT even in RTL */
          />
        )}
      />

      {/* extreme labels */}
      <div className="flex justify-between text-xs text-neutral-500">
        <span>{extremes[name].left}</span>
        <span>{extremes[name].right}</span>
      </div>

      {/* party icons along the track */}
      <PartyScaleIcons axis={name} current={currentValue} />

      {/* always-visible explanation */}
      <p className="text-center text-xs text-neutral-500">{explanations[name]}</p>
    </div>
  );
}
