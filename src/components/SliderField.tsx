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
            {...field}
            className="w-full accent-brand-600"
          />
        )}
      />
      <div className="flex justify-between text-xs text-neutral-500">
        <span>0</span>
        <span>25</span>
        <span>50</span>
        <span>75</span>
        <span>100</span>
      </div>
    </div>
  );
}
