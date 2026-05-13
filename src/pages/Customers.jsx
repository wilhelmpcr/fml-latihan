import PageHeader from "../components/PagesHeader";

const customersData = Array.from({ length: 30 }, (_, i) => ({
  id: `CUS-${1001 + i}`,
  name:
    ["Ahmad Fauzi", "Siti Aminah", "Budi Santoso", "Dewi Lestari", "Rian Hidayat"][i % 5] +
    ` ${i + 1}`,
  email: `user${i + 1}@example.com`,
  phone: `0812-3456-78${i.toString().padStart(2, "0")}`,
  loyalty: ["Bronze", "Silver", "Gold"][i % 3],
  orders: Math.floor(Math.random() * 20) + 1,
}));

export default function Customers() {
  return (
    <div id="dashboard-container">
      <PageHeader title="Customers" breadcrumb="Management" />

      {/* Container Tabel: Background Dark Card */}
      <div className="mt-6 bg-[#1A1A1A] rounded-[32px] border border-white/5 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto px-4 pb-4">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">
                <th className="p-4 font-bold">Customer ID</th>
                <th className="p-4 font-bold">Name</th>
                <th className="p-4 font-bold">Contact Info</th>
                <th className="p-4 font-bold">Total Order</th>
                <th className="p-4 font-bold">Loyalty</th>
              </tr>
            </thead>
            <tbody>
              {customersData.map((cus) => (
                <tr
                  key={cus.id}
                  className="bg-white/[0.02] hover:bg-white/[0.05] transition-all group"
                >
                  {/* Customer ID dengan aksen Oranye */}
                  <td className="p-4 text-sm font-bold text-[#FF5C00] first:rounded-l-2xl">
                    {cus.id}
                  </td>
                  <td className="p-4 text-sm font-bold text-gray-200">
                    {cus.name}
                  </td>
                  <td className="p-4 text-sm">
                    <div className="text-gray-300">{cus.email}</div>
                    <div className="text-xs text-gray-500">{cus.phone}</div>
                  </td>
                  <td className="p-4 text-sm text-gray-400 font-medium">
                    {cus.orders}x
                  </td>
                  <td className="p-4 text-sm last:rounded-r-2xl">
                    <span
                      className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tighter ${
                        cus.loyalty === "Gold"
                          ? "bg-amber-500/10 text-amber-500"
                          : cus.loyalty === "Silver"
                          ? "bg-slate-400/10 text-slate-400"
                          : "bg-orange-500/10 text-orange-400"
                      }`}
                    >
                      {cus.loyalty}
                    </span>
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
