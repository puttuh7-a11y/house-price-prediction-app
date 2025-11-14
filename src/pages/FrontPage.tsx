// src/pages/FrontPage.tsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, TrendingUp } from "lucide-react";

export default function FrontPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-900 to-slate-800 text-white font-[Poppins]">
      {/* 🌀 Animated gradient orbs */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.25),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(236,72,153,0.25),transparent_40%)]"
      />

      {/* ✨ Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 🏡 Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-8 py-16 max-w-3xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center justify-center"
        >
          <div className="flex items-center gap-3 mb-4">
            <Home className="w-10 h-10 text-indigo-400 drop-shadow-md" />
            <TrendingUp className="w-10 h-10 text-pink-400 drop-shadow-md" />
          </div>

          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-indigo-400 via-sky-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg leading-tight">
            House Price Predictor
          </h1>
          <p className="mt-6 text-lg text-gray-300 leading-relaxed">
            Predict real-estate values with{" "}
            <span className="text-indigo-400 font-semibold">AI precision</span>{" "}
            — built using <span className="text-pink-400 font-semibold">React</span> and{" "}
            <span className="text-indigo-400 font-semibold">Supabase</span>.
          </p>

          {/* 🚀 Button with glow animation */}
          <Link to="/predict">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="relative mt-10 px-10 py-4 rounded-full text-lg font-semibold text-gray-900 bg-gradient-to-r from-yellow-400 via-amber-300 to-orange-400 hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] transition-all overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shine_3s_infinite]" />
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* 🌍 Footer */}
      <footer className="absolute bottom-6 text-gray-400 text-sm z-10">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-yellow-300">House Price Predictor</span>. Built with React & Supabase.
      </footer>

      {/* ✨ Shine animation keyframes */}
      <style>{`
        @keyframes shine {
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
