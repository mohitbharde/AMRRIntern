import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export const TopBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <header className="bg-white/70 backdrop-blur-md shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-2xl font-bold tracking-tight text-blue-600">
          Item Manager
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 text-md font-medium">
          <Link
            to="/"
            className="text-blue-600 hover:underline underline-offset-4"
          >
            Home
          </Link>
          <Link
            to="/add"
            className="text-blue-600 hover:underline underline-offset-4"
          >
            Add Item
          </Link>
          <Link
            to="/view"
            className="text-blue-600 hover:underline underline-offset-4"
          >
            View Items
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-blue-600"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md py-2 px-6 space-y-2">
          <Link
            to="/"
            className="block text-blue-600 hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/add"
            className="block text-blue-600 hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Add Item
          </Link>
          <Link
            to="/view"
            className="block text-blue-600 hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            View Items
          </Link>
        </div>
      )}
    </div>
  );
};
