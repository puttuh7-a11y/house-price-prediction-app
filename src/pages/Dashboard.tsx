import React from "react";
import PredictionChart from "../components/prediction/PredictionChart";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📊 Prediction Dashboard</h1>
        {/* 🔙 Back to Prediction button */}
        <Link
          to="/predict"
          className="px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-md"
        >
          🔙 Back to Prediction
        </Link>
      </div>
      <PredictionChart />
    </div>
  );
}
