import { useParams, useNavigate } from "react-router-dom";
import { productsData, categoryColors } from "../data/productsData";
import PageHeader from "../components/PagesHeader";
import { MdArrowBack, MdInventory, MdCategory, MdOutlineBrandingWatermark, MdAttachMoney } from "react-icons/md";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = productsData.find((p) => p.kode === id);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-white">
        <h2 className="text-2xl font-bold mb-4">Produk tidak ditemukan</h2>
        <button 
          onClick={() => navigate("/products")}
          className="flex items-center gap-2 px-4 py-2 bg-[#FF5C00] rounded-lg hover:bg-orange-600 transition-all"
        >
          <MdArrowBack /> Kembali ke Daftar Produk
        </button>
      </div>
    );
  }

  const formatRupiah = (num) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="Detail Produk" breadcrumb={`Products / ${product.nama}`}>
        <button 
          onClick={() => navigate("/products")}
          className="px-4 py-2 bg-white/5 text-white rounded-xl font-medium hover:bg-white/10 transition-all flex items-center gap-2 border border-white/10"
        >
          <MdArrowBack className="text-lg" />
          Kembali
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Left: Product Image */}
        <div className="lg:col-span-5">
          <div className="bg-[#1A1A1A] rounded-[32px] p-4 border border-white/5 shadow-2xl overflow-hidden group">
            <div className="aspect-square rounded-[24px] overflow-hidden relative">
              <img 
                src={product.foto} 
                alt={product.nama} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <span className="text-white font-medium text-sm">Preview Produk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#1A1A1A] rounded-[32px] p-8 border border-white/5 shadow-2xl space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${categoryColors[product.kategori]}`}>
                  {product.kategori}
                </span>
                <span className="text-gray-500 text-xs font-medium">Kode: {product.kode}</span>
              </div>
              <h1 className="text-3xl font-black text-white tracking-tight">{product.nama}</h1>
              <p className="text-gray-400 mt-4 leading-relaxed">
                {product.deskripsi}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 text-gray-500 mb-1 text-xs uppercase font-bold tracking-widest">
                  <MdOutlineBrandingWatermark className="text-[#FF5C00]" />
                  Brand
                </div>
                <div className="text-white font-semibold">{product.brand}</div>
              </div>
              <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 text-gray-500 mb-1 text-xs uppercase font-bold tracking-widest">
                  <MdInventory className="text-[#FF5C00]" />
                  Stok Tersedia
                </div>
                <div className="text-white font-semibold">{product.stok} unit</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#FF5C00]/20 to-transparent p-6 rounded-[24px] border border-[#FF5C00]/20 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#FF5C00] mb-1 text-xs uppercase font-black tracking-widest">
                  <MdAttachMoney className="text-lg" />
                  Harga Per Porsi
                </div>
                <div className="text-3xl font-black text-white">{formatRupiah(product.harga)}</div>
              </div>
              <button className="px-8 py-4 bg-[#FF5C00] text-white rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 active:scale-95">
                Pesan Sekarang
              </button>
            </div>
          </div>

          {/* Additional Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#1A1A1A] p-6 rounded-[24px] border border-white/5">
              <h3 className="text-white font-bold mb-2">Informasi Gizi</h3>
              <p className="text-sm text-gray-500">Mengandung nutrisi seimbang untuk kebutuhan harian Anda.</p>
            </div>
            <div className="bg-[#1A1A1A] p-6 rounded-[24px] border border-white/5">
              <h3 className="text-white font-bold mb-2">Waktu Masak</h3>
              <p className="text-sm text-gray-500">Estimasi persiapan dan pengiriman 30-45 menit.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
