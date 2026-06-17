import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../context/ThemeContext";

export default function MainLayout() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      navigate("/guest");
    }
  }, [navigate]);

  const isLight = theme === "light";

  return (
    <div
      className={`flex min-h-screen font-poppins transition-colors duration-300 ${
        isLight ? "bg-[#F0F2F5] text-gray-900" : "bg-[#0F0F0F] text-white"
      }`}
    >
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
