import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

export default function AmenitiesPage() {
  const navigate = useNavigate();
  const [amenities, setAmenities] = useState({
    parking: false,
    furnished: false,
    balcony: false,
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    const basicInfo = JSON.parse(localStorage.getItem("basicInfo") || "{}");
    const allData = { ...basicInfo, ...amenities };
    localStorage.setItem("houseData", JSON.stringify(allData));
    navigate("/result");
  };

  return (
    <form
      onSubmit={handleNext}
      className="max-w-lg mx-auto mt-16 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center mb-4">Amenities</h2>

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={amenities.parking}
          onChange={(e) => setAmenities({ ...amenities, parking: e.target.checked })}
        />
        <span>Parking</span>
      </label>

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={amenities.furnished}
          onChange={(e) => setAmenities({ ...amenities, furnished: e.target.checked })}
        />
        <span>Furnished</span>
      </label>

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={amenities.balcony}
          onChange={(e) => setAmenities({ ...amenities, balcony: e.target.checked })}
        />
        <span>Balcony</span>
      </label>

      <div className="text-center">
        <Button type="submit" className="px-6 py-2">Next</Button>
      </div>
    </form>
  );
}
