// src/components/layout/Header.tsx
import React from "react";
import { Home as HomeIcon, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";              // ✅ add this
import { useTheme } from "../../context/ThemeContext";

interface HeaderProps {
  children?: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className={`border-b border-gray-200 ${
        theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center space-x-3">
          <div className={`rounded-md p-2 ${theme === "dark" ? "bg-gray-800" : "bg-blue-50"}`}>
            <HomeIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Valuato</h1>
            <p className="text-xs text-gray-500 hidden sm:block">AI-Powered Property Valuation</p>
          </div>
        </div>

        {/* Navigation + Theme Toggle */}
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex space-x-6 text-sm">
            {/* ✅ use Link paths, not hash anchors */}
            <Link to="/" className="hover:text-blue-600 transition font-medium">
              Home
            </Link>
            <Link to="/dashboard" className="hover:text-blue-600 transition font-medium">
              Dashboard
            </Link>
            <Link to="/about" className="hover:text-blue-600 transition font-medium">
              About
            </Link>
          </nav>
<button
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-white/30 dark:bg-gray-700/60 text-gray-800 dark:text-gray-200 hover:scale-110 transition-transform shadow-md backdrop-blur-md"
                    title="Toggle Theme"
                  >
                    {theme === "light" ? (
                      <Moon className="h-5 w-5 text-indigo-600" />
                    ) : (
                      <Sun className="h-5 w-5 text-yellow-400" />
                    )}
                  </button>
        

          {children}
        </div>
      </div>
    </header>
  );
}
