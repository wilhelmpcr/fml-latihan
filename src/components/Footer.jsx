import React from "react";
import { MdRestaurantMenu } from "react-icons/md";

export default function Footer({ className = "" }) {
  return (
    <footer className={`bg-[#1A1A1A] border-t border-white/5 py-8 mt-12 rounded-[32px] overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-[#FF5C00] p-2 rounded-xl">
            <MdRestaurantMenu className="text-white text-xl" />
          </div>
          <div>
            <div className="flex items-baseline">
              <span className="font-poppins text-lg font-bold text-white">NusaCater</span>
              <span className="text-[#FF5C00] text-lg font-bold">.</span>
            </div>
            <p className="text-[9px] text-gray-500 font-semibold tracking-wider">CATERING DASHBOARD</p>
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-6 text-sm text-gray-400">
          <a href="#" className="hover:text-white transition">Home</a>
          <a href="#" className="hover:text-white transition">Paket Catering</a>
          <a href="#" className="hover:text-white transition">Kontak</a>
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} NusaCater. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
