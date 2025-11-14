// src/context/SupabaseContext.tsx
import React, { createContext, useContext } from "react";
import { supabase } from "../supabaseClient"; // ✅ use shared client from src/
import type { SupabaseClient } from "@supabase/supabase-js";

type SupabaseContextType = {
  supabase: SupabaseClient;
};

// ✅ Initialize context with the existing shared client
const SupabaseContext = createContext<SupabaseContextType>({
  supabase,
});

export const SupabaseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <SupabaseContext.Provider value={{ supabase }}>
    {children}
  </SupabaseContext.Provider>
);

// ✅ Custom hook for using Supabase anywhere in your React app
export const useSupabaseClient = () => useContext(SupabaseContext);
