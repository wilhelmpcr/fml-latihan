import React from "react";

export default function TextArea({
  label,
  name,
  placeholder = "",
  value,
  onChange,
  rows = 4,
  error = "",
  className = "",
  ...props
}) {
  return (
    <div className={`relative w-full ${className}`}>
      {label && (
        <label className="absolute left-4 -top-2.5 px-1.5 bg-[#1A1A1A] text-[10px] font-black uppercase tracking-wider text-[#FF5C00] z-10">
          {label}
        </label>
      )}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-5 py-4 bg-transparent border ${
          error ? "border-red-500" : "border-white/10"
        } rounded-2xl text-white placeholder-white/20 outline-none focus:border-[#FF5C00] transition-all resize-none`}
        {...props}
      />
      {error && <p className="text-[10px] text-red-400 mt-1.5 ml-4 font-semibold">{error}</p>}
    </div>
  );
}
