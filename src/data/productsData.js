export const categories = ["Nasi Kotak", "Main Course", "Prasmanan", "Camilan", "Snack", "Beverage", "Dessert", "Vegetable", "Soup", "Cubukan"];
export const brands = ["Dapur Sedap", "Madura Asli", "Sedap Snack", "Minuman Segar", "Sedap Dessert", "Sehat Selalu", "Fresh Seafood", "Spesial Kambing", "Malang Jaya"];

export const productsData = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  kode: `CAT${String(i + 1).padStart(3, "0")}`,
  nama: [
    "Nasi Box Ayam Bakar",
    "Paket Prasmanan Lengkap",
    "Nasi Kotak Rendang",
    "Camilan Keripik Tempe",
    "Snack Box Mini",
    "Snack Box Premium",
    "Es Teh Tarik",
    "Puding Cokelat",
    "Nasi Kotak Ikan Bakar",
    "Tumis Kangkung Spesial",
    "Sop Buntut Sapi",
    "Ikan Bakar Bumbu Bali",
    "Gado-Gado Spesial",
    "Sate Kambing Madura",
    "Nasi Uduk Betawi",
    "Mie Goreng Spesial",
    "Es Campur Segar",
    "Klepon Premium",
    "Rawon Surabaya",
    "Sayur Lodeh Komplit",
    "Sup Ayam Jahe",
    "Paket Tumpeng Mini",
    "Soto Betawi",
    "Lontong Cap Go Meh",
    "Gudeg Jogja",
    "Bebek Goreng Renyah",
    "Cendol Dawet",
    "Ayam Geprek Level 5",
    "Pecel Madiun",
    "Bakso Malang Spesial",
  ][i],
  kategori: categories[i % categories.length],
  brand: brands[i % brands.length],
  harga: [35000, 45000, 60000, 30000, 15000, 25000, 12000, 10000, 28000, 22000, 38000, 75000, 25000, 20000, 18000, 22000, 8000, 15000, 40000, 18000, 32000, 150000, 35000, 50000, 28000, 45000, 12000, 25000, 20000, 35000][i],
  stok: [500, 50, 40, 200, 380, 180, 80, 120, 50, 60, 45, 30, 5, 190, 250, 170, 300, 200, 80, 150, 100, 25, 90, 40, 60, 35, 200, 120, 180, 75][i],
  foto: `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800`, // Placeholder food image
  deskripsi: "Hidangan lezat yang disiapkan dengan bahan-bahan pilihan berkualitas tinggi untuk menjamin cita rasa yang autentik dan memuaskan."
}));

export const categoryColors = {
  "Nasi Kotak": "bg-amber-500/10 text-amber-400",
  "Main Course": "bg-blue-500/10 text-blue-400",
  "Prasmanan": "bg-purple-500/10 text-purple-400",
  "Camilan": "bg-pink-500/10 text-pink-400",
  "Snack": "bg-green-500/10 text-green-400",
  "Beverage": "bg-cyan-500/10 text-cyan-400",
  "Dessert": "bg-rose-500/10 text-rose-400",
  "Vegetable": "bg-lime-500/10 text-lime-400",
  "Soup": "bg-orange-500/10 text-orange-400",
  "Cubukan": "bg-violet-500/10 text-violet-400",
};
