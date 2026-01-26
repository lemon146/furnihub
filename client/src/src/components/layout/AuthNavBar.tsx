"use client";
import { Link } from "react-router-dom";
import logo from "../../assets/images/Logo.png";

export default function AuthNavbar() {
  return (
    <header className="w-full py-4 bg-white/80 backdrop-blur-lg border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 select-none">
          <img
            src={logo}
            alt="Furniro Logo"
            className="h-8 w-10 object-contain"
          />
          <h1 className="font-bold text-2xl tracking-tight text-[#333]">
            Furniro
          </h1>
        </Link>

        {/* Back to Shop */}
        <Link
          to="/shop"
          className="text-sm font-semibold text-[#3A3A3A] hover:text-[#B88E2F] transition-colors"
        >
          Back to Shop
        </Link>
      </div>
    </header>
  );
}
