import React, { useState, useEffect, useRef } from "react";
import PageHeader from "../components/PagesHeader";
import { 
  Card, 
  Badge, 
  Button,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui";
import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart, 
  CartesianGrid, 
  XAxis, 
  YAxis 
} from "recharts";
import { 
  FaCoins, 
  FaAward, 
  FaTrophy, 
  FaArrowUp, 
  FaFire,
  FaCheckCircle
} from "react-icons/fa";
import { 
  MdRefresh, 
  MdTrendingUp, 
  MdDateRange 
} from "react-icons/md";

// Data Source - Simulated datasets for different timeframes
const datasets = {
  weekly: {
    revenue: [
      { label: "Sen", revenue: 8500000, orders: 24 },
      { label: "Sel", revenue: 9800000, orders: 28 },
      { label: "Rab", revenue: 12500000, orders: 35 },
      { label: "Kam", revenue: 11000000, orders: 31 },
      { label: "Jum", revenue: 15400000, orders: 42 },
      { label: "Sab", revenue: 18200000, orders: 49 },
      { label: "Min", revenue: 20100000, orders: 55 },
    ],
    categories: [
      { name: "Nasi Box", sales: 120, fill: "var(--color-nasibox)" },
      { name: "Buffet", sales: 85, fill: "var(--color-buffet)" },
      { name: "Tumpeng", sales: 32, fill: "var(--color-tumpeng)" },
      { name: "Snack Box", sales: 145, fill: "var(--color-snackbox)" },
    ],
    stats: {
      totalRevenue: "Rp 95.500.000",
      topMenu: "Tumpeng Hias Mini",
      totalOrders: "264",
      growth: "+18.4%"
    }
  },
  monthly: {
    revenue: [
      { label: "Minggu 1", revenue: 45000000, orders: 120 },
      { label: "Minggu 2", revenue: 52000000, orders: 140 },
      { label: "Minggu 3", revenue: 48000000, orders: 130 },
      { label: "Minggu 4", revenue: 61000000, orders: 165 },
    ],
    categories: [
      { name: "Nasi Box", sales: 480, fill: "var(--color-nasibox)" },
      { name: "Buffet", sales: 310, fill: "var(--color-buffet)" },
      { name: "Tumpeng", sales: 95, fill: "var(--color-tumpeng)" },
      { name: "Snack Box", sales: 580, fill: "var(--color-snackbox)" },
    ],
    stats: {
      totalRevenue: "Rp 206.000.000",
      topMenu: "Tumpeng Hias Premium",
      totalOrders: "555",
      growth: "+14.2%"
    }
  },
  yearly: {
    revenue: [
      { label: "Jan", revenue: 120000000, orders: 320 },
      { label: "Feb", revenue: 145000000, orders: 390 },
      { label: "Mar", revenue: 138000000, orders: 370 },
      { label: "Apr", revenue: 165000000, orders: 440 },
      { label: "Mei", revenue: 185000000, orders: 490 },
      { label: "Jun", revenue: 210000000, orders: 560 },
    ],
    categories: [
      { name: "Nasi Box", sales: 2900, fill: "var(--color-nasibox)" },
      { name: "Buffet", sales: 1850, fill: "var(--color-buffet)" },
      { name: "Tumpeng", sales: 580, fill: "var(--color-tumpeng)" },
      { name: "Snack Box", sales: 3400, fill: "var(--color-snackbox)" },
    ],
    stats: {
      totalRevenue: "Rp 963.000.000",
      topMenu: "Paket Prasmanan B",
      totalOrders: "2.570",
      growth: "+22.8%"
    }
  }
};

// Chart config definitions matching CSS custom variables
const revenueChartConfig = {
  revenue: {
    label: "Omset (Rp)",
    color: "#FF5C00",
  },
  orders: {
    label: "Pesanan",
    color: "#10B981",
  }
};

const categoryChartConfig = {
  sales: {
    label: "Porsi Terjual",
    color: "#FF5C00",
  },
  nasibox: {
    label: "Nasi Box",
    color: "#FF5C00",
  },
  buffet: {
    label: "Buffet / Prasmanan",
    color: "#3B82F6",
  },
  tumpeng: {
    label: "Tumpeng Hias",
    color: "#A855F7",
  },
  snackbox: {
    label: "Snack Box",
    color: "#10B981",
  }
};

