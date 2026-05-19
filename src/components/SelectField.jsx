import React from "react";

export default function SelectField({
  label,
  name,
  value,
  onChange,
  options = [],
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
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-5 py-4 bg-[#1A1A1A] border ${
          error ? "border-red-500" : "border-white/10"
        } rounded-2xl text-white outline-none focus:border-[#FF5C00] transition-all appearance-none cursor-pointer`}
        {...props}
      >
        <option value="" disabled className="bg-[#1A1A1A] text-gray-500">
          Pilih opsi...
        </option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value} className="bg-[#1A1A1A] text-white">
            {opt.label}
          </option>
        ))}
      </select>
      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
        ▼
      </div>
      {error && <p className="text-[10px] text-red-400 mt-1.5 ml-4 font-semibold">{error}</p>}
    </div>
  );
}
