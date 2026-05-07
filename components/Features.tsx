import React from 'react';
import { Truck, ShieldCheck, Leaf } from 'lucide-react';

const features = [
  {
    icon: <Truck className="text-green-600" size={32} />,
    title: "Fast BD Delivery",
    description: "Rapid shipping to Dhaka, Chittagong and all districts."
  },
  {
    icon: <ShieldCheck className="text-green-600" size={32} />,
    title: "Quality Guaranteed",
    description: "Hand-picked premium mangoes. Replace any bad fruit."
  },
  {
    icon: <Leaf className="text-green-600" size={32} />,
    title: "100% Natural",
    description: "No harmful chemicals. Naturally ripened for best taste."
  }
];

export default function Features() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 py-16 max-w-7xl mx-auto">
      {features.map((f, i) => (
        <div key={i} className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center gap-4">
          <div className="p-4 bg-green-50 rounded-full">{f.icon}</div>
          <h3 className="text-xl font-bold text-gray-800">{f.title}</h3>
          <p className="text-gray-600">{f.description}</p>
        </div>
      ))}
    </div>
  );
}
