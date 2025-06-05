import dynamic from "next/dynamic";

const StatsCharts = dynamic(() => import("../../components/StatsCharts"), {
  ssr: false,
});

export default function StatsPage() {
  return (
    <main className="mx-auto max-w-4xl p-4 space-y-6">
      <h2 className="text-2xl font-semibold text-center">פילוח התשובות</h2>
      <StatsCharts />
    </main>
  );
}
