import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

export default function PredictionPage() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    area: "",
    bedrooms: "",
    bathrooms: "",
    location: "",
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("basicInfo", JSON.stringify(data)); // Save temporarily
    navigate("/amenities");
  };

  return (
    <form
      onSubmit={handleNext}
      className="max-w-lg mx-auto mt-16 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center mb-4">Basic Information</h2>

      <input
        type="number"
        placeholder="Area (in sqft)"
        value={data.area}
        onChange={(e) => setData({ ...data, area: e.target.value })}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="number"
        placeholder="Bedrooms"
        value={data.bedrooms}
        onChange={(e) => setData({ ...data, bedrooms: e.target.value })}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="number"
        placeholder="Bathrooms"
        value={data.bathrooms}
        onChange={(e) => setData({ ...data, bathrooms: e.target.value })}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        placeholder="City / Location"
        value={data.location}
        onChange={(e) => setData({ ...data, location: e.target.value })}
        className="w-full border p-2 rounded"
        required
      />

      <div className="text-center">
        <Button type="submit" className="px-6 py-2">Next</Button>
      </div>
    </form>
  );
}
