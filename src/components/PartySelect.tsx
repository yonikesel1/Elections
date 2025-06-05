"use client";
import { parties } from "../data/parties";

interface Props {
  value: string | "";
  onChange: (v: string) => void;
}

export default function PartySelect({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border p-2"
    >
      <option value="">בחר/י מפלגה</option>
      {parties.map((p) => (
        <option key={p.id} value={p.id}>
          {p.name}
        </option>
      ))}
      <option value="undecided">לא החלטתי</option>
    </select>
  );
}
