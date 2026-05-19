import React from "react";

export default function Badge({ children, type = "primary", className = "" }) {
  const baseStyle =
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase";

  const types = {
    primary: "bg-[#FF5C00]/10 border border-[#FF5C00]/25 text-[#FF5C00]",
    secondary: "bg-white/5 border border-white/10 text-gray-400",
    success: "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400",
    danger: "bg-red-500/10 border border-red-500/20 text-red-400",
    warning: "bg-amber-500/10 border border-amber-500/20 text-amber-400",
  };

  return (
    <span className={`${baseStyle} ${types[type]} ${className}`}>
      {children}
    </span>
  );
}
