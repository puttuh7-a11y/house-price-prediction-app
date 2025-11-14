import React from "react";
import type { PredictionResult } from "../../types";
import { TrendingUp, CheckCircle, Sparkles, Star } from "lucide-react";

interface Props {
  result: PredictionResult;
}

const PredictionResultComponent: React.FC<Props> = ({ result }) => {
  const { features, predictedPrice, confidence } = result;

  // Filter for table (exclude false and empty)
  const filteredFeatures = Object.entries(features).filter(
    ([, value]) => value !== false && value !== null && value !== ""
  );

  // Extract amenities (true boolean features)
  const trueFeatures = Object.entries(features).filter(([key, value]) => value === true);

  // Confidence color (visual indicator)
  const getConfidenceColor = (value: number) => {
    const normalizedValue = value > 1 ? value / 100 : value; // normalize 9500 → 95 or 0.95
    if (normalizedValue >= 0.8) return "text-green-400";
    if (normalizedValue >= 0.5) return "text-yellow-400";
    return "text-darkgreen-400";
  };

  // Normalize confidence (handles 9500 or 0.95)
  const normalizedConfidence = confidence > 1 ? confidence / 100 : confidence;

  return (
    <div className="bg-neutral-900/90 rounded-2xl p-6 shadow-xl border border-green-800/40 text-gray-100 backdrop-blur-md">
      {/* Header */}
      <h3 className="text-2xl font-semibold mb-6 text-green-400 flex items-center gap-2">
        <Sparkles className="text-green-500" size={22} />
        Property Details
      </h3>

      {/* Property Details Table */}
      <div className="overflow-x-auto rounded-lg border border-green-800/30">
        <table className="w-full border-collapse">
          <tbody>
            {filteredFeatures.map(([key, value], index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-neutral-800/70" : "bg-neutral-900/60"
                } border-b border-green-900/40`}
              >
                <td className="capitalize px-4 py-3 font-medium text-green-300 w-1/3">
                  {key.replace(/([A-Z])/g, " $1")}
                </td>
                <td className="px-4 py-3 text-gray-200">{String(value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Predicted Price Card */}
      <div className="mt-8 text-center">
        <div className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300">
          <h3 className="text-2xl font-semibold flex items-center justify-center gap-2">
            <TrendingUp size={22} />
            Predicted Price: ₹{predictedPrice.toLocaleString("en-IN")}
          </h3>
          <p className={`mt-2 text-sm ${getConfidenceColor(confidence)}`}>
            Confidence Level:{" "}
            <strong>{(normalizedConfidence * 100).toFixed(1)}%</strong>
          </p>
        </div>
      </div>

      {/* Positive Features Section */}
      {trueFeatures.length > 0 && (
        <div className="mt-10">
          <h4 className="font-semibold text-lg text-green-400 flex items-center gap-2">
            <CheckCircle className="text-green-500" />
            Additional Amenities
          </h4>

          {/* Amenities Table (3 columns) */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {trueFeatures.map(([key]) => (
              <div
                key={key}
                className="flex items-center gap-2 bg-green-900/30 border border-green-800/50 px-4 py-2 rounded-lg text-green-200 shadow-sm hover:bg-green-800/40 transition"
              >
                <Star size={16} className="text-green-400" />
                {key
                  .replace(/^has|near/, "")
                  .replace(/([A-Z])/g, " $1")
                  .trim()}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionResultComponent;
