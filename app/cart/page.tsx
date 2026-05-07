"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useCart } from "@/lib/CartContext";
import {
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";

export default function CartPage() {
  const { items, totalAmount, removeFromCart, updateWeight, clearCart } =
    useCart();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex p-6 bg-green-50 rounded-full mb-6">
            <ShoppingBag size={48} className="text-green-400" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
            Your cart is empty
          </h1>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Looks like you haven&apos;t added any mangoes to your cart yet.
            Browse our collection of premium Rajshahi varieties.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-green-700 text-white rounded-full font-bold text-lg hover:bg-green-800 transition-all shadow-lg"
          >
            Browse Shop <ArrowRight size={20} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Shopping Cart ({items.length} {items.length === 1 ? "item" : "items"}
            )
          </h1>
          <button
            onClick={clearCart}
            className="text-red-500 text-sm font-bold hover:underline"
          >
            Clear All
          </button>
        </div>

        <div className="space-y-4 mb-8">
          {items.map((item, idx) => (
            <div
              key={`${item.productId}-${idx}`}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-5"
            >
              <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                <Image
                  src={
                    item.image ||
                    "https://images.unsplash.com/photo-1553289395-f65f6ca9517b?w=200"
                  }
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 truncate">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-400">
                  {item.variety} &middot; {item.size}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2 bg-gray-100 rounded-full">
                    <button
                      onClick={() =>
                        updateWeight(idx, Math.max(0.5, item.weight - 0.5))
                      }
                      className="p-1.5 hover:bg-gray-200 rounded-full"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-bold">
                      {item.weight}
                    </span>
                    <button
                      onClick={() => updateWeight(idx, item.weight + 0.5)}
                      className="p-1.5 hover:bg-gray-200 rounded-full"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="text-xs text-gray-400">kg</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-lg font-extrabold text-green-800 block">
                  ৳{item.pricePerKg * item.weight}
                </span>
                <span className="text-xs text-gray-400">
                  ৳{item.pricePerKg}/kg
                </span>
              </div>
              <button
                onClick={() => removeFromCart(idx)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-bold text-gray-700">৳{totalAmount}</span>
          </div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-500">Delivery</span>
            <span className="text-sm text-green-700 font-medium">
              Calculated at checkout
            </span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-2xl font-extrabold text-green-800">
              ৳{totalAmount}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/shop"
              className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-600 rounded-full font-bold hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft size={18} /> Continue Shopping
            </Link>
            <Link
              href="/checkout"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-700 text-white rounded-full font-bold text-lg hover:bg-green-800 transition-all shadow-lg"
            >
              Proceed to Checkout <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
