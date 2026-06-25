import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaCrown, FaGem, FaAward, FaCheckCircle, FaArrowDown } from "react-icons/fa";
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
    <div className="w-full min-h-screen bg-[#FAF6F0] font-poppins text-[#0A3D40] overflow-x-hidden scroll-smooth">
      {/* Hero Section */}
      <div 
        className="min-h-screen bg-cover bg-center flex flex-col justify-between p-8 relative overflow-hidden text-[#0A3D40]"
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
              onClick={() => {
                const pricingSection = document.getElementById("pricing-section");
                if (pricingSection) {
                  pricingSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="hover:text-[#FF8C00] transition cursor-pointer"
            >
              Paket Member
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
        <footer className="relative z-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mt-12 mb-8">
          {/* Action Button Capsule */}
          <div className="flex items-center p-1 bg-transparent border-2 border-[#FF8C00] rounded-full max-w-sm sm:max-w-md shadow-sm">
            <button 
              onClick={() => {
                const pricingSection = document.getElementById("pricing-section");
                if (pricingSection) {
                  pricingSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
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

        {/* Scroll Down Indicator */}
        <div 
          onClick={() => {
            const pricingSection = document.getElementById("pricing-section");
            if (pricingSection) {
              pricingSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 cursor-pointer animate-bounce hover:text-[#FF8C00] transition-colors"
        >
          <span className="text-[9px] font-bold tracking-widest text-[#0A3D40] uppercase">Scroll Down</span>
          <FaArrowDown className="text-[#FF8C00] text-xs" />
        </div>

        {/* Decorative Bottom Center Circle Shape */}
        <div className="absolute -bottom-28 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-[#0A3D40] border-4 border-dashed border-[#FF8C00]/50 pointer-events-none"></div>
      </div>

      {/* Pricing Section */}
      <section id="pricing-section" className="relative py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-[#FAF6F0] to-[#F3EDE2] overflow-hidden">
        {/* Background shapes/accent */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#FF8C00]/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#0A3D40]/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          {/* Header Title */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#FF8C00]">NusaCater Club</span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0A3D40]">
              Pilihan Keanggotaan NusaCater
            </h2>
            <p className="text-sm text-[#0A3D40]/75 leading-relaxed font-medium">
              Nikmati potongan harga spesial, prioritas menu premium, dan gratis ongkos kirim dengan bergabung bersama NusaCater Member Club.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Bronze Tier */}
            <div className="bg-white/80 backdrop-blur-sm border border-[#0A3D40]/10 rounded-[32px] p-8 shadow-xl flex flex-col justify-between hover:border-[#FF8C00]/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-orange-100 to-transparent rounded-bl-full pointer-events-none transition-all group-hover:scale-110"></div>
              
              <div>
                {/* Badge & Title */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="px-3.5 py-1.5 rounded-full text-[9px] font-black tracking-widest bg-orange-100 text-orange-700 uppercase border border-orange-200">
                      Bronze Tier
                    </span>
                    <h3 className="text-2xl font-extrabold text-[#0A3D40] mt-3">Starter Feast</h3>
                  </div>
                  <div className="bg-orange-100 p-3.5 rounded-2xl text-orange-600 text-xl border border-orange-200 shadow-sm flex items-center justify-center">
                    <FaAward />
                  </div>
                </div>

                {/* Price */}
                <div className="my-8">
                  <span className="text-sm font-bold text-[#0A3D40]/60">Biaya Langganan</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-4xl font-black text-[#0A3D40]">Gratis</span>
                    <span className="text-xs text-[#0A3D40]/60 font-semibold font-mono">/ Registrasi</span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-4 border-t border-[#0A3D40]/10 pt-6 text-xs text-[#0A3D40]/80">
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-orange-500 text-sm mt-0.5 flex-shrink-0" />
                    <span>Diskon <strong>5%</strong> untuk pemesanan katering harian</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-orange-500 text-sm mt-0.5 flex-shrink-0" />
                    <span>Akses menu katering standar nusantara</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-orange-500 text-sm mt-0.5 flex-shrink-0" />
                    <span>Dukungan pelanggan standar via email</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-30">
                    <FaCheckCircle className="text-[#0A3D40]/40 text-sm mt-0.5 flex-shrink-0" />
                    <span className="line-through">Prioritas reservasi menu harian & buffet</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-30">
                    <FaCheckCircle className="text-[#0A3D40]/40 text-sm mt-0.5 flex-shrink-0" />
                    <span className="line-through">Gratis ongkir & menu premium eksklusif</span>
                  </li>
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-6 border-t border-[#0A3D40]/5">
                <button 
                  onClick={() => navigate("/register")}
                  className="w-full bg-[#0A3D40] hover:bg-[#072a2c] text-white font-bold text-xs tracking-wider py-4 rounded-2xl transition cursor-pointer active:scale-95 shadow-lg shadow-[#0A3D40]/10"
                >
                  Daftar Sekarang
                </button>
              </div>
            </div>

            {/* Silver Tier (Populer) */}
            <div className="bg-white border-2 border-[#FF8C00] rounded-[32px] p-8 shadow-2xl flex flex-col justify-between hover:shadow-[0_20px_40px_rgba(255,140,0,0.15)] transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden">
              {/* Popular Ribbon */}
              <div className="absolute top-0 right-0 bg-[#FF8C00] text-white text-[9px] font-black tracking-widest uppercase px-6 py-2 rotate-45 translate-x-8 translate-y-4 shadow-sm">
                Populer
              </div>
              
              <div>
                {/* Badge & Title */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="px-3.5 py-1.5 rounded-full text-[9px] font-black tracking-widest bg-sky-100 text-sky-700 uppercase border border-sky-200">
                      Silver Tier
                    </span>
                    <h3 className="text-2xl font-extrabold text-[#0A3D40] mt-3">Active Gourmet</h3>
                  </div>
                  <div className="bg-sky-100 p-3.5 rounded-2xl text-sky-600 text-xl border border-sky-200 shadow-sm flex items-center justify-center">
                    <FaGem />
                  </div>
                </div>

                {/* Price */}
                <div className="my-8">
                  <span className="text-sm font-bold text-[#0A3D40]/60">Biaya Langganan</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-bold text-[#0A3D40]/60">Rp</span>
                    <span className="text-4xl font-black text-[#0A3D40]">149.000</span>
                    <span className="text-xs text-[#0A3D40]/60 font-semibold font-mono">/ bulan</span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-4 border-t border-[#0A3D40]/10 pt-6 text-xs text-[#0A3D40]/80">
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-[#FF8C00] text-sm mt-0.5 flex-shrink-0" />
                    <span>Diskon <strong>10%</strong> untuk semua jenis pesanan katering</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-[#FF8C00] text-sm mt-0.5 flex-shrink-0" />
                    <span>Prioritas reservasi menu harian & buffet</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-[#FF8C00] text-sm mt-0.5 flex-shrink-0" />
                    <span>Free tester menu baru setiap awal bulan</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-[#FF8C00] text-sm mt-0.5 flex-shrink-0" />
                    <span>Layanan dukungan pelanggan prioritas</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-30">
                    <FaCheckCircle className="text-[#0A3D40]/40 text-sm mt-0.5 flex-shrink-0" />
                    <span className="line-through">Gratis ongkos kirim seluruh wilayah</span>
                  </li>
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-6 border-t border-[#0A3D40]/5">
                <button 
                  onClick={() => navigate("/login")}
                  className="w-full bg-[#FF8C00] hover:brightness-110 text-white font-bold text-xs tracking-wider py-4 rounded-2xl transition cursor-pointer active:scale-95 shadow-lg shadow-[#FF8C00]/25"
                >
                  Pilih Silver
                </button>
              </div>
            </div>

            {/* Gold Tier */}
            <div className="bg-white/80 backdrop-blur-sm border border-[#0A3D40]/10 rounded-[32px] p-8 shadow-xl flex flex-col justify-between hover:border-yellow-500/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-yellow-100 to-transparent rounded-bl-full pointer-events-none transition-all group-hover:scale-110"></div>
              
              <div>
                {/* Badge & Title */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="px-3.5 py-1.5 rounded-full text-[9px] font-black tracking-widest bg-yellow-100 text-yellow-700 uppercase border border-yellow-200">
                      Gold Tier
                    </span>
                    <h3 className="text-2xl font-extrabold text-[#0A3D40] mt-3">Ultimate Feast</h3>
                  </div>
                  <div className="bg-yellow-100 p-3.5 rounded-2xl text-yellow-600 text-xl border border-yellow-200 shadow-sm flex items-center justify-center">
                    <FaCrown className="animate-bounce" />
                  </div>
                </div>

                {/* Price */}
                <div className="my-8">
                  <span className="text-sm font-bold text-[#0A3D40]/60">Biaya Langganan</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-bold text-[#0A3D40]/60">Rp</span>
                    <span className="text-4xl font-black text-[#0A3D40]">349.000</span>
                    <span className="text-xs text-[#0A3D40]/60 font-semibold font-mono">/ bulan</span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-4 border-t border-[#0A3D40]/10 pt-6 text-xs text-[#0A3D40]/80">
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-yellow-600 text-sm mt-0.5 flex-shrink-0" />
                    <span>Diskon <strong>15%</strong> untuk semua jenis pesanan katering</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-yellow-600 text-sm mt-0.5 flex-shrink-0" />
                    <span>Gratis ongkos kirim tanpa minimum pemesanan</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-yellow-600 text-sm mt-0.5 flex-shrink-0" />
                    <span>Akses menu premium eksklusif & chef-crafted</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-yellow-600 text-sm mt-0.5 flex-shrink-0" />
                    <span>Layanan prioritas VIP Concierge 24/7</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-yellow-600 text-sm mt-0.5 flex-shrink-0" />
                    <span>Kustomisasi menu diet & alergi khusus</span>
                  </li>
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-6 border-t border-[#0A3D40]/5">
                <button 
                  onClick={() => navigate("/login")}
                  className="w-full bg-[#0A3D40] hover:bg-[#072a2c] text-white font-bold text-xs tracking-wider py-4 rounded-2xl transition cursor-pointer active:scale-95 shadow-lg shadow-[#0A3D40]/10"
                >
                  Pilih Gold
                </button>
              </div>
            </div>
          </div>

          {/* Explanation Info Box */}
          <div className="bg-[#0A3D40] rounded-[32px] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden group">
            {/* Visual shine */}
            <div className="absolute right-0 bottom-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
              <div className="lg:col-span-2 space-y-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#FF8C00]">💡 Keanggotaan Transaksional</span>
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                  Tingkatkan Level Member Anda Secara Gratis!
                </h3>
                <p className="text-xs text-white/80 leading-relaxed max-w-2xl font-medium">
                  Selain berlangganan bulanan secara instan, Anda juga dapat menaikkan tingkatan level member secara gratis berdasarkan akumulasi jumlah pemesanan katering yang diselesaikan.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF8C00]">Ketentuan Naik Level Gratis:</h4>
                <div className="space-y-3 text-xs text-white/90">
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="font-semibold">Bronze Tier</span>
                    <span className="font-bold bg-white/20 px-2.5 py-1 rounded-lg">Awal Registrasi</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="font-semibold">Silver Tier</span>
                    <span className="font-bold bg-white/20 px-2.5 py-1 rounded-lg">≥ 6 Pesanan</span>
                  </div>
                  <div className="flex justify-between items-center pb-1">
                    <span className="font-semibold">Gold Tier</span>
                    <span className="font-bold bg-white/20 px-2.5 py-1 rounded-lg">≥ 16 Pesanan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Footer */}
      <footer className="bg-[#0A3D40] text-white/60 text-[11px] font-medium text-center py-8 border-t border-white/5 relative z-10">
        <p>© 2026 NusaCater. All rights reserved. Catering & Event Management Premium Terpercaya.</p>
      </footer>

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

