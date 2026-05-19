import React from "react";

export default function Table({ headers = [], children, className = "" }) {
  return (
    <div className={`overflow-x-auto rounded-3xl border border-white/5 bg-[#1A1A1A] p-4 ${className}`}>
      <table className="w-full text-left border-separate border-spacing-y-2">
        <thead>
          <tr className="text-[10px] text-gray-500 uppercase tracking-widest font-black">
            {headers.map((header, index) => (
              <th key={index} className="p-4">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
