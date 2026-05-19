import React from "react";

export default function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-[#1A1A1A] border border-white/5 rounded-[32px] p-6 shadow-xl hover:border-white/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden ${className}`}
    >
      {/* Decorative subtle top light reflection */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      {children}
    </div>
  );
}
