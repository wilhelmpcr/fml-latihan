import { Outlet } from "react-router-dom";
import { MdRestaurantMenu } from "react-icons/md";

export default function AuthLayout() {
  return (
    // Background Hitam Pekat sesuai Dashboard
    <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F] relative overflow-hidden font-poppins">
      
      {/* Decorative Orange Glows (Efek Pendaran di Background) */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full filter blur-[120px] -translate-x-1/2 -translate-y-1/2 opacity-60" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full filter blur-[100px] translate-x-1/3 translate-y-1/3" />

      {/* Card Container - Abu-abu Gelap (Dark Card) */}
      <div className="relative bg-[#1A1A1A] p-10 rounded-[40px] border border-white/5 shadow-2xl w-full max-w-md z-10">
        
        {/* Logo - Diubah ke nuansa Oranye */}
        <div className="flex flex-col items-center mb-10">
          <div className="bg-[#FF5C00] p-3 rounded-2xl shadow-[0_0_20px_rgba(255,92,0,0.3)] mb-4">
            <MdRestaurantMenu className="text-white text-3xl" />
          </div>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-white tracking-tight">
              NusaCater
            </span>
            <span className="text-[#FF5C00] text-2xl font-bold">.</span>
          </div>
          <p className="text-[10px] text-gray-500 font-bold tracking-[0.3em] uppercase mt-1">
            Catering Dashboard
          </p>
        </div>

        {/* Halaman auth (Login/Register/Forgot) */}
        <div className="relative">
          <Outlet />
        </div>

        <p className="text-center text-[10px] text-gray-600 mt-8 tracking-widest uppercase">
          © 2025 NusaCater. All rights reserved.
        </p>
      </div>
    </div>
  );
}
