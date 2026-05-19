import React from "react";
import Card from "./Card";
import { GiChefToque, GiAppleCore } from "react-icons/gi";
import { MdOutlineTimer } from "react-icons/md";

export default function FeatureSection() {
  const features = [
    {
      icon: GiChefToque,
      title: "Chef Profesional",
      desc: "Diramu oleh koki berpengalaman bertahun-tahun di industri catering bintang lima.",
    },
    {
      icon: GiAppleCore,
      title: "Bahan Pilihan Segar",
      desc: "Kami menjaga kualitas rasa dengan memilih bahan segar dan higienis setiap harinya.",
    },
    {
      icon: MdOutlineTimer,
      title: "Pengiriman Tepat Waktu",
      desc: "Armada pengantar kami memastikan pesanan tiba sebelum acara Anda dimulai.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
      {features.map((feat, index) => {
        const Icon = feat.icon;
        return (
          <Card key={index} className="flex flex-col gap-4">
            <div className="bg-[#FF5C00]/10 border border-[#FF5C00]/20 p-3 rounded-2xl w-fit">
              <Icon className="text-[#FF5C00] text-3xl" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{feat.desc}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
