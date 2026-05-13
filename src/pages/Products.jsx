import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PagesHeader";
import { MdAdd, MdSearch } from "react-icons/md";
import { productsData, categoryColors } from "../data/productsData";

const formatRupiah = (num) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);

export default function Products() {
  const [search, setSearch] = useState("");

  const filtered = productsData.filter(
    (p) =>
      p.nama.toLowerCase().includes(search.toLowerCase()) ||
      p.kode.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.kategori.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div id="products-container">
      <PageHeader title="Daftar Menu Katering" breadcrumb="Products">
        <button className="px-5 py-2.5 bg-[#FF5C00] text-white rounded-xl font-semibold hover:bg-orange-600 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-orange-500/20">
          <MdAdd className="text-lg" />
          Tambah Produk
        </button>
      </PageHeader>

      {/* Search & Summary Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-80">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Cari produk, kode, brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1A1A1A] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5C00]/50 transition-all"
          />
        </div>
        <span className="text-xs text-gray-500 font-semibold tracking-widest">
          Total: <span className="text-[#FF5C00]">{filtered.length}</span> item
        </span>
      </div>

      {/* Tabel */}
      <div className="bg-[#1A1A1A] rounded-[32px] border border-white/5 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto px-4 pb-4">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">
                <th className="p-4 font-bold">Kode</th>
                <th className="p-4 font-bold">Nama Produk</th>
                <th className="p-4 font-bold">Kategori</th>
                <th className="p-4 font-bold">Brand</th>
                <th className="p-4 font-bold text-right">Harga</th>
                <th className="p-4 font-bold text-center">Stok</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500 text-sm">
                    Produk tidak ditemukan.
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr
                    key={p.kode}
                    className="bg-white/[0.02] hover:bg-white/[0.05] transition-all group"
                  >
                    <td className="p-4 text-sm font-bold text-[#FF5C00] first:rounded-l-2xl">
                      {p.kode}
                    </td>
                    <td className="p-4 text-sm font-semibold text-gray-200 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
                          <img src={p.foto} alt={p.nama} className="w-full h-full object-cover" />
                        </div>
                        <Link to={`/products/${p.kode}`} className="hover:text-[#FF5C00] transition-colors cursor-pointer">
                          {p.nama}
                        </Link>
                      </div>
                    </td>
                    <td className="p-4 text-sm">
                      <span className={`px-3 py-1 rounded-xl text-[10px] font-bold uppercase tracking-tight ${categoryColors[p.kategori] ?? "bg-gray-500/10 text-gray-400"}`}>
                        {p.kategori}
                      </span>
                    </td>
                    <td className="p-4 text-sm font-medium text-gray-400">
                      {p.brand}
                    </td>
                    <td className="p-4 text-sm font-bold text-white text-right whitespace-nowrap">
                      {formatRupiah(p.harga)}
                    </td>
                    <td className="p-4 text-sm text-center last:rounded-r-2xl">
                      <span className={`px-3 py-1 rounded-xl text-[10px] font-black ${p.stok < 20 ? "bg-red-500/10 text-red-400" : p.stok < 60 ? "bg-amber-500/10 text-amber-400" : "bg-green-500/10 text-green-400"}`}>
                        {p.stok}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
