import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";

export default function Modal({ isOpen, onClose, title, children, className = "" }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Dialog */}
      <div
        className={`relative w-full max-w-lg bg-[#1A1A1A] border border-white/5 rounded-[32px] shadow-2xl p-8 z-10 transform scale-100 transition-all duration-300 animate-in fade-in zoom-in-95 ${className}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition active:scale-95"
          >
            <MdClose className="text-xl" />
          </button>
        </div>

        {/* Body */}
        <div className="text-gray-300 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
