import { useEffect, useState } from "react";
import { useSupabaseClient } from "../context/SupabaseContext";

export const useSupabase = () => {
  const { supabase } = useSupabaseClient();
  const [predictions, setPredictions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch saved predictions
  const fetchPredictions = async () => {
    if (!supabase) {
      console.error("❌ Supabase client not initialized");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("predictions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ Error fetching predictions:", error);
    } else {
      const normalized = (data || []).map((p) => ({
        id: p.id,
        predictedPrice: p.price || 0,
        createdAt: p.created_at,
        confidence: p.confidence ?? 95,
        features: {
          area: p.area,
          bedrooms: p.bedrooms,
          bathrooms: p.bathrooms,
          location: p.location,
        },
      }));
      setPredictions(normalized);
    }

    setLoading(false);
  };

  // ✅ Save a new prediction
  const savePrediction = async (prediction: any) => {
    if (!supabase) {
      console.error("❌ Supabase client not initialized");
      return;
    }

    const { features, predictedPrice, confidence } = prediction;

    const { error } = await supabase.from("predictions").insert([
      {
        area: features.area,
        bedrooms: features.bedrooms,
        bathrooms: features.bathrooms,
        location: features.location,
        price: predictedPrice,
        confidence: confidence ?? 95,
      },
    ]);

    if (error) {
      console.error("❌ Error saving prediction:", error);
    } else {
      console.log("✅ Prediction saved successfully");
      await fetchPredictions();
    }
  };

  // ✅ NEW: Delete a saved prediction
  const deletePrediction = async (id: string) => {
    if (!supabase) {
      console.error("❌ Supabase client not initialized");
      return;
    }

    const { error } = await supabase
      .from("predictions")
      .delete()
      .eq("id", id); // delete where id matches

    if (error) {
      console.error("❌ Error deleting prediction:", error);
    } else {
      console.log(`🗑 Deleted prediction ID: ${id}`);
      setPredictions((prev) => prev.filter((p) => p.id !== id)); // instantly update UI
    }
  };

  useEffect(() => {
    fetchPredictions();
  }, []);

  return { predictions, loading, savePrediction, deletePrediction };
};
