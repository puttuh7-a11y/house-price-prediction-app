import React, { useEffect, useState } from "react";
import Button from "../components/ui/Button";

export default function ResultPage() {
  const [result, setResult] = useState<number | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("houseData");
    if (stored) {
      const parsed = JSON.parse(stored);
      setData(parsed);
      // Here you can call your backend or Supabase function:
      const price = Math.round((+parsed.area * 1200) + (parsed.bedrooms * 50000)); // simple sample
      setResult(price);
    }
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-16 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center">
      <h2 className="text-2xl font-semibold mb-4">Predicted Price</h2>
      {result ? (
        <p className="text-3xl font-bold text-green-600">
          ₹ {result.toLocaleString("en-IN")}
        </p>
      ) : (
        <p>Calculating...</p>
      )}
      <Button onClick={() => window.location.href = "/"} className="mt-6">
        Back to Home
      </Button>
    </div>
  );
}
