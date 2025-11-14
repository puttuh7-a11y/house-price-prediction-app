iimport React, { useState } from "react";
import { Menu, MoreVertical, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          House Price App
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link to="/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>
          <Link to="/about" className="hover:text-blue-600">
            About
          </Link>
        </div>

        {/* Mobile Menu Icon (Three Dots) */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <MoreVertical size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white shadow-lg py-4 px-6 flex flex-col gap-4 text-gray-700 font-medium">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setOpen(false)}
            className="hover:text-blue-600"
          >
            Dashboard
          </Link>
          <Link
            to="/about"
            onClick={() => setOpen(false)}
            className="hover:text-blue-600"
          >
            About
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
