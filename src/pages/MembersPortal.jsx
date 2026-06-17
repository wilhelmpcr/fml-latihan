import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { ImSpinner2 } from "react-icons/im";
import { 
  FaCrown, 
  FaGem, 
  FaAward, 
  FaSearch, 
  FaArrowLeft, 
  FaEnvelope, 
  FaPhoneAlt,
  FaPercentage,
  FaShippingFast,
  FaUtensils
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MembersPortal() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  // Coba memuat otomatis jika ada user biasa yang sedang masuk
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (currentUser && currentUser.role === "user") {
      setMember(currentUser);
      setSearched(true);
    }
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError("");
    setMember(null);
    setSearched(true);

    try {
      const { data, error: queryError } = await supabase
        .from("users")
        .select("*")
        .eq("role", "user")
        .or(`username.eq.${searchQuery.trim()},email.eq.${searchQuery.trim().toLowerCase()}`)
        .maybeSingle();

      if (queryError) throw queryError;

      if (!data) {
        setError("Member tidak ditemukan. Pastikan Username atau Email Anda benar!");
      } else {
        setMember(data);
      }
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat mencari member.");
    } finally {
      setLoading(false);
    }
  };

  const loyalty = member?.loyalty || "Bronze";
  const orders = member?.orders || 0;

  // Konfigurasi visual berdasarkan tier loyalitas
  let cardGradient = "from-[#805A36] via-[#A67C52] to-[#CBA37B] border-[#A67C52]/20"; // Bronze
  let tierIcon = <FaAward className="text-orange-300 text-2xl" />;
  let badgeStyle = "bg-orange-500/20 text-orange-400 border-orange-500/30";
  let progressText = "";
  let progressPercent = 0;

  if (loyalty === "Gold") {
    cardGradient = "from-[#b8860b] via-[#DAA520] to-[#ffd700] border-[#ffd700]/30 shadow-[0_20px_40px_rgba(218,165,32,0.25)]";
    tierIcon = <FaCrown className="text-yellow-300 drop-shadow-[0_0_12px_rgba(255,215,0,0.6)] animate-bounce" />;
    badgeStyle = "bg-yellow-500/25 text-yellow-300 border-yellow-500/40";
    progressText = "Maksimal Tier Tercapai! 👑";
    progressPercent = 100;
  } else if (loyalty === "Silver") {
    cardGradient = "from-[#636e72] via-[#b2bec3] to-[#dfe6e9] border-white/15 shadow-[0_20px_40px_rgba(178,190,195,0.15)]";
    tierIcon = <FaGem className="text-sky-200" />;
    badgeStyle = "bg-slate-400/20 text-slate-300 border-slate-400/30";
    progressText = `${16 - orders} pesanan lagi menuju Gold Tier 👑`;
    progressPercent = ((orders - 6) / 10) * 100;
    if (progressPercent < 0) progressPercent = 0;
    if (progressPercent > 100) progressPercent = 100;
  } else {
    // Bronze
    progressText = `${6 - orders} pesanan lagi menuju Silver Tier 🥈`;
    progressPercent = (orders / 6) * 100;
    if (progressPercent > 100) progressPercent = 100;
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-poppins">
      {/* Background Decorative Blobs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-[#FF5C00]/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-lg z-10 space-y-8">
        {/* Top Navbar Row */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate("/guest")}
            className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Kembali ke Beranda
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-xs tracking-[0.2em] font-black text-white font-mono">NUSACATER</span>
            <span className="text-[#FF5C00] font-black text-base">.</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            NusaCater Member Club
          </h1>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            Masukkan Username atau Email terdaftar untuk memeriksa status keanggotaan Anda.
          </p>
        </div>

        {/* Search Box */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Username atau Email Member..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#1A1A1A] border border-white/5 p-4 pr-12 text-white w-full rounded-2xl outline-none focus:border-[#FF5C00] transition-all text-sm placeholder-white/20 shadow-inner"
            />
            <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-[#FF8C00] to-[#FF5C00] hover:brightness-110 text-white font-bold px-6 py-4 rounded-2xl transition duration-300 disabled:opacity-50 flex items-center justify-center cursor-pointer shadow-[0_10px_20px_rgba(255,92,0,0.15)]"
          >
            {loading ? <ImSpinner2 className="animate-spin text-lg" /> : "Cari"}
          </button>
        </form>

        {/* Result Container */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-10 gap-3">
            <ImSpinner2 className="animate-spin text-[#FF5C00] text-3xl" />
            <span className="text-xs text-gray-500">Mencari kartu member...</span>
          </div>
        )}

        {searched && !loading && error && (
          <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-2xl text-xs text-red-400 text-center font-medium leading-relaxed">
            {error}
          </div>
        )}

        {searched && !loading && member && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            {/* Kartu Member Glassmorphic */}
            <div className={`relative h-64 rounded-3xl bg-gradient-to-br ${cardGradient} p-7 overflow-hidden flex flex-col justify-between border shadow-2xl group`}>
              {/* Shine Overlay */}
              <div className="absolute inset-0 bg-white/5 backdrop-blur-[0.5px]"></div>
              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-105 transition-transform duration-500"></div>

              {/* Chip & Logo */}
              <div className="relative z-10 flex justify-between items-start">
                {/* Gold Chip */}
                <div className="w-12 h-9 bg-gradient-to-br from-amber-400 to-amber-200 rounded-lg border border-amber-600/30 relative overflow-hidden p-1 shadow-inner">
                  <div className="grid grid-cols-3 gap-0.5 w-full h-full opacity-60">
                    <div className="border border-amber-800/30 rounded-[1px]"></div>
                    <div className="border border-amber-800/30 rounded-[1px]"></div>
                    <div className="border border-amber-800/30 rounded-[1px]"></div>
                    <div className="border border-amber-800/30 rounded-[1px]"></div>
                    <div className="border border-amber-800/30 rounded-[1px]"></div>
                    <div className="border border-amber-800/30 rounded-[1px]"></div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-white">
                  <span className="text-xs tracking-[0.35em] font-black font-mono opacity-80">NUSACATER</span>
                  <div>{tierIcon}</div>
                </div>
              </div>

              {/* Card Number */}
              <div className="relative z-10">
                <p className="text-[9px] text-white/50 tracking-[0.2em] font-mono uppercase">MEMBERSHIP NUMBER</p>
                <p className="text-xl font-bold font-mono tracking-widest text-white mt-1">
                  NC-MEM-{member.username ? member.username.toUpperCase() : member.id.substring(0, 5).toUpperCase()}
                </p>
              </div>

              {/* Bottom Row */}
              <div className="relative z-10 flex justify-between items-end">
                <div>
                  <p className="text-[8px] text-white/50 uppercase tracking-widest">Card Holder</p>
                  <p className="text-sm font-bold text-white tracking-wide mt-0.5">{member.name}</p>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-lg text-[9px] font-black border uppercase tracking-widest ${badgeStyle}`}>
                    {loyalty} TIER
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Bar & Details */}
            <div className="bg-[#1A1A1A]/60 border border-white/5 rounded-3xl p-6 space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Total Transaksi: <strong className="text-white font-bold">{orders}x</strong> Pesanan</span>
                <span className="text-[10px] text-[#FF5C00] font-bold bg-[#FF5C00]/10 px-3 py-1 rounded-xl border border-[#FF5C00]/25">
                  {progressText}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div 
                  className={`h-full rounded-full transition-all duration-700 bg-gradient-to-r ${
                    loyalty === "Gold" 
                      ? "from-yellow-500 to-amber-500" 
                      : loyalty === "Silver" 
                      ? "from-slate-400 to-sky-300" 
                      : "from-orange-500 to-[#FF5C00]"
                  }`}
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>

              {/* Benefit Tiers List */}
              <div className="pt-4 border-t border-white/5 space-y-3">
                <h3 className="text-xs font-bold text-gray-300 uppercase tracking-widest">Benefit Level Anda:</h3>
                
                <div className="grid grid-cols-1 gap-2.5 text-xs text-gray-400">
                  <div className={`flex items-start gap-3 p-3 rounded-2xl border transition-all ${
                    loyalty === "Bronze" ? "bg-orange-500/5 border-orange-500/20 text-orange-200" : "bg-[#111]/30 border-white/5"
                  }`}>
                    <FaPercentage className="mt-0.5 text-[#FF5C00] text-sm flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-white mb-0.5">Bronze Benefit</h4>
                      <p className="text-[11px] leading-relaxed">Diskon 5% untuk setiap pemesanan katering harian.</p>
                    </div>
                  </div>

                  <div className={`flex items-start gap-3 p-3 rounded-2xl border transition-all ${
                    loyalty === "Silver" ? "bg-slate-400/5 border-slate-400/20 text-slate-200" : "bg-[#111]/30 border-white/5"
                  }`}>
                    <FaUtensils className="mt-0.5 text-slate-400 text-sm flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-white mb-0.5">Silver Benefit</h4>
                      <p className="text-[11px] leading-relaxed">Diskon 10% untuk semua jenis pesanan + prioritas reservasi menu.</p>
                    </div>
                  </div>

                  <div className={`flex items-start gap-3 p-3 rounded-2xl border transition-all ${
                    loyalty === "Gold" ? "bg-amber-500/5 border-amber-500/20 text-amber-200" : "bg-[#111]/30 border-white/5"
                  }`}>
                    <FaShippingFast className="mt-0.5 text-amber-500 text-sm flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-white mb-0.5">Gold Benefit 👑</h4>
                      <p className="text-[11px] leading-relaxed">Diskon 15% untuk semua pesanan + Gratis Ongkos Kirim + Menu Premium Eksklusif gratis.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Kontak */}
              <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-2 text-xs text-gray-500 font-mono">
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-[10px]" />
                  <span className="truncate">{member.email}</span>
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <FaPhoneAlt className="text-[10px]" />
                  <span>{member.phone || "-"}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
