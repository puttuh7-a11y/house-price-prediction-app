// src/components/prediction/PredictionForm.tsx
import React, { useState, useEffect } from "react";
import {
  Calculator,
  MapPin,
  Home as HomeIcon,
  Calendar,
  Ruler,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HouseFeatures } from "../../types";
import "../../index.css";

interface PredictionFormProps {
  onPredict: (features: HouseFeatures) => void;
  loading: boolean;
}

export default function PredictionForm({ onPredict, loading }: PredictionFormProps) {
  const currentYear = new Date().getFullYear();

  const [features, setFeatures] = useState<HouseFeatures>({
    bedrooms: 3,
    bathrooms: 2,
    hall: 1,
    floors: 1,
    parkingSpaces: 1,
    furnishing: "unfurnished",
    cityCenterDistance: 5,
    propertyType: "house",
    location: "suburban",
    squareFootage: 1500,
    lotSize: 0.25,
    hasGarage: true,
    hasPool: false,
    hasFireplace: false,
    nearhospital: false,
    hasGarden: false,
    hasBalcony: false,
    hasSolar: false,
    hasSecurity: false,
    condition: "good",
    yearBuilt: currentYear - 10,
  });

  const [page, setPage] = useState<number>(1);
  const [showResult, setShowResult] = useState<boolean>(false);

  const updateFeature = <K extends keyof HouseFeatures>(
    key: K,
    value: HouseFeatures[K]
  ) => {
    setFeatures((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setShowResult(true);
    onPredict(features);
  };

  const goNext = () => setPage((p) => Math.min(3, p + 1));
  const goBack = () => setPage((p) => Math.max(1, p - 1));

  // Auto square footage update
  useEffect(() => {
    const { bedrooms, bathrooms, floors } = features;
    if (bedrooms || bathrooms || floors) {
      const calculatedSqFt = bedrooms * 300 + bathrooms * 100 + floors * 500;
      setFeatures((prev) => ({
        ...prev,
        squareFootage: calculatedSqFt,
      }));
    }
  }, [features.bedrooms, features.bathrooms, features.floors]);

  // Auto lot size
  useEffect(() => {
    let newLotSize = 0.25;
    if (features.squareFootage < 1000) newLotSize = 0.08;
    else if (features.squareFootage < 2000) newLotSize = 0.18;
    else if (features.squareFootage < 4000) newLotSize = 0.35;
    else if (features.squareFootage < 6000) newLotSize = 0.6;
    else newLotSize = 0.9;

    const rounded = Number(newLotSize.toFixed(2));
    if (features.lotSize !== rounded)
      setFeatures((prev) => ({ ...prev, lotSize: rounded }));
  }, [features.squareFootage]);

  // NEW: Auto update condition based on yearBuilt
  useEffect(() => {
    const age = currentYear - features.yearBuilt;
    let newCondition: HouseFeatures["condition"];

    if (age < 5) {
      newCondition = "new";
    } else if (age < 20) {
      newCondition = "good";
    } else {
      newCondition = "needs renovation";
    }

    // Only update if it's different (prevents infinite loop)
    if (features.condition !== newCondition) {
      setFeatures((prev) => ({ ...prev, condition: newCondition }));
    }
  }, [features.yearBuilt, currentYear]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Calculator className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Property Details</h2>
            <p className="text-sm text-gray-600">
              Step {page} of 3 —{" "}
              {page === 1
                ? "Basic Info"
                : page === 2
                ? "Size & Amenities"
                : "Market & Price"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              className={`px-3 py-1 rounded ${
                page === n
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-200 text-gray-700"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <AnimatePresence mode="wait">
          {/* PAGE 1 — Basic Info */}
          {page === 1 && (
            <motion.div
              key="page1"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center space-x-2 mb-3">
                <HomeIcon className="h-5 w-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Basic Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
                      Property Type
                    </label>
                    <select
                      id="propertyType"
                      name="propertyType"
                      value={features.propertyType}
                      onChange={(e) =>
                        updateFeature("propertyType", e.target.value as HouseFeatures["propertyType"])
                      }
                      className="w-full p-2 border rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="house">House</option>
                      <option value="condo">Condo</option>
                      <option value="townhouse">Townhouse</option>
                      <option value="apartment">Apartment</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-2">
                      Bedrooms
                    </label>
                    <input
                      id="bedrooms"
                      name="bedrooms"
                      type="number"
                      value={features.bedrooms}
                      onChange={(e) => updateFeature("bedrooms", Number(e.target.value) || 0)}
                      min={1}
                      max={10}
                      className="w-full p-2 border rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-2">
                      Bathrooms
                    </label>
                    <input
                      id="bathrooms"
                      name="bathrooms"
                      type="number"
                      value={features.bathrooms}
                      onChange={(e) => updateFeature("bathrooms", Number(e.target.value) || 0)}
                      min={1}
                      max={10}
                      className="w-full p-2 border rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label htmlFor="hall" className="block text-sm font-medium text-gray-700 mb-2">
                      Halls
                    </label>
                    <input
                      id="hall"
                      name="hall"
                      type="number"
                      value={features.hall}
                      onChange={(e) => updateFeature("hall", Number(e.target.value) || 0)}
                      min={1}
                      max={5}
                      className="w-full p-2 border rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                {/* Right */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="floors" className="block text-sm font-medium text-gray-700 mb-2">
                      Floors
                    </label>
                    <input
                      id="floors"
                      name="floors"
                      type="number"
                      value={features.floors}
                      onChange={(e) => updateFeature("floors", Number(e.target.value) || 0)}
                      min={1}
                      max={10}
                      className="w-full p-2 border rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label htmlFor="parkingSpaces" className="block text-sm font-medium text-gray-700 mb-2">
                      Parking Spaces
                    </label>
                    <input
                      id="parkingSpaces"
                      name="parkingSpaces"
                      type="number"
                      value={features.parkingSpaces}
                      onChange={(e) => updateFeature("parkingSpaces", Number(e.target.value) || 0)}
                      min={0}
                      max={5}
                      className="w-full p-2 border rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label htmlFor="furnishing" className="block text-sm font-medium text-gray-700 mb-2">
                      Furnishing
                    </label>
                    <select
                      id="furnishing"
                      name="furnishing"
                      value={features.furnishing}
                      onChange={(e) =>
                        updateFeature("furnishing", e.target.value as HouseFeatures["furnishing"])
                      }
                      className="w-full p-2 border rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="unfurnished">Unfurnished</option>
                      <option value="semi-furnished">Semi-Furnished</option>
                      <option value="fully-furnished">Fully-Furnished</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="cityCenterDistance" className="block text-sm font-medium text-gray-700 mb-2">
                      Distance from City Center (km)
                    </label>
                    <input
                      id="cityCenterDistance"
                      name="cityCenterDistance"
                      type="number"
                      value={features.cityCenterDistance}
                      onChange={(e) =>
                        updateFeature("cityCenterDistance", Number(e.target.value) || 0)
                      }
                      min={0}
                      max={100}
                      className="w-full p-2 border rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={goNext}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}

          {/* PAGE 2 — Size & Amenities */}
          {page === 2 && (
            <motion.div
              key="page2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center space-x-2 mb-3">
                <Ruler className="h-5 w-5 text-gray-500" />
                <h3 className="font-semibold text-gray-900">Size & Location</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="squareFootage" className="block text-sm font-medium text-gray-700 mb-2">
                    Square Footage
                  </label>
                  <input
                    id="squareFootage"
                    name="squareFootage"
                    type="number"
                    value={features.squareFootage}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
                  />
                </div>

                <div>
                  <label htmlFor="lotSize" className="block text-sm font-medium text-gray-700 mb-2">
                    Lot Size (acres)
                  </label>
                  <input
                    id="lotSize"
                    name="lotSize"
                    type="number"
                    value={features.lotSize}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-800"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    Location Type
                  </label>
                  <select
                    id="location"
                    name="location"
                    value={features.location}
                    onChange={(e) =>
                      updateFeature("location", e.target.value as HouseFeatures["location"])
                    }
                    className="w-full p-2 border rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="downtown">Downtown</option>
                    <option value="suburban">Suburban</option>
                    <option value="urban">Urban</option>
                    <option value="rural">Rural</option>
                    <option value="waterfront">Waterfront</option>
                    <option value="mountain">Mountain</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-6 mb-3">
                <Calendar className="h-5 w-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Additional Amenities</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { key: "hasGarage", label: "Garage" },
                  { key: "hasPool", label: "Pool" },
                  { key: "hasFireplace", label: "Fireplace" },
                  { key: "nearhospital", label: "Near Hospital" },
                  { key: "hasGarden", label: "Garden" },
                  { key: "hasBalcony", label: "Balcony" },
                  { key: "hasSolar", label: "Solar Panels" },
                  { key: "hasSecurity", label: "Security" },
                ].map((amenity) => (
                  <label
                    key={amenity.key}
                    htmlFor={amenity.key}
                    className="flex items-center space-x-3 p-3 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition"
                  >
                    <input
                      id={amenity.key}
                      name={amenity.key}
                      type="checkbox"
                      checked={features[amenity.key as keyof HouseFeatures] as boolean}
                      onChange={(e) =>
                        updateFeature(amenity.key as keyof HouseFeatures, e.target.checked)
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {amenity.label}
                    </span>
                    <Info className="h-4 w-4 text-gray-400 ml-auto" />
                  </label>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <label htmlFor="yearBuilt" className="block text-sm font-medium text-gray-700 mb-2">
                    Year Built
                  </label>
                  <input
                    id="yearBuilt"
                    name="yearBuilt"
                    type="number"
                    value={features.yearBuilt}
                    onChange={(e) =>
                      updateFeature("yearBuilt", Number(e.target.value) || currentYear)
                    }
                    min={1800}
                    max={currentYear}
                    className="w-full p-2 border rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-2">
                    Condition
                  </label>
                  <select
                    id="condition"
                    name="condition"
                    value={features.condition}
                    onChange={(e) =>
                      updateFeature("condition", e.target.value as HouseFeatures["condition"])
                    }
                    className="w-full p-2 border rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="new">New</option>
                    <option value="good">Good</option>
                    <option value="needs renovation">Needs Renovation</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6">
                <button
                  type="button"
                  onClick={goBack}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-gray-300 transition"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}

          {/* PAGE 3 — Prediction */}
          {page === 3 && (
            <motion.div
              key="page3"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
            >
              <div className="mt-6 text-center">
                <div className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-5 rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-semibold">Predicted Price</h3>
                  {!showResult ? (
                    <p className="mt-2 text-sm text-white/90">
                      (Click <strong>Predict Price</strong> to view result)
                    </p>
                  ) : (
                    <p className="mt-2 text-xl font-bold">Result loaded</p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mt-6">
                <button
                  type="button"
                  onClick={goBack}
                  className="border border-gray-500 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition disabled:opacity-60"
                >
                  {loading ? "Predicting..." : "Predict Price"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
}