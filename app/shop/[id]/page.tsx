"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useCart } from "@/lib/CartContext";
import {
  ShoppingCart,
  ArrowLeft,
  Star,
  Package,
  Minus,
  Plus,
} from "lucide-react";

interface MangoProduct {
  _id: string;
  name: string;
  description: string;
  basePricePerKg: number;
  category: string;
  images: string[];
  stock: number;
  varieties: { _id: string; jat: string; description: string }[];
  sizes: { _id: string; label: string; priceMultiplier: number }[];
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const id = params.id as string;

  const [product, setProduct] = useState<MangoProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedVariety, setSelectedVariety] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [weight, setWeight] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setProduct(data);
        if (data.varieties.length > 0)
          setSelectedVariety(data.varieties[0].jat);
        if (data.sizes.length > 0) setSelectedSize(data.sizes[0].label);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700" />
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-extrabold text-gray-400 mb-4">404</h1>
          <p className="text-gray-500 mb-6">Product not found</p>
          <button
            onClick={() => router.push("/shop")}
            className="text-green-700 font-bold hover:underline"
          >
            Back to Shop
          </button>
        </div>
      </main>
    );
  }

  const sizeObj = product.sizes.find((s) => s.label === selectedSize);
  const effectivePrice =
    (sizeObj?.priceMultiplier ?? 1) * product.basePricePerKg;
  const totalPrice = effectivePrice * weight;

  const handleAddToCart = () => {
    addToCart({
      productId: product._id,
      name: product.name,
      variety: selectedVariety,
      size: selectedSize,
      weight,
      pricePerKg: effectivePrice,
      image: product.images[0] || "",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <button
          onClick={() => router.push("/shop")}
          className="flex items-center gap-2 text-gray-500 hover:text-green-700 mb-8 transition-colors"
        >
          <ArrowLeft size={18} /> Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border border-gray-200">
            <Image
              src={
                product.images[0] ||
                "https://images.unsplash.com/photo-1553289395-f65f6ca9517b?w=800"
              }
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold text-green-800 shadow-sm">
              {product.category}
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-extrabold text-green-900 mb-3">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 text-yellow-500 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
                <span className="text-sm text-gray-400 ml-1">5.0</span>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-500 uppercase mb-2">
                  Variety (Jat)
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.varieties.map((v) => (
                    <button
                      key={v.jat}
                      onClick={() => setSelectedVariety(v.jat)}
                      className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                        selectedVariety === v.jat
                          ? "bg-green-700 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {v.jat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-500 uppercase mb-2">
                  Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s.label}
                      onClick={() => setSelectedSize(s.label)}
                      className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                        selectedSize === s.label
                          ? "bg-green-700 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-500 uppercase mb-2">
                  Quantity (kg)
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setWeight(Math.max(0.5, weight - 0.5))}
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center text-xl font-bold">
                    {weight}
                  </span>
                  <button
                    onClick={() =>
                      setWeight(Math.min(product.stock, weight + 0.5))
                    }
                    className="p-2 bg-green-700 text-white rounded-full hover:bg-green-800"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-400 block">
                  Price per kg
                </span>
                <span className="text-3xl font-extrabold text-green-800">
                  ৳{effectivePrice}
                </span>
                <span className="text-gray-400 text-xs ml-1">/ kg</span>
              </div>
              <div className="text-right">
                <span className="text-sm text-gray-400 block">Total</span>
                <span className="text-3xl font-extrabold text-gray-900">
                  ৳{totalPrice}
                </span>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg ${
                added
                  ? "bg-green-500 text-white"
                  : product.stock === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                    : "bg-green-700 text-white hover:bg-green-800"
              }`}
            >
              <ShoppingCart size={22} />
              {product.stock === 0
                ? "Out of Stock"
                : added
                  ? "Added to Cart!"
                  : "Add to Cart"}
            </button>

            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Package size={16} />
              <span>
                {product.stock > 0
                  ? `${product.stock} kg in stock`
                  : "Currently unavailable"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
