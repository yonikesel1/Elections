"use client";

import { useEffect, useState } from "react";
import {
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip as BarTooltip,
} from "recharts";
import { supabase } from "../lib/supabaseClient";

interface Point {
  x: number;
  y: number;
  z: number; // religious score for future heat-map
  intended?: string | null;
}

export default function StatsCharts() {
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    async function fetch() {
      const { data, error } = await supabase
        .from("responses")
        .select("security, socio_economic, religious, intended_vote");
      if (!error && data) {
        setPoints(
          data.map((r) => ({
            x: r.security,
            y: r.socio_economic,
            z: r.religious,
            intended: r.intended_vote,
          })),
        );
      }
    }
    fetch();
  }, []);

  if (points.length === 0) {
    return <p className="mt-12 text-center">אין עדיין נתונים להצגה.</p>;
  }

  const voteCounts = points
    .filter((p) => p.intended)
    .reduce<Record<string, number>>((acc, p) => {
      const key = p.intended as string;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

  const barData = Object.entries(voteCounts).map(([name, count]) => ({
    name,
    count,
  }));

  return (
    <>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="ביטחון" domain={[0, 100]} tickCount={5} />
          <YAxis type="number" dataKey="y" name="חברתי-כלכלי" domain={[0, 100]} tickCount={5} />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter data={points} fill="#0A66C2" shape="circle" opacity={0.75} />
        </ScatterChart>
      </ResponsiveContainer>

      {barData.length > 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Bar dataKey="count" fill="#0A66C2" />
            <BarTooltip />
          </BarChart>
        </ResponsiveContainer>
      )}
    </>
  );
}
