// src/pages/MarketPricePage.tsx
import React from "react";
import {
  Home,
  Calculator,
  TrendingUp,
  Info,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function MarketPricePage() {
  const { theme } = useTheme();

  const isDark = theme === "dark";

  return (
    <div
      className={`relative flex flex-col items-center min-h-screen overflow-hidden font-[Poppins] py-12 px-6 transition-colors duration-700 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-indigo-900 to-slate-800 text-white"
          : "bg-gradient-to-br from-blue-50 via-white to-indigo-100 text-gray-900"
      }`}
    >
      {/* ✨ Animated Gradient Glow */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className={`absolute inset-0 ${
          isDark
            ? "bg-[radial-gradient(circle_at_20%_30%,rgba(99,102,241,0.25),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(236,72,153,0.25),transparent_40%)]"
            : "bg-[radial-gradient(circle_at_20%_30%,rgba(147,197,253,0.25),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(251,191,36,0.25),transparent_40%)]"
        }`}
      />

      {/* 🌟 Header */}
      <header className="relative z-10 w-full max-w-6xl flex items-center justify-between mb-12">
        <div className="flex items-center gap-3">
          <Home
            className={`w-8 h-8 ${
              isDark ? "text-indigo-400" : "text-indigo-600"
            }`}
          />
          <h1
            className={`text-3xl font-bold bg-gradient-to-r ${
              isDark
                ? "from-indigo-400 via-sky-400 to-pink-400"
                : "from-indigo-600 via-blue-500 to-pink-500"
            } bg-clip-text text-transparent`}
          >
            Valuato
          </h1>
        </div>
        <nav
          className={`flex gap-6 text-sm font-medium ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          <a href="#" className="hover:text-indigo-400 transition">
            Home
          </a>
          <a href="#" className="hover:text-indigo-400 transition">
            Dashboard
          </a>
          <a href="#" className="hover:text-indigo-400 transition">
            About
          </a>
        </nav>
      </header>

      {/* 🧠 Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center mb-14"
      >
        <h2
          className={`text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r ${
            isDark
              ? "from-indigo-300 via-purple-400 to-pink-400"
              : "from-indigo-600 via-blue-500 to-pink-500"
          } bg-clip-text text-transparent drop-shadow-lg flex justify-center items-center gap-3`}
        >
          <Calculator
            className={`w-8 h-8 ${
              isDark ? "text-indigo-400" : "text-indigo-600"
            }`}
          />
          Get Instant Property Valuations
        </h2>
        <p
          className={`text-lg max-w-2xl mx-auto leading-relaxed ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Use our{" "}
          <span
            className={`font-semibold ${
              isDark ? "text-indigo-400" : "text-indigo-600"
            }`}
          >
            AI-powered
          </span>{" "}
          model to estimate real-estate values with accuracy and confidence.
        </p>
      </motion.div>

      {/* 💰 Predicted Price Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`relative z-10 w-full max-w-4xl rounded-3xl p-8 mb-10 border shadow-2xl transition-all ${
          isDark
            ? "bg-white/10 backdrop-blur-xl border-white/10 text-gray-100"
            : "bg-white border-gray-200 text-gray-900 shadow-lg"
        }`}
      >
        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <TrendingUp
            className={`w-5 h-5 ${
              isDark ? "text-pink-400" : "text-pink-600"
            }`}
          />
          Predicted Price
        </h3>
        <p
          className={`text-5xl font-extrabold mb-3 ${
            isDark ? "text-indigo-300" : "text-indigo-700"
          }`}
        >
          ₹79,72,830
        </p>
        <p>
          Confidence Level:{" "}
          <span
            className={`font-semibold ${
              isDark ? "text-green-400" : "text-green-600"
            }`}
          >
            76%
          </span>
        </p>

        <div className="flex justify-between mt-8">
          <button
            className={`flex items-center px-5 py-2.5 rounded-xl border transition ${
              isDark
                ? "bg-white/10 border-white/20 text-gray-200 hover:bg-white/20"
                : "bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </button>
          <button
            className={`flex items-center px-5 py-2.5 rounded-xl shadow-lg transition ${
              isDark
                ? "bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white"
                : "bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white"
            }`}
          >
            Predict Again <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </motion.div>

      {/* 🏡 Property Details */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className={`relative z-10 w-full max-w-4xl rounded-3xl p-8 mb-10 border transition ${
          isDark
            ? "bg-white/10 backdrop-blur-xl border-white/10 text-gray-200"
            : "bg-white border-gray-200 text-gray-800"
        }`}
      >
        <h3 className="text-xl font-semibold flex items-center mb-4">
          <Info
            className={`w-5 h-5 ${
              isDark ? "text-indigo-400" : "text-indigo-600"
            } mr-2`}
          />{" "}
          Property Details
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            ["Bedrooms", "3"],
            ["Bathrooms", "2"],
            ["Halls", "1"],
            ["Floors", "1"],
            ["Parking", "1"],
            ["Furnishing", "Unfurnished"],
            ["Distance", "5 km"],
            ["Location", "Suburban"],
            ["Condition", "Good"],
            ["Year Built", "2015"],
          ].map(([label, value]) => (
            <p key={label}>
              <span
                className={`font-semibold ${
                  isDark ? "text-indigo-300" : "text-indigo-700"
                }`}
              >
                {label}:
              </span>{" "}
              {value}
            </p>
          ))}
        </div>
      </motion.div>

      {/* 📊 Market Insights */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`relative z-10 w-full max-w-4xl rounded-3xl p-8 border grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-center transition ${
          isDark
            ? "bg-white/10 backdrop-blur-xl border-white/10"
            : "bg-white border-gray-200"
        }`}
      >
        {[
          ["₹15,355/sq ft", "Avg Price per Sq Ft", "indigo"],
          ["+5.2%", "YoY Growth", "green"],
          ["28 days", "Avg Time on Market", "orange"],
          ["76%", "Confidence Level", "pink"],
        ].map(([value, label, color]) => (
          <div
            key={label}
            className={`p-6 rounded-2xl border ${
              isDark
                ? `bg-gradient-to-br from-${color}-600/30 to-${color}-400/10 border-white/10`
                : `bg-gradient-to-br from-${color}-100 to-${color}-50 border-gray-200`
            }`}
          >
            <p
              className={`text-2xl font-bold ${
                isDark ? `text-${color}-300` : `text-${color}-700`
              }`}
            >
              {value}
            </p>
            <p
              className={`text-sm ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {label}
            </p>
          </div>
        ))}
      </motion.div>

      {/* 🌍 Footer */}
      <footer
        className={`relative z-10 mt-12 text-sm text-center ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}
      >
        © {new Date().getFullYear()}{" "}
        <span
          className={`font-semibold ${
            isDark ? "text-indigo-300" : "text-indigo-600"
          }`}
        >
          House Price Predictor
        </span>
        . Built with React & Supabase.
      </footer>
    </div>
  );
}
