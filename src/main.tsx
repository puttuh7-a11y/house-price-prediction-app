// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// ✅ Import Tailwind and custom global styles
import "./styles/globals.css";
import "./index.css";

// ✅ Import providers for theme & Supabase
import { ThemeProvider } from "./context/ThemeContext";
import { SupabaseProvider } from "./context/SupabaseContext";

// ✅ Ensure the root element exists
const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found. Please ensure <div id='root'></div> is present in index.html");
}

// ✅ Render the app inside React Strict Mode
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ThemeProvider>
      <SupabaseProvider>
        <div className="min-h-screen bg-[#bcbc57] text-[#c41515] font-[Poppins,sans-serif]">
          <App />
        </div>
      </SupabaseProvider>
    </ThemeProvider>
  </React.StrictMode>
);
