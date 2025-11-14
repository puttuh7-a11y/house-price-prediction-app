import React from "react";
import { Info, Cpu, Code2, Sparkles, Building2 } from "lucide-react";
import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center justify-center px-6 py-12"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Title */}
      <motion.h1
        className="text-4xl font-bold mb-6 text-center flex items-center gap-3"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Info className="w-10 h-10 text-indigo-400" />
        About This App
      </motion.h1>

      {/* Main Card */}
      <motion.div
        className="bg-gray-800/70 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-xl p-8 w-full max-w-3xl space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {/* Section 1 */}
        <section>
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
            <Building2 className="text-indigo-400" /> House Price Prediction App
          </h2>
          <p className="text-gray-300 leading-relaxed">
            The <span className="text-indigo-400 font-medium">House Price Prediction App</span> 
            is an AI-powered tool designed to estimate real estate prices based on 
            parameters like area, number of bedrooms, bathrooms, and location. 
            It helps buyers, sellers, and investors make smarter decisions with confidence.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
            <Cpu className="text-indigo-400" /> Technology Stack
          </h2>
          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li><b>Frontend:</b> React.js + Vite</li>
            <li><b>Styling:</b> Tailwind CSS</li>
            <li><b>Backend:</b> Supabase (Database & API)</li>
            <li><b>Runtime Environment:</b> Node.js</li>
            <li><b>Hosting:</b> Vercel / Netlify (optional)</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
            <Code2 className="text-indigo-400" /> How It Works
          </h2>
          <ol className="list-decimal pl-6 text-gray-300 space-y-1">
            <li>Enter property details such as area, bedrooms, bathrooms, and location.</li>
            <li>The app sends this data to the trained machine learning model.</li>
            <li>You instantly get a price prediction displayed with smooth UI animations.</li>
          </ol>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
            <Sparkles className="text-indigo-400" /> Developer Information
          </h2>
          <p className="text-gray-300 leading-relaxed">
            <b>Developed by:</b> Puttraj Halli,Manjunath R N,Mallikarjun S R,Karthik K Y <br />
            <b>Purpose:</b> To simplify real estate price estimation using AI and data. <br />
            <b>Future Plans:</b> Adding login, saved history, and Google Maps integration.
          </p>
        </section>
      </motion.div>
    </motion.div>
  );
};

export default AboutPage;
