import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  return (
    // Gunakan bg-[#0F0F0F] untuk memaksa warna hitam jika config belum terbaca
    <div className="flex min-h-screen bg-[#0F0F0F] text-white font-poppins">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
