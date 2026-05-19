import React from "react";
import { ImSpinner2 } from "react-icons/im";

export default function Button({
  children,
  type = "primary",
  onClick,
  disabled = false,
  loading = false,
  className = "",
  ...props
}) {
  const baseStyle =
    "px-5 py-2.5 rounded-2xl font-semibold text-sm transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";

  const types = {
    primary:
      "bg-gradient-to-r from-[#FF8C00] to-[#FF5C00] text-white hover:brightness-110 shadow-[0_4px_15px_rgba(255,92,0,0.2)] hover:shadow-[0_4px_25px_rgba(255,92,0,0.35)]",
    secondary:
      "bg-transparent border border-white/10 text-white hover:bg-white/5 hover:border-white/20",
    success:
      "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 shadow-[0_4px_15px_rgba(16,185,129,0.1)]",
    danger:
      "bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 shadow-[0_4px_15px_rgba(239,68,68,0.1)]",
    warning:
      "bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 shadow-[0_4px_15px_rgba(245,158,11,0.1)]",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyle} ${types[type]} ${className}`}
      {...props}
    >
      {loading && <ImSpinner2 className="animate-spin text-lg" />}
      {!loading && children}
    </button>
  );
}
