// src/App.tsx
import React, { useState } from "react";
import { Ruler, Building2, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import FrontPage from "./pages/FrontPage";
import MarketPricePage from "./pages/MarketPricePage";
import AboutPage from "./pages/AboutPage";

import Header from "./components/layout/Header";
import PredictionForm from "./components/prediction/PredictionForm";
import PredictionResultComponent from "./components/prediction/PredictionResult";
import PredictionHistory from "./components/prediction/PredictionHistory";
import Dashboard from "./pages/Dashboard";

import Navbar from "./components/Navbar"; // ✅ no .tsx here

import { useTheme } from "./context/ThemeContext";
import { useSupabase } from "./hooks/useSupabase";
import { calculateHousePrice } from "./utils/priceCalculator";
import { formatCurrency } from "./utils/formatters";

import type {
  HouseFeatures,
  PredictionResult as PredictionResultType,
} from "./types";

const App = () => {
  const [currentPrediction, setCurrentPrediction] =
    useState<PredictionResultType | null>(null);
  const [predicting, setPredicting] = useState(false);

  // ✅ Supabase hook for CRUD operations
  const { predictions, savePrediction, deletePrediction } = useSupabase();

  const { theme } = useTheme();

  // ✅ Handle Prediction Logic
  const handlePredict = async (features: HouseFeatures) => {
    setPredicting(true);
    try {
      const { price, confidence, breakdown } = calculateHousePrice(features);
      const normalizedConfidence =
        confidence > 1 && confidence <= 100
          ? confidence
          : confidence <= 1
          ? confidence * 100
          : 95;

      const prediction: PredictionResultType = {
        id: `pred-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        features,
        predictedPrice: price,
        confidence: normalizedConfidence,
        breakdown,
        createdAt: new Date().toISOString(),
      };

      setCurrentPrediction(prediction);
      await savePrediction(prediction);
    } catch (err) {
      console.error("Prediction error:", err);
    } finally {
      setPredicting(false);
    }
  };

  // ✅ Select Previous Prediction
  const handleSelectPrediction = (prediction: PredictionResultType) =>
    setCurrentPrediction(prediction);

  // ✅ Delete Prediction
  const handleDeletePrediction = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this prediction?"
    );
    if (confirmDelete) await deletePrediction(id);
  };

  // Constants
  const USD_TO_INR = 83;
  const avgPricePerSqFtUSD = 185;
  const avgPricePerSqFtINR = avgPricePerSqFtUSD * USD_TO_INR;

  const isDark = theme === "dark";

  return (
    <Router>
      <>
        <Navbar />

        <div className="pt-20">
          <Routes>
            {/* Front Page */}
            <Route path="/" element={<FrontPage />} />

            {/* Prediction Page */}
            <Route
              path="/predict"
              element={
                <div
                  className={`min-h-screen relative overflow-hidden font-[Poppins] transition-colors duration-700 ${
                    isDark
                      ? "bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-gray-100"
                      : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 text-gray-900"
                  }`}
                >
                  {/* ✨ Animated Background Gradient */}
                  <motion.div
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className={`absolute inset-0 ${
                      isDark
                        ? "bg-[radial-gradient(circle_at_20%_30%,rgba(99,102,241,0.25),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(236,72,153,0.25),transparent_40%)]"
                        : "bg-[radial-gradient(circle_at_20%_30%,rgba(147,197,253,0.3),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(251,191,36,0.25),transparent_40%)]"
                    }`}
                  />

                  {/* 🌟 Floating Glass Header */}
                  <div className="relative z-10 backdrop-blur-lg bg-white/10 dark:bg-gray-800/30 shadow-lg border-b border-white/10 sticky top-0">
                    <Header />
                  </div>

                  {/* Main Section */}
                  <main className="max-w-7xl mx-auto px-6 py-14 relative z-10">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7 }}
                      className="text-center mb-16"
                    >
                      <h1
                        className={`text-5xl font-extrabold mb-4 bg-gradient-to-r ${
                          isDark
                            ? "from-indigo-400 via-purple-400 to-pink-400"
                            : "from-indigo-600 via-purple-500 to-pink-500"
                        } bg-clip-text text-transparent drop-shadow-lg`}
                      >
                        🏡 Get Instant Property Valuations
                      </h1>
                      <p
                        className={`text-lg max-w-2xl mx-auto leading-relaxed ${
                          isDark ? "text-gray-400" : "text-gray-700"
                        }`}
                      >
                        Use our{" "}
                        <span
                          className={`font-semibold ${
                            isDark ? "text-indigo-300" : "text-indigo-600"
                          }`}
                        >
                          AI-powered
                        </span>{" "}
                        model to estimate real-estate values with accuracy and
                        confidence.
                      </p>
                    </motion.div>

                    {/* Form + Result + History */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                      <div className="xl:col-span-2 space-y-10">
                        <PredictionForm
                          onPredict={handlePredict}
                          loading={predicting}
                        />

                        {currentPrediction && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                          >
                            <PredictionResultComponent result={currentPrediction} />
                          </motion.div>
                        )}
                      </div>

                      {/* History */}
                      <div className="xl:col-span-1">
                        <PredictionHistory
                          predictions={predictions}
                          onSelect={handleSelectPrediction}
                          onDelete={handleDeletePrediction}
                        />
                      </div>
                    </div>

                    {/* Market Insights */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className={`mt-20 rounded-3xl p-10 border backdrop-blur-xl shadow-xl ${
                        isDark
                          ? "bg-white/10 border-white/10 text-gray-100"
                          : "bg-white/80 border-gray-200 text-gray-900"
                      }`}
                    >
                      <h2
                        className={`text-3xl font-bold mb-8 text-center bg-gradient-to-r ${
                          isDark
                            ? "from-indigo-400 to-pink-400"
                            : "from-indigo-600 to-pink-500"
                        } bg-clip-text text-transparent`}
                      >
                        📈 Market Insights
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Price Card */}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className={`text-center p-8 rounded-2xl transition-transform ${
                            isDark
                              ? "bg-gradient-to-br from-indigo-900/50 to-blue-800/50 border border-white/10"
                              : "bg-gradient-to-br from-blue-100 to-indigo-200 border border-gray-200"
                          }`}
                        >
                          <Building2 className="mx-auto text-blue-500 dark:text-blue-300 h-10 w-10 mb-3" />
                          <div className="text-3xl font-bold mb-2">
                            {formatCurrency(avgPricePerSqFtINR)} /sq ft
                          </div>
                          <div className="text-sm text-gray-300 dark:text-gray-400">
                            🏗 Average Price Per Sq Ft
                          </div>
                        </motion.div>

                        {/* Growth Card */}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className={`text-center p-8 rounded-2xl transition-transform ${
                            isDark
                              ? "bg-gradient-to-br from-green-900/50 to-emerald-800/40 border border-white/10"
                              : "bg-gradient-to-br from-green-100 to-emerald-200 border border-gray-200"
                          }`}
                        >
                          <TrendingUp className="mx-auto text-green-500 dark:text-green-300 h-10 w-10 mb-3" />
                          <div className="text-3xl font-bold mb-2">+5.2%</div>
                          <div className="text-sm text-gray-300 dark:text-gray-400">
                            📅 YoY Price Growth
                          </div>
                        </motion.div>

                        {/* Market Time Card */}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className={`text-center p-8 rounded-2xl transition-transform ${
                            isDark
                              ? "bg-gradient-to-br from-orange-900/50 to-amber-800/40 border border-white/10"
                              : "bg-gradient-to-br from-orange-100 to-amber-200 border border-gray-200"
                          }`}
                        >
                          <Ruler className="mx-auto text-orange-500 dark:text-orange-300 h-10 w-10 mb-3" />
                          <div className="text-3xl font-bold mb-2">28 days</div>
                          <div className="text-sm text-gray-300 dark:text-gray-400">
                            🕒 Average Time on Market
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </main>

                  {/* Footer */}
                  <footer
                    className={`mt-16 py-6 text-center text-sm tracking-wide shadow-inner ${
                      isDark
                        ? "bg-gradient-to-r from-indigo-900 to-purple-900 text-gray-300"
                        : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                    }`}
                  >
                    © {new Date().getFullYear()}{" "}
                    <span className="font-semibold text-yellow-300">
                      🏡 Valuato
                    </span>{" "}
                    — All rights reserved.
                  </footer>
                </div>
              }
            />

            {/* Other Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/market" element={<MarketPricePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>
      </>
    </Router>
  );
};

export default App;
