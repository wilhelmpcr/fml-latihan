import {
  MdDashboard,
  MdAdd,
  MdErrorOutline,
  MdRestaurantMenu,
  MdLogout,
  MdStorefront,
} from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";
import { GiChefToque } from "react-icons/gi";

export default function Sidebar() {
  const navigate = useNavigate();

  // Variabel menus harus didefinisikan di dalam fungsi Sidebar
  const menus = [
    { id: "menu-1", name: "Dashboard", icon: MdDashboard, path: "/" },
    {
      id: "menu-2",
      name: "Orders",
      icon: AiOutlineShoppingCart,
      path: "/orders",
    },
    {
      id: "menu-3",
      name: "Customers",
      icon: HiOutlineUserGroup,
      path: "/customers",
    },
    {
      id: "menu-4",
      name: "Products",
      icon: MdStorefront,
      path: "/products",
    },
    {
      id: "menu-5",
      name: "Error 400",
      icon: MdErrorOutline,
      path: "/error-400",
    },
    {
      id: "menu-6",
      name: "Error 401",
      icon: MdErrorOutline,
      path: "/error-401",
    },
    {
      id: "menu-7",
      name: "Error 403",
      icon: MdErrorOutline,
      path: "/error-403",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen w-72 bg-dark-card border-r border-garis sticky top-0">
      {/* Logo */}
      <div className="p-8 border-b border-garis">
        <div className="flex items-center gap-3">
          <div className="bg-oranye p-2 rounded-xl shadow-[0_0_15px_rgba(255,92,0,0.3)]">
            <MdRestaurantMenu className="text-white text-2xl" />
          </div>
          <div>
            <div className="flex items-baseline">
              <span className="font-poppins text-2xl font-bold text-white">
                NusaCater
              </span>
              <span className="text-oranye text-2xl font-bold">.</span>
            </div>
            <span className="text-[10px] text-teks-samping font-semibold tracking-[0.2em]">
              CATERING DASHBOARD
            </span>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 px-4 py-8 overflow-y-auto">
        <p className="text-[10px] font-bold text-teks-samping/50 px-4 mb-6 tracking-[0.2em]">
          MAIN MENU
        </p>

        <ul className="space-y-2">
          {menus.map((menu) => {
            const Icon = menu.icon;
            return (
              <li key={menu.id}>
                <NavLink
                  to={menu.path}
                  className={({ isActive }) =>
                    `flex items-center rounded-xl p-4 font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-oranye/10 text-oranye shadow-[inset_4px_0_0_0_#FF5C00]"
                        : "text-teks-samping hover:bg-white/5 hover:text-white"
                    }`
                  }
                >
                  <Icon className="mr-4 text-xl" />
                  {menu.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-garis">
        <div className="bg-gradient-to-br from-oranye to-[#ff8c00] rounded-3xl p-5 shadow-lg relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>

          <div className="flex items-center gap-2 mb-2 relative">
            <GiChefToque className="text-white text-xl" />
            <p className="text-white text-sm font-semibold">
              Tambah Menu Baru!
            </p>
          </div>
          <p className="text-white/80 text-[11px] mb-4 relative">
            Kelola paket catering dengan mudah
          </p>

          {/* Tombol yang diperbaiki: ganti text-white menjadi text-oranye */}
          <button className="w-full bg-white text-[#FF5C00] rounded-xl py-2.5 font-bold text-xs hover:bg-gray-100 transition-all flex items-center justify-center gap-2 relative z-10 shadow-sm">
            <MdAdd className="text-lg text-[#FF5C00]" />
            Tambah Paket
          </button>
        </div>

        <button
          onClick={() => navigate("/login")}
          className="mt-4 w-full flex items-center justify-center gap-2 p-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all font-semibold"
        >
          <MdLogout className="text-xl" />
          Logout
        </button>
      </div>
    </div>
  );
}
