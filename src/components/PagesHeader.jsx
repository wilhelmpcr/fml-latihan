import { MdRefresh } from "react-icons/md";

export default function PageHeader({ title, breadcrumb, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-black text-white bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
          {title}
        </h1>
        <div className="flex items-center gap-2 text-xs text-gray-500 mt-2 font-medium tracking-wider uppercase">
          <span className="hover:text-[#FF5C00] cursor-pointer transition-colors">Dashboard</span>
          {/* Logika Breadcrumb: Bisa string atau array */}
          {Array.isArray(breadcrumb) ? (
            breadcrumb.map((item, index) => (
              <span key={index} className="flex gap-2 items-center">
                <span className="text-gray-700">/</span>
                <span className={index === breadcrumb.length - 1 ? "text-[#FF5C00] font-bold" : ""}>
                  {item}
                </span>
              </span>
            ))
          ) : (
            <>
              <span className="text-gray-700">/</span>
              <span className="text-[#FF5C00] font-bold">{breadcrumb}</span>
            </>
          )}
        </div>
      </div>
      
      <div className="flex gap-3">
        <button 
          onClick={() => window.location.reload()}
          className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:bg-white/10 hover:text-white transition-all duration-300 flex items-center gap-2"
        >
          <MdRefresh className="text-lg" />
          Refresh
        </button>
        {/* Children digunakan untuk tombol custom seperti 'Add New' dsb */}
        {children}
      </div>
    </div>
  );
}