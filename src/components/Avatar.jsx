import React from "react";

export default function Avatar({ src, name = "User", size = "md", className = "" }) {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-11 h-11 text-sm font-bold",
    lg: "w-16 h-16 text-lg font-black",
  };

  const getInitials = (n) => {
    return n ? n.trim().charAt(0).toUpperCase() : "?";
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${sizes[size]} rounded-full ring-2 ring-[#FF5C00]/20 object-cover`}
        />
      ) : (
        <div
          className={`${sizes[size]} rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-white ring-2 ring-[#FF5C00]/20`}
        >
          {getInitials(name)}
        </div>
      )}
    </div>
  );
}
