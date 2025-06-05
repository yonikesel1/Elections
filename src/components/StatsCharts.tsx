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
} from "recharts";
import { supabase } from "../lib/supabaseClient";

interface Point {
  x: number;
  y: number;
  z: number; // religious score for future heat-map
}

export default function StatsCharts() {
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    async function fetch() {
      const { data, error } = await supabase
        .from("responses")
        .select("security, socio_economic, religious");
      if (!error && data) {
        setPoints(
          data.map((r) => ({
            x: r.security,
            y: r.socio_economic,
            z: r.religious,
          })),
        );
      }
    }
    fetch();
  }, []);

  if (points.length === 0) {
    return <p className="mt-12 text-center">אין עדיין נתונים להצגה.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name="ביטחון" domain={[0, 100]} tickCount={5} />
        <YAxis type="number" dataKey="y" name="חברתי-כלכלי" domain={[0, 100]} tickCount={5} />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter data={points} fill="#0A66C2" shape="circle" opacity={0.75} />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