export default function FiturGacor() {
  const [timeframe, setTimeframe] = useState("monthly");
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // useState: state untuk list catatan performa dan input baru
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("gacor_notes");
    return saved ? JSON.parse(saved) : [
      { id: 1, text: "Omset mingguan naik signifikan berkat pesanan Tumpeng Hias Nusantara.", timestamp: "02/06/2026 14:30" },
      { id: 2, text: "Snack Box Syukuran perlu promo agar mencapai target bulanan.", timestamp: "02/06/2026 16:15" }
    ];
  });
  const [newNote, setNewNote] = useState("");

  // useRef: references untuk DOM manipulation & timer safety
  const noteInputRef = useRef(null);
  const notesEndRef = useRef(null);
  const refreshTimerRef = useRef(null);

  const activeData = datasets[timeframe];

  // useEffect: sinkronisasi Title Document setiap timeframe berubah
  useEffect(() => {
    document.title = `Fitur Gacor (${timeframe.toUpperCase()}) - Catering CRM`;
  }, [timeframe]);

  // useEffect: menyimpan catatan ke localStorage setiap kali notes berubah
  useEffect(() => {
    localStorage.setItem("gacor_notes", JSON.stringify(notes));
  }, [notes]);

  // useEffect: auto scroll ke catatan terbawah setiap kali ada catatan baru
  useEffect(() => {
    notesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [notes]);

  // useRef + useEffect: handle refresh secara aman dari memory leak
  const handleRefresh = () => {
    setIsRefreshing(true);
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
    }
    refreshTimerRef.current = setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  useEffect(() => {
    return () => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }
    };
  }, []);

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    setNotes([...notes, {
      id: Date.now(),
      text: newNote,
      timestamp: formattedDate
    }]);
    setNewNote("");
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  // Helper to format currency labels (e.g. 50.000.000 -> 50jt)
  const formatYAxisCurrency = (val) => {
    if (val >= 1000000) {
      return `${(val / 1000000).toFixed(0)}jt`;
    }
    if (val >= 1000) {
      return `${(val / 1000).toFixed(0)}rb`;
    }
    return val;
  };

  return (
    <div id="dashboard-container" className="p-6 space-y-6">
      {/* Header section with PageHeader and Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader title="Fitur Gacor" breadcrumb="Dashboard / Performa Gacor" />
        
        {/* Timeframe selector & Refresh button */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <div className="flex bg-[#1A1A1A] border border-white/5 rounded-xl p-1">
            {["weekly", "monthly", "yearly"].map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
                  timeframe === t 
                    ? "bg-[#FF5C00] text-white shadow-md" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {t === "weekly" ? "Minggu Ini" : t === "monthly" ? "Bulan Ini" : "Tahun Ini"}
              </button>
            ))}
          </div>

          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center justify-center gap-2 bg-[#1A1A1A] border border-white/5 px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white hover:border-white/10 transition disabled:opacity-50"
          >
            <MdRefresh className={`text-lg ${isRefreshing ? "animate-spin text-[#FF5C00]" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-opacity duration-300 ${isRefreshing ? "opacity-50" : "opacity-100"}`}>
        
        {/* Card 1: Revenue Gacor */}
        <Card className="relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF5C00]/5 rounded-full blur-2xl group-hover:bg-[#FF5C00]/10 transition-all"></div>
          <div className="flex justify-between items-start">
            <div className="bg-[#FF5C00]/10 p-3 rounded-2xl">
              <FaCoins className="text-[#FF5C00] text-xl" />
            </div>
            <Badge variant="primary" className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-0 flex items-center gap-1">
              <FaArrowUp className="text-[10px]" /> {activeData.stats.growth}
            </Badge>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Omset Gacor</p>
            <h3 className="text-3xl font-extrabold text-white mt-1">{activeData.stats.totalRevenue}</h3>
            <p className="text-[11px] text-gray-400 mt-2 flex items-center gap-1">
              <FaCheckCircle className="text-emerald-500" /> Target penjualan tercapai
            </p>
          </div>
        </Card>

        {/* Card 2: Top Selling Menu */}
        <Card className="relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#A855F7]/5 rounded-full blur-2xl group-hover:bg-[#A855F7]/10 transition-all"></div>
          <div className="flex justify-between items-start">
            <div className="bg-[#A855F7]/10 p-3 rounded-2xl">
              <FaTrophy className="text-[#A855F7] text-xl" />
            </div>
            <Badge className="bg-[#A855F7]/20 text-[#C084FC] border-0">Terlaris 🔥</Badge>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Menu Ter-Gacor</p>
            <h3 className="text-2xl font-bold text-white mt-1.5 truncate">{activeData.stats.topMenu}</h3>
            <p className="text-[11px] text-gray-400 mt-3.5">
              Paling banyak diminati pelanggan
            </p>
          </div>
        </Card>

        {/* Card 3: Total Orders */}
        <Card className="relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all"></div>
          <div className="flex justify-between items-start">
            <div className="bg-emerald-500/10 p-3 rounded-2xl">
              <FaAward className="text-emerald-500 text-xl" />
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-400 border-0 flex items-center gap-1">
              <FaFire className="text-orange-500" /> 100% Gacor
            </Badge>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Pesanan Sukses</p>
            <h3 className="text-3xl font-extrabold text-white mt-1">{activeData.stats.totalOrders}</h3>
            <p className="text-[11px] text-gray-400 mt-2">
              Pesanan terselesaikan dengan rating tinggi
            </p>
          </div>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className={`grid grid-cols-1 xl:grid-cols-3 gap-6 transition-opacity duration-300 ${isRefreshing ? "opacity-50" : "opacity-100"}`}>
        
        {/* Left Column - Large Area Chart (Revenue Trend) */}
        <Card className="xl:col-span-2 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="text-lg font-bold text-white">Tren Performa Pendapatan</h4>
              <p className="text-xs text-gray-400 mt-1">Grafik omset dan volume pesanan catering</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
              <MdTrendingUp className="text-[#FF5C00] text-base" />
              <span>Sinyal Gacor Aktif</span>
            </div>
          </div>

          <div className="h-[300px] w-full mt-2">
            <ChartContainer config={revenueChartConfig} className="aspect-auto h-full w-full">
              <AreaChart data={activeData.revenue} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF5C00" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#FF5C00" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="ordersGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="rgba(255, 255, 255, 0.05)" />
                <XAxis 
                  dataKey="label" 
                  tickLine={false} 
                  axisLine={false}
                  tickMargin={10}
                  tickFormatter={(value) => value}
                />
                <YAxis 
                  tickLine={false} 
                  axisLine={false}
                  tickMargin={10}
                  tickFormatter={formatYAxisCurrency}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#FF5C00" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#revenueGrad)" 
                  name="revenue"
                />
                <Area 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#10B981" 
                  strokeWidth={2} 
                  fillOpacity={1} 
                  fill="url(#ordersGrad)" 
                  name="orders"
                  yAxisId={0}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </div>
        </Card>

        {/* Right Column - Bar Chart (Category Sales Breakdown) */}
        <Card className="flex flex-col justify-between">
          <div className="mb-6">
            <h4 className="text-lg font-bold text-white">Distribusi Menu</h4>
            <p className="text-xs text-gray-400 mt-1">Perbandingan porsi terjual per kategori</p>
          </div>

          <div className="h-[300px] w-full flex items-center justify-center">
            <ChartContainer config={categoryChartConfig} className="aspect-auto h-full w-full">
              <BarChart data={activeData.categories} layout="vertical" margin={{ top: 0, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid horizontal={false} stroke="rgba(255, 255, 255, 0.05)" />
                <XAxis type="number" tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} width={80} />
                <ChartTooltip content={<ChartTooltipContent hideIndicator={true} />} />
                <Bar 
                  dataKey="sales" 
                  radius={[0, 8, 8, 0]}
                  name="sales"
                />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </div>
        </Card>
      </div>

      {/* Top 4 Gacor Menus Detail Table / Progress Bars */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h4 className="text-lg font-bold text-white">Target Pencapaian Menu Gacor</h4>
            <p className="text-xs text-gray-400 mt-1">Analisis performa produk menu catering terhadap target mingguan</p>
          </div>
          <Badge className="bg-[#FF5C00]/10 text-[#FF5C00] border border-[#FF5C00]/20 flex items-center gap-1">
            <FaFire className="animate-pulse" /> Live Stats
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Progress 1 */}
          <div className="space-y-2 bg-white/[0.01] border border-white/5 rounded-2xl p-4 hover:bg-white/[0.02] transition">
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-white">Tumpeng Hias Nusantara</span>
              <span className="font-mono font-bold text-[#FF5C00]">92%</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-2">
              <div className="bg-gradient-to-r from-amber-500 to-[#FF5C00] h-2 rounded-full shadow-[0_0_8px_#FF5C00]" style={{ width: "92%" }}></div>
            </div>
            <div className="flex justify-between items-center text-[10px] text-gray-400 mt-1">
              <span>95 dari 100 Porsi Target</span>
              <span className="text-emerald-500">+12% Hari ini</span>
            </div>
          </div>

          {/* Progress 2 */}
          <div className="space-y-2 bg-white/[0.01] border border-white/5 rounded-2xl p-4 hover:bg-white/[0.02] transition">
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-white">Paket Nasi Box A</span>
              <span className="font-mono font-bold text-blue-500">85%</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-2">
              <div className="bg-gradient-to-r from-[#3B82F6] to-sky-400 h-2 rounded-full shadow-[0_0_8px_#3B82F6]" style={{ width: "85%" }}></div>
            </div>
            <div className="flex justify-between items-center text-[10px] text-gray-400 mt-1">
              <span>480 dari 560 Porsi Target</span>
              <span className="text-emerald-500">+8% Hari ini</span>
            </div>
          </div>

          {/* Progress 3 */}
          <div className="space-y-2 bg-white/[0.01] border border-white/5 rounded-2xl p-4 hover:bg-white/[0.02] transition">
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-white">Prasmanan Spesial Nusantara</span>
              <span className="font-mono font-bold text-purple-500">76%</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-2">
              <div className="bg-gradient-to-r from-[#A855F7] to-fuchsia-400 h-2 rounded-full shadow-[0_0_8px_#A855F7]" style={{ width: "76%" }}></div>
            </div>
            <div className="flex justify-between items-center text-[10px] text-gray-400 mt-1">
              <span>310 dari 400 Porsi Target</span>
              <span className="text-emerald-500">+15% Hari ini</span>
            </div>
          </div>

          {/* Progress 4 */}
          <div className="space-y-2 bg-white/[0.01] border border-white/5 rounded-2xl p-4 hover:bg-white/[0.02] transition">
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-white">Snack Box Syukuran</span>
              <span className="font-mono font-bold text-emerald-500">68%</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-2">
              <div className="bg-gradient-to-r from-[#10B981] to-teal-400 h-2 rounded-full shadow-[0_0_8px_#10B981]" style={{ width: "68%" }}></div>
            </div>
            <div className="flex justify-between items-center text-[10px] text-gray-400 mt-1">
              <span>580 dari 850 Porsi Target</span>
              <span className="text-emerald-500">+4% Hari ini</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Card: Catatan & Aktivitas Gacor (Implementasi useState, useEffect, useRef) */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h4 className="text-lg font-bold text-white">Log Aktivitas & Catatan Insight Gacor</h4>
            <p className="text-xs text-gray-400 mt-1">Mencatat insight performa catering menggunakan kombinasi useState, useEffect, dan useRef</p>
          </div>
          <button
            onClick={() => noteInputRef.current?.focus()}
            className="text-xs font-semibold text-[#FF5C00] hover:underline bg-[#FF5C00]/10 px-3 py-1.5 rounded-lg border border-[#FF5C00]/20 cursor-pointer"
          >
            Fokus ke Input Catatan
          </button>
        </div>

        {/* List of Notes */}
        <div className="max-h-48 overflow-y-auto space-y-3 mb-4 pr-2 custom-scrollbar">
          {notes.map((note) => (
            <div key={note.id} className="bg-white/[0.02] border border-white/5 rounded-xl p-3 flex justify-between items-start gap-4">
              <div>
                <p className="text-sm text-gray-200">{note.text}</p>
                <span className="text-[10px] text-gray-500 mt-1 block">{note.timestamp}</span>
              </div>
              <button 
                onClick={() => handleDeleteNote(note.id)}
                className="text-xs text-red-500 hover:text-red-400 transition cursor-pointer"
              >
                Hapus
              </button>
            </div>
          ))}
          {notes.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">Belum ada catatan performa. Tulis catatan pertama Anda di bawah!</p>
          )}
          <div ref={notesEndRef} />
        </div>

        {/* Add Note Form */}
        <div className="flex gap-2">
          <input
            ref={noteInputRef}
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddNote()}
            placeholder="Tulis insight performa di sini..."
            className="flex-1 bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#FF5C00] transition"
          />
          <button
            onClick={handleAddNote}
            className="bg-[#FF5C00] hover:bg-[#ff7a30] text-white text-sm font-semibold px-4 py-2 rounded-xl transition cursor-pointer"
          >
            Tambah Catatan
          </button>
        </div>
      </Card>
    </div>
  );
}

