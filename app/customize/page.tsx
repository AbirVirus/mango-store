"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useCart } from "@/lib/CartContext";
import { CheckCircle, Package, Plus, Minus, ShoppingCart } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  description: string;
  basePricePerKg: number;
  category: string;
  images: string[];
  stock: number;
  varieties: { jat: string; description: string }[];
}

export default function CustomizePage() {
  const router = useRouter();
  const { items, addToCart, removeFromCart, updateWeight, totalAmount } =
    useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const cartQuantityFor = (productId: string) => {
    const item = items.find((i) => i.productId === productId);
    return item ? item.weight : 0;
  };

  const handleAdd = (product: Product) => {
    const existing = items.find((i) => i.productId === product._id);
    if (existing) {
      const idx = items.indexOf(existing);
      updateWeight(idx, existing.weight + 0.5);
    } else {
      addToCart({
        productId: product._id,
        name: product.name,
        variety: product.varieties.length > 0 ? product.varieties[0].jat : "",
        size: "Medium",
        weight: 0.5,
        pricePerKg: product.basePricePerKg,
        image: product.images[0] || "",
      });
    }
  };

  const handleRemove = (productId: string) => {
    const existing = items.find((i) => i.productId === productId);
    if (!existing) return;
    const idx = items.indexOf(existing);
    if (existing.weight <= 1) {
      removeFromCart(idx);
    } else {
      updateWeight(idx, existing.weight - 0.5);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-green-900 mb-4">
            Build Your Custom Box
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Mix and match your favourite varieties to create the perfect mango
            box. Everything is packed fresh and delivered to your home.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Package className="text-green-700" /> Select Varieties (kg)
            </h2>
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-700" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((p) => (
                  <div
                    key={p._id}
                    className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg">
                        {p.name}
                      </h3>
                      <p className="text-gray-500 text-sm mb-2 line-clamp-1">
                        {p.description}
                      </p>
                      <span className="text-green-800 font-bold">
                        ৳{p.basePricePerKg}/kg
                      </span>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-100 p-1 rounded-full">
                      <button
                        onClick={() => handleRemove(p._id)}
                        className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-bold text-gray-800">
                        {cartQuantityFor(p._id)}
                      </span>
                      <button
                        onClick={() => handleAdd(p)}
                        className="p-2 bg-green-700 text-white rounded-full shadow-sm hover:bg-green-800 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Your Custom Box
              </h2>
              <div className="space-y-4 mb-8">
                {items.length === 0 ? (
                  <p className="text-gray-400 text-center py-8 italic">
                    Your box is empty...
                  </p>
                ) : (
                  items.map((item, idx) => (
                    <div
                      key={`${item.productId}-${idx}`}
                      className="flex justify-between items-center py-2 border-b border-gray-100"
                    >
                      <span className="text-gray-600">{item.name}</span>
                      <span className="font-bold text-gray-800">
                        {item.weight} kg{" "}
                        <span className="text-gray-400 text-xs ml-1">
                          ৳{item.pricePerKg * item.weight}
                        </span>
                      </span>
                    </div>
                  ))
                )}
              </div>
              <div className="flex justify-between items-center mb-6 pt-4 border-t-2 border-gray-100">
                <span className="text-gray-500 font-medium">Total Amount</span>
                <span className="text-3xl font-extrabold text-green-800">
                  ৳{totalAmount}
                </span>
              </div>
              <button
                disabled={items.length === 0}
                onClick={() => router.push("/checkout")}
                className="w-full py-4 bg-green-700 text-white rounded-2xl font-bold text-lg hover:bg-green-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-100 disabled:bg-gray-300 disabled:shadow-none"
              >
                <ShoppingCart size={20} /> Checkout Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
