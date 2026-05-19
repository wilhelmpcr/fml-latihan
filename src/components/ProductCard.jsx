import React from "react";
import Card from "./Card";

export default function ProductCard({
  image,
  title,
  category,
  price,
  description,
  onActionClick,
  actionText = "Detail",
}) {
  return (
    <Card className="flex flex-col h-full overflow-hidden p-0">
      {/* Product Image Wrapper */}
      <div className="relative w-full h-48 overflow-hidden rounded-t-[32px]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-[#FF5C00]/95 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-[#FF5C00] transition-colors">
            {title}
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed mb-6 line-clamp-2">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Harga</span>
            <span className="text-lg font-extrabold text-[#FF5C00]">{price}</span>
          </div>
          <button
            onClick={onActionClick}
            className="bg-white/5 hover:bg-[#FF5C00] border border-white/5 hover:border-transparent text-white hover:text-white font-bold text-xs px-4 py-2.5 rounded-xl transition duration-300 active:scale-95"
          >
            {actionText}
          </button>
        </div>
      </div>
    </Card>
  );
}
