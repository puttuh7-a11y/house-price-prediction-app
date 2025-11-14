// src/components/prediction/PredictionChart.tsx
import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type Row = { location: string; price: number; created_at?: string };

export default function PredictionChart() {
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      setLoading(true);
      setErr(null);
      const { data, error } = await supabase
        .from("predictions")
        .select("location, price, created_at")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching predictions:", error);
        setErr(error.message || "Unable to load data");
      } else {
        setData(data ?? []);
      }
      setLoading(false);
    };

    fetchPredictions();
  }, []);

  if (loading) {
    return <div className="text-sm opacity-75">Loading chart…</div>;
  }

  if (err) {
    return (
      <div className="text-sm text-red-400 bg-red-900/20 border border-red-700/40 rounded-lg p-3">
        Couldn’t load data: {err}
        <div className="mt-1 opacity-75">
          Tip: Ensure the <code>predictions</code> table exists and RLS allows
          <code> SELECT </code> for anon.
        </div>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="text-sm opacity-75">
        No data yet. Run a prediction or insert one test row in Supabase →
        <code>predictions</code>.
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-xl text-white">
      <h2 className="text-xl font-semibold mb-4">Price Trend by Location</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="location" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#06b6d4" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
