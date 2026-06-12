import { useState, useRef, useEffect } from "react";
import { FaBell, FaSearch, FaMoon, FaSun } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";
import { MdCheck } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  const displayName = currentUser
    ? currentUser.name || `${currentUser.firstName || ""} ${currentUser.lastName || ""}`.trim()
    : "Wilhelm S. Tamba";
  const avatarUrl = currentUser?.image || "/img/profile.jpg";

  // Tutup dropdown kalau klik di luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsSettingsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isLight = theme === "light";

  // Warna dinamis berdasarkan tema
  const headerBg = isLight
    ? "bg-white/80 border-black/[0.06]"
    : "bg-[#0F0F0F]/50 border-white/[0.05]";
  const inputBg = isLight
    ? "bg-gray-100 border-black/[0.08] text-gray-800 placeholder-gray-400"
    : "bg-[#1A1A1A] border-white/[0.05] text-white placeholder-white/20";
  const iconBtn = isLight
    ? "bg-gray-100 border-black/[0.08] text-gray-500 hover:text-gray-900 hover:bg-gray-200"
    : "bg-[#1A1A1A] border-white/[0.05] text-gray-400 hover:text-white";
  const profileBorder = isLight ? "border-black/[0.06]" : "border-white/[0.05]";
  const textPrimary = isLight ? "text-gray-900" : "text-white";
  const textSecondary = isLight ? "text-gray-400" : "text-gray-400";

  // Dropdown warna
  const dropdownBg = isLight
    ? "bg-white border-black/[0.08] shadow-xl shadow-black/[0.08]"
    : "bg-[#1A1A1A] border-white/[0.08] shadow-xl shadow-black/30";
  const dropdownItem = isLight
    ? "hover:bg-gray-50 text-gray-700"
    : "hover:bg-white/[0.05] text-gray-300";
  const dropdownDivider = isLight ? "border-black/[0.06]" : "border-white/[0.06]";
  const activeItem = isLight
    ? "bg-[#FF5C00]/10 text-[#FF5C00]"
    : "bg-[#FF5C00]/10 text-[#FF5C00]";

  return (
    <div
      data-theme-header
      className={`flex justify-between items-center px-6 py-4 backdrop-blur-md border-b sticky top-0 z-50 transition-all duration-300 ${headerBg}`}
    >
      {/* Search Bar */}
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          placeholder="Search Here..."
          className={`border p-3 pr-10 w-full rounded-2xl outline-none transition-all text-sm ${inputBg} focus:border-[#FF5C00]/50`}
        />
        <FaSearch className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs ${textSecondary}`} />
      </div>

      {/* Icon & Profile Section */}
      <div className="flex items-center space-x-4 ml-6">
        <div className="flex space-x-2">
          {/* Bell */}
          <div className={`p-3 border rounded-xl cursor-pointer transition ${iconBtn}`}>
            <FaBell className="text-sm" />
          </div>

          {/* Chart */}
          <div className={`p-3 border rounded-xl cursor-pointer transition ${iconBtn}`}>
            <FcAreaChart className="text-sm" />
          </div>

          {/* Settings Button dengan Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsSettingsOpen((prev) => !prev)}
              className={`p-3 border rounded-xl cursor-pointer transition ${
                isSettingsOpen
                  ? "bg-[#FF5C00]/10 border-[#FF5C00]/30 text-[#FF5C00]"
                  : iconBtn
              }`}
              title="Pengaturan Tampilan"
            >
              <SlSettings className={`text-sm transition-transform duration-300 ${isSettingsOpen ? "rotate-45" : ""}`} />
            </button>

            {/* Dropdown Panel */}
            {isSettingsOpen && (
              <div
                className={`absolute right-0 mt-3 w-64 border rounded-2xl overflow-hidden transition-all duration-200 z-[100] ${dropdownBg}`}
              >
                {/* Header Dropdown */}
                <div className={`px-4 py-3 border-b ${dropdownDivider}`}>
                  <p className={`text-xs font-bold uppercase tracking-widest ${textSecondary}`}>
                    ⚙️ Pengaturan Tampilan
                  </p>
                </div>

                {/* Theme Options */}
                <div className="p-2">
                  <p className={`text-[10px] font-semibold uppercase tracking-wider px-3 py-2 ${textSecondary}`}>
                    Tema
                  </p>

                  {/* Dark Mode */}
                  <button
                    onClick={() => { setTheme("dark"); setIsSettingsOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                      theme === "dark" ? activeItem : dropdownItem
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg ${theme === "dark" ? "bg-[#FF5C00]/20" : "bg-gray-200/50"}`}>
                      <FaMoon className="text-sm" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-[13px]">Dark Mode</p>
                      <p className="text-[10px] opacity-60">Tema gelap premium</p>
                    </div>
                    {theme === "dark" && (
                      <MdCheck className="text-[#FF5C00] text-lg flex-shrink-0" />
                    )}
                  </button>

                  {/* Light Mode */}
                  <button
                    onClick={() => { setTheme("light"); setIsSettingsOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                      theme === "light" ? activeItem : dropdownItem
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg ${theme === "light" ? "bg-[#FF5C00]/20" : "bg-gray-700/30"}`}>
                      <FaSun className="text-sm" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-[13px]">Light Mode</p>
                      <p className="text-[10px] opacity-60">Tema terang & bersih</p>
                    </div>
                    {theme === "light" && (
                      <MdCheck className="text-[#FF5C00] text-lg flex-shrink-0" />
                    )}
                  </button>
                </div>

                {/* Preview Indicator */}
                <div className={`px-4 py-2.5 border-t ${dropdownDivider}`}>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${theme === "dark" ? "bg-slate-400" : "bg-amber-400"} animate-pulse`} />
                    <p className={`text-[10px] ${textSecondary}`}>
                      Aktif: <span className="font-semibold">{theme === "dark" ? "Dark Mode" : "Light Mode"}</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Profile */}
        <div className={`flex items-center space-x-3 border-l pl-4 ${profileBorder}`}>
          <div className="text-right">
            <p className={`text-xs ${textSecondary}`}>Welcome back,</p>
            <p className={`text-sm font-bold ${textPrimary}`}>{displayName}</p>
          </div>
          <img
            src={avatarUrl}
            className="w-10 h-10 rounded-full ring-2 ring-[#FF5C00]/20 object-cover"
            alt="avatar"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=FF5C00&color=fff&bold=true`;
            }}
          />
        </div>
      </div>
    </div>
  );
}