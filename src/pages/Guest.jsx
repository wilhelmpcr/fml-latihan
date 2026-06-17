import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Modal from "../components/Modal";

export default function Guest() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [searchAlert, setSearchAlert] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchAlert(`Fitur pencarian katering "${searchQuery}" akan segera hadir!`);
      setTimeout(() => setSearchAlert(""), 4000);
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex flex-col justify-between p-8 relative overflow-hidden font-poppins text-[#0A3D40]"
      style={{ 
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.2)), url('https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1920')` 
      }}
    >
      {/* Overlay background dimm/glass effect */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[0.5px] pointer-events-none"></div>

      {/* Dotted Circle Accent (Top Center-Right) */}
      <div className="absolute top-[18%] right-[35%] w-6 h-6 rounded-full border-2 border-dashed border-[#FF8C00] flex items-center justify-center pointer-events-none animate-spin duration-10000">
        <div className="w-3 h-3 rounded-full bg-[#0A3D40]"></div>
      </div>

      {/* Top Navbar Row */}
      <header className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-baseline cursor-pointer" onClick={() => navigate("/guest")}>
          <span className="text-2xl font-black font-sans tracking-wide text-[#0A3D40]">
            NusaCater
          </span>
          <span className="text-[#FF8C00] text-3xl font-black">.</span>
        </div>

        {/* Center Menus */}
        <nav className="flex items-center gap-6 md:gap-8 font-semibold text-xs tracking-wider">
          <button 
            onClick={() => navigate("/guest")}
            className="bg-[#FF8C00] text-white px-5 py-2.5 rounded-full shadow-md hover:brightness-110 transition cursor-pointer"
          >
            Home
          </button>
          <button 
            onClick={() => navigate("/members")}
            className="hover:text-[#FF8C00] transition cursor-pointer"
          >
            Members Portal
          </button>
          <button 
            onClick={() => navigate("/login")}
            className="hover:text-[#FF8C00] transition cursor-pointer"
          >
            Login
          </button>
          <button 
            onClick={() => setIsContactOpen(true)}
            className="hover:text-[#FF8C00] transition cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Right Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-[240px]">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#0A3D40] text-white text-xs placeholder-white/40 px-5 py-3 pr-10 rounded-full w-full outline-none focus:ring-2 focus:ring-[#FF8C00]/40 transition-all font-semibold"
          />
          <button 
            type="submit" 
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#FF8C00] text-white p-2 rounded-full hover:brightness-110 transition cursor-pointer"
          >
            <FaSearch className="text-[10px]" />
          </button>
        </form>
      </header>

      {/* Search Alert Notification */}
      {searchAlert && (
        <div className="fixed top-24 right-8 bg-[#0A3D40] text-white border-l-4 border-[#FF8C00] p-4 rounded-xl text-xs font-semibold shadow-2xl z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          {searchAlert}
        </div>
      )}

      {/* Hero Title Section */}
      <main className="relative z-10 my-auto flex flex-col items-start max-w-xl md:pl-8 space-y-2 mt-20 md:mt-24">
        {/* cursive subtitle */}
        <span 
          className="text-4xl md:text-5xl text-[#FF8C00] font-normal leading-none"
          style={{ fontFamily: "'Pacifico', cursive" }}
        >
          It's time to
        </span>
        {/* bold block text */}
        <h1 
          className="text-7xl md:text-[9.5rem] font-extrabold leading-[0.8] tracking-tight text-[#0A3D40] drop-shadow-sm select-none"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          FEAST
        </h1>
      </main>

      {/* Bottom Row */}
      <footer className="relative z-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mt-12">
        {/* Action Button Capsule */}
        <div className="flex items-center p-1 bg-transparent border-2 border-[#FF8C00] rounded-full max-w-sm sm:max-w-md shadow-sm">
          <button 
            onClick={() => navigate("/members")}
            className="bg-[#0A3D40] text-white font-bold text-xs tracking-wider px-6 py-3.5 rounded-full hover:bg-[#072a2c] transition cursor-pointer active:scale-95 whitespace-nowrap"
          >
            Explore Members
          </button>
          <span className="text-[10px] sm:text-xs font-bold font-mono tracking-widest text-[#0A3D40] px-6 py-2">
            WWW.NUSACATER.COM
          </span>
        </div>

        {/* Brand Slogan */}
        <div className="text-right hidden sm:block max-w-[200px]">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#0A3D40]/80">NusaCater Club</p>
          <p className="text-[11px] font-medium text-gray-700 mt-1">Catering & Event Management Premium Terpercaya</p>
        </div>
      </footer>

      {/* Decorative Bottom Center Circle Shape */}
      <div className="absolute -bottom-28 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-[#0A3D40] border-4 border-dashed border-[#FF8C00]/50 pointer-events-none"></div>

      {/* Contact Modal */}
      <Modal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        title="Hubungi NusaCater"
        className="max-w-md bg-[#0A3D40] border-[#FF8C00]/20"
      >
        <div className="space-y-4 text-white">
          <p className="text-xs text-white/80 leading-relaxed">
            Kami siap melayani kebutuhan catering pernikahan, kantor, syukuran, dan event besar lainnya dengan standar rasa kelas dunia.
          </p>

          <div className="space-y-2 text-xs pt-2">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/60">Telepon / WA</span>
              <span className="font-bold text-[#FF8C00]">0812-3456-7890</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/60">Email</span>
              <span className="font-bold">halo@nusacater.com</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/60">Alamat Dapur</span>
              <span className="font-bold">Bandung, Jawa Barat</span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="text-white/60">Jam Operasional</span>
              <span className="font-bold">08:00 - 20:00 WIB</span>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setIsContactOpen(false)}
              className="bg-[#FF8C00] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition cursor-pointer active:scale-95"
            >
              Tutup
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
