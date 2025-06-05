import { matchParty } from "@/lib/matchParty";
import { parties } from "@/data/parties";
import { notFound } from "next/navigation";

function parseParam(p?: string): number | null {
  const n = Number(p);
  return Number.isFinite(n) ? Math.min(Math.max(n, 0), 100) : null;
}

export default function ResultPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const security = parseParam(searchParams.s as string);
  const socioEconomic = parseParam(searchParams.e as string);
  const religious = parseParam(searchParams.r as string);

  if (security === null || socioEconomic === null || religious === null) return notFound();

  const party = matchParty({ security, socioEconomic, religious });

  const others = parties
    .filter((p) => p.id !== party.id)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="mx-auto max-w-md space-y-6 p-4">
      <h2 className="text-2xl font-semibold text-center">התוצאה שלך</h2>

      <div className="rounded-2xl bg-neutral-100 p-4 shadow">
        <p className="text-center text-xl font-bold text-brand-600">{party.name}</p>
      </div>

      <details className="rounded bg-neutral-100 p-4">
        <summary className="cursor-pointer select-none">פירוט מלא של הדירוג</summary>
        <ul className="mt-2 list-disc px-4 space-y-1">
          {others.map((p) => (
            <li key={p.id}>{p.name}</li>
          ))}
        </ul>
      </details>

      <button
        onClick={() =>
          navigator.share?.({ url: window.location.href }) ??
          navigator.clipboard.writeText(window.location.href)
        }
        className="w-full rounded-lg bg-brand-600 py-3 text-white hover:opacity-90 transition"
      >
        שתף/י את התוצאה
      </button>
    </div>
  );
}
