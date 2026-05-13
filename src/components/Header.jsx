import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";

export default function Header() {
  return (
    <div className="flex justify-between items-center p-6 bg-dark-bg/50 backdrop-blur-md border-b border-garis sticky top-0 z-50">
      {/* Search Bar */}
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          placeholder="Search Here..."
          className="bg-dark-card border border-garis p-3 pr-10 text-white w-full rounded-2xl outline-none focus:border-oranye/50 transition-all text-sm"
        />
        <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-teks-samping" />
      </div>

      {/* Icon & Profile Section */}
      <div className="flex items-center space-x-6">
        <div className="flex space-x-3">
          {[FaBell, FcAreaChart, SlSettings].map((Icon, i) => (
            <div key={i} className="p-3 bg-dark-card border border-garis rounded-xl text-teks-samping cursor-pointer hover:text-white transition">
              <Icon />
            </div>
          ))}
        </div>

        {/* Profile */}
        <div className="flex items-center space-x-3 border-l pl-6 border-garis">
          <div className="text-right">
            <p className="text-xs text-teks-samping">Welcome back,</p>
            <p className="text-sm font-bold text-white">Wilhelm S. Tamba</p>
          </div>
          <img
            src="/img/profile.jpg"
            className="w-11 h-11 rounded-full ring-2 ring-oranye/20 object-cover"
            alt="avatar"
          />
        </div>
      </div>
    </div>
  );
}