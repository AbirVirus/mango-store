import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative bg-yellow-50 overflow-hidden rounded-3xl mx-4 my-4 lg:mx-8 lg:my-8">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold mb-6">
            <Star size={14} fill="currentColor" />
            <span>Premium Rajshahi Harvest 2026</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-green-900 leading-tight mb-6">
            Taste the Golden <br /> <span className="text-yellow-500">Magic of Rajshahi</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-xl">
            Freshly picked, naturally ripened, and delivered from the orchards of Rajshahi straight to your doorstep. Customize your own box of premium mangoes today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/shop" className="px-8 py-4 bg-green-700 text-white rounded-full font-bold text-lg hover:bg-green-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-200">
              Shop Now <ArrowRight size={20} />
            </Link>
            <Link href="/customize" className="px-8 py-4 bg-white text-green-800 border-2 border-green-700 rounded-full font-bold text-lg hover:bg-green-50 transition-all text-center">
              Build Custom Box
            </Link>
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="w-72 h-72 lg:w-96 lg:h-96 bg-yellow-400 rounded-full blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
          <img
            src="https://images.unsplash.com/photo-1553289395-f65f6ca9517b?auto=format&fit=crop&w=800&q=80"
            alt="Fresh Mangoes"
            className="relative z-10 rounded-2xl shadow-2xl w-full max-w-md rotate-3 hover:rotate-0 transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );
}
