import React from "react";
import Button from "./Button";

export default function HeroSection({
  title = "Sajian Catering Premium khas Nusantara",
  subtitle = "Dari koki terbaik untuk hidangan kantor, pernikahan, dan acara spesial Anda.",
  ctaText = "Pesan Sekarang",
  onCtaClick,
}) {
  return (
    <div className="relative bg-[#1A1A1A] border border-white/5 rounded-[40px] p-8 md:p-12 overflow-hidden shadow-2xl">
      {/* Decorative Oranye Glow */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#FF5C00]/10 rounded-full filter blur-[80px] -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-amber-500/5 rounded-full filter blur-[60px] -ml-16 -mb-16"></div>

      <div className="relative z-10 max-w-2xl flex flex-col items-start gap-4">
        <span className="bg-[#FF5C00]/10 border border-[#FF5C00]/20 text-[#FF5C00] text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
          Catering Terbaik
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mt-2">
          {title}
        </h1>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-lg mb-4">
          {subtitle}
        </p>
        <Button type="primary" onClick={onCtaClick}>
          {ctaText}
        </Button>
      </div>
    </div>
  );
}
