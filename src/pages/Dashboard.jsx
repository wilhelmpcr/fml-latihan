import { FaShoppingCart, FaTruck, FaUtensils, FaUsers } from "react-icons/fa";
import { MdTrendingUp, MdRefresh } from "react-icons/md"; // Tambah MdRefresh agar mirip referensi
import PagesHeader from "../components/PagesHeader";

const statCards = [
  {
    icon: FaShoppingCart,
    iconBg: "bg-oranye",
    label: "Total Pesanan",
    value: "75",
    growth: "+23%",
    color: "#FF5C00",
  },
  {
    icon: FaTruck,
    iconBg: "bg-blue-500",
    label: "Total Terkirim",
    value: "175",
    growth: "+8%",
    color: "#3B82F6",
  },
  {
    icon: FaUtensils,
    iconBg: "bg-amber-500",
    label: "Paket Catering",
    value: "24",
    growth: "+18%",
    color: "#F59E0B",
  },
  {
    icon: FaUsers,
    iconBg: "bg-purple-500",
    label: "Total Pelanggan",
    value: "1,240",
    growth: "+12%",
    color: "#A855F7",
  },
];

const recentOrders = [
  {
    id: "#ORD-5001",
    customer: "Andi Wijaya",
    menu: "Paket Nasi Box A",
    status: "Completed",
    total: "Rp 450.000",
  },
  {
    id: "#ORD-5002",
    customer: "Rina Rose",
    menu: "Paket Prasmanan",
    status: "Pending",
    total: "Rp 2.500.000",
  },
  {
    id: "#ORD-5003",
    customer: "Eko Prasetyo",
    menu: "Paket Nasi Box B",
    status: "Completed",
    total: "Rp 750.000",
  },
  {
    id: "#ORD-5004",
    customer: "Maya Putri",
    menu: "Paket Snack Box",
    status: "Cancelled",
    total: "Rp 300.000",
  },
  {
    id: "#ORD-5005",
    customer: "Gani Malik",
    menu: "Paket Tumpeng",
    status: "Pending",
    total: "Rp 1.200.000",
  },
];

export default function Dashboard() {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <PagesHeader title="Dashboard" />
        <button className="flex items-center gap-2 bg-dark-card border border-garis px-4 py-2 rounded-xl text-xs font-semibold text-teks-samping hover:text-white transition">
          <MdRefresh className="text-lg" /> Refresh
        </button>
      </div>

      {/* Greeting Banner - Diubah jadi Dark Card dengan aksen oranye */}
      <div className="mt-4 mb-8 bg-dark-card border border-garis rounded-[32px] p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-oranye/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
        <div className="flex items-center justify-between relative z-10">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Selamat Datang, Wilhelm 👨‍🍳
            </h1>
            <p className="text-teks-samping mt-2">
              Kelola pesanan catering Anda hari ini dengan efisien.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-oranye px-6 py-3 rounded-2xl shadow-[0_10px_20px_rgba(255,92,0,0.2)]">
            <MdTrendingUp className="text-white text-2xl" />
            <span className="text-sm font-bold text-white">Performa Baik!</span>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="bg-dark-card p-6 rounded-[32px] border border-garis hover:border-white/20 transition-all group overflow-hidden relative"
            >
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors"></div>
              
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`${card.iconBg} p-3 rounded-2xl shadow-lg`}>
                  <Icon className="text-white text-xl" />
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black px-2 py-1 rounded-lg bg-green-500/10 text-green-500 mb-2">
                    {card.growth}
                  </span>
                  {/* Mini Sparkline SVG with Glow */}
                  <svg className="w-16 h-8 overflow-visible" viewBox="0 0 100 40">
                    {/* Shadow Glow */}
                    <path
                      d="M0 35 Q 10 35, 20 25 T 40 28 T 60 15 T 80 20 T 100 5"
                      fill="none"
                      stroke={card.color}
                      strokeWidth="6"
                      strokeLinecap="round"
                      className="opacity-20 blur-[2px]"
                    />
                    {/* Main Path */}
                    <path
                      d="M0 35 Q 10 35, 20 25 T 40 28 T 60 15 T 80 20 T 100 5"
                      fill="none"
                      stroke={card.color}
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
              
              <div className="relative z-10">
                <p className="text-teks-samping text-xs font-semibold uppercase tracking-wider">
                  {card.label}
                </p>
                <h3 className="text-4xl font-bold text-white mt-1 group-hover:scale-105 transition-transform origin-left">
                  {card.value}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-dark-card rounded-[32px] border border-garis overflow-hidden">
        <div className="p-7 border-b border-garis flex items-center justify-between">
          <div>
            <h2 className="font-bold text-xl text-white">Pesanan Terbaru</h2>
            <p className="text-xs text-teks-samping mt-1">
              Pantau arus pesanan catering yang masuk
            </p>
          </div>
        </div>
        <div className="overflow-x-auto px-4 pb-4">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-[10px] text-teks-samping/50 uppercase tracking-[0.2em]">
                <th className="p-4 font-bold">ID Pesanan</th>
                <th className="p-4 font-bold">Pelanggan</th>
                <th className="p-4 font-bold">Paket</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="bg-white/[0.02] hover:bg-white/[0.05] transition-all rounded-2xl group"
                >
                  <td className="p-4 text-sm font-bold text-oranye first:rounded-l-2xl">
                    {order.id}
                  </td>
                  <td className="p-4 text-sm font-semibold text-gray-200">
                    {order.customer}
                  </td>
                  <td className="p-4 text-sm text-teks-samping">
                    {order.menu}
                  </td>
                  <td className="p-4 text-sm">
                    <span
                      className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tighter ${
                        order.status === "Completed"
                          ? "bg-green-500/10 text-green-500"
                          : order.status === "Pending"
                            ? "bg-amber-500/10 text-amber-500"
                            : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-bold text-white text-right last:rounded-r-2xl">
                    {order.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
