import PageHeader from "../components/PagesHeader";

const ordersData = Array.from({ length: 30 }, (_, i) => ({
  id: `#ORD-${5001 + i}`,
  customer: ["Andi Wijaya", "Rina Rose", "Eko Prasetyo", "Maya Putri", "Gani Malik"][i % 5],
  menu: ["Paket Nasi Box A", "Paket Prasmanan", "Paket Snack Box", "Paket Tumpeng", "Paket Nasi Box B"][i % 5],
  status: ["Pending", "Completed", "Cancelled"][i % 3],
  total: (Math.random() * 2000000 + 200000).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  }),
  date: `2024-03-${(i % 28 + 1).toString().padStart(2, "0")}`,
}));

export default function Orders() {
  return (
    <div id="dashboard-container">
      <PageHeader title="Orders" breadcrumb="Sales Report" />

      {/* Container Tabel: Background Dark Card */}
      <div className="mt-6 bg-[#1A1A1A] rounded-[32px] border border-white/5 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto px-4 pb-4">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">
                <th className="p-4 font-bold">Order ID</th>
                <th className="p-4 font-bold">Customer</th>
                <th className="p-4 font-bold">Paket Menu</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold">Total Price</th>
                <th className="p-4 font-bold">Date</th>
              </tr>
            </thead>
            <tbody>
              {ordersData.map((order) => (
                <tr
                  key={order.id}
                  className="bg-white/[0.02] hover:bg-white/[0.05] transition-all group"
                >
                  {/* Order ID dengan warna Oranye Brand */}
                  <td className="p-4 text-sm font-bold text-[#FF5C00] first:rounded-l-2xl">
                    {order.id}
                  </td>
                  <td className="p-4 text-sm font-semibold text-gray-200">
                    {order.customer}
                  </td>
                  <td className="p-4 text-sm text-gray-400">
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
                  <td className="p-4 text-sm font-bold text-white">
                    {order.total}
                  </td>
                  <td className="p-4 text-sm text-gray-500 last:rounded-r-2xl">
                    {order.date}
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
