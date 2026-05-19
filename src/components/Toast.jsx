import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";

export default function Toast({ message, type = "success", show, onClose, duration = 3000 }) {
  useEffect(() => {
    if (show && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  const typeStyles = {
    success: "bg-emerald-500 border-emerald-600 text-white",
    danger: "bg-red-500 border-red-600 text-white",
    info: "bg-[#FF5C00] border-[#E04F00] text-white",
  };

  return (
    <div className="fixed bottom-6 right-6 z-[2000] animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div
        className={`flex items-center gap-3 px-5 py-3 rounded-2xl border shadow-2xl ${typeStyles[type]}`}
      >
        <span className="text-sm font-bold">{message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-lg transition active:scale-95 ml-2"
          >
            <MdClose className="text-lg" />
          </button>
        )}
      </div>
    </div>
  );
}
