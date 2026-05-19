import React from "react";
import {
  MdCheckCircle,
  MdWarning,
  MdInfo,
  MdError,
} from "react-icons/md";

export default function Alert({ children, type = "info", className = "" }) {
  const icons = {
    success: <MdCheckCircle className="text-emerald-500 text-xl flex-shrink-0" />,
    warning: <MdWarning className="text-amber-500 text-xl flex-shrink-0" />,
    info: <MdInfo className="text-[#FF5C00] text-xl flex-shrink-0" />,
    danger: <MdError className="text-red-500 text-xl flex-shrink-0" />,
  };

  const styles = {
    success: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    warning: "bg-amber-500/10 border-amber-500/20 text-amber-400",
    info: "bg-[#FF5C00]/10 border-[#FF5C00]/20 text-[#FF5C00]",
    danger: "bg-red-500/10 border-red-500/20 text-red-400",
  };

  return (
    <div
      className={`border p-4 rounded-2xl flex items-start gap-3 text-sm font-medium ${styles[type]} ${className}`}
    >
      {icons[type]}
      <div className="flex-1 leading-relaxed">{children}</div>
    </div>
  );
}
