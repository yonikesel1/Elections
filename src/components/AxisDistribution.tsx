"use client";
import { ResponsiveBar } from "@nivo/bar";
import { supabase } from "../lib/supabaseClient";
import { useEffect, useState } from "react";

type Axis = "security" | "socioEconomic" | "religious";

export default function AxisDistribution({ axis, youValue }: { axis: Axis; youValue: number }) {
  const [data, setData] = useState<{ value: number; count: number }[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("responses")
        .select(axis)
        .not(axis, "is", null)
        .limit(10000);
      if (!data) return;

      // Create histogram bins
      const bins = Array.from({ length: 10 }, (_, i) => ({
        value: i * 10,
        count: 0,
      }));

      // Count values in each bin
      data.forEach((row) => {
        const value = (row as Record<string, number>)[axis];
        const binIndex = Math.floor(value / 10);
        if (binIndex >= 0 && binIndex < bins.length) {
          bins[binIndex].count++;
        }
      });

      setData(bins);
    })();
  }, [axis]);

  return (
    <div className="space-y-3 rounded-3xl bg-white p-4 shadow">
      <h4 className="text-center text-xl font-semibold">
        התפלגות ערכים על ציר{" "}
        {axis === "security" ? "הביטחון" : axis === "socioEconomic" ? "החברתי-כלכלי" : "הדתי"}
      </h4>

      <div className="h-56">
        <ResponsiveBar
          data={data.map((d) => ({
            range: `${d.value}-${d.value + 9}`,
            count: d.count,
          }))}
          keys={["count"]}
          indexBy="range"
          margin={{ top: 10, right: 20, bottom: 40, left: 40 }}
          padding={0.3}
          colors={{ scheme: "set3" }}
          borderRadius={4}
          enableLabel={false}
          animate
          axisLeft={{
            tickSize: 0,
            tickPadding: 4,
            tickRotation: 0,
          }}
          axisBottom={{
            tickSize: 0,
            tickPadding: 6,
            tickRotation: 0,
          }}
          markers={[
            {
              axis: "x",
              value: Math.floor(youValue / 10) * 10,
              lineStyle: { stroke: "#ef4444", strokeWidth: 2 },
              legend: "הערך שלך",
            },
          ]}
          tooltip={({ indexValue, data }) => (
            <div className="rounded bg-white px-2 py-1 text-sm shadow">
              {indexValue}: {data.count} אנשים
            </div>
          )}
        />
      </div>
    </div>
  );
}
