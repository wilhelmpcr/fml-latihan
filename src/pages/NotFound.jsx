import { useState } from "react";
import { Link } from "react-router-dom";
import { MdRefresh, MdHome } from "react-icons/md";

export default function ErrorPage({ code, message, image }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    // Background diubah ke hitam pekat agar senada dengan Dashboard
    <div className="flex-1 flex flex-col items-center justify-center bg-[#0F0F0F] p-6 text-center relative overflow-hidden">
      
      {/* Efek Pendaran Oranye di Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF5C00]/5 rounded-full blur-[120px] pointer-events-none" />

      <div 
        className={`relative z-10 transition-all duration-500 transform ${isHovered ? "scale-110 -rotate-3" : "scale-100"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Menampilkan Gambar dengan Shadow Oranye Tipis */}
        <img 
          src={image} 
          alt={`Error ${code}`} 
          className="w-80 h-auto drop-shadow-[0_20px_50px_rgba(255,92,0,0.15)] mb-8" 
        />
      </div>

      {/* Ghost Text (Teks Besar di Belakang) */}
      <h1 className="text-[12rem] font-black text-white/[0.03] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none z-0">
        {code}
      </h1>
      
      <div className="relative z-10">
        <h2 className="text-4xl font-bold text-white mt-2 italic">
          Opps! <span className="text-[#FF5C00]">Error {code}</span>
        </h2>
        <p className="text-gray-500 mt-4 max-w-sm mx-auto font-medium">
          {message}
        </p>
      </div>

      <div className="flex gap-4 mt-10 relative z-10">
        {/* Tombol Muat Ulang - Dark Style */}
        <button 
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-8 py-3.5 bg-dark-card border border-white/10 text-gray-300 rounded-2xl font-bold hover:bg-white/5 transition-all shadow-xl"
        >
          <MdRefresh className="text-xl" />
          Muat Ulang
        </button>

        {/* Tombol Ke Dashboard - Oranye Brand */}
        <Link 
          to="/"
          className="flex items-center gap-2 px-8 py-3.5 bg-[#FF5C00] text-white rounded-2xl font-bold shadow-[0_10px_25px_rgba(255,92,0,0.3)] hover:brightness-110 active:scale-95 transition-all"
        >
          <MdHome className="text-xl" />
          Ke Dashboard
        </Link>
      </div>
    </div>
  );
}
