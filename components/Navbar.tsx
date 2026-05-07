"use client";

import React from "react";
import { ShoppingCart, Leaf } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";

export default function Navbar() {
  const { itemCount } = useCart();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-2">
        <div className="bg-yellow-400 p-2 rounded-full">
          <Leaf className="text-green-700" size={24} />
        </div>
        <span className="text-2xl font-bold text-green-800">Rajshahi Mangoes</span>
      </Link>
      <div className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
        <Link href="/" className="hover:text-yellow-600 transition-colors">
          Home
        </Link>
        <Link href="/shop" className="hover:text-yellow-600 transition-colors">
          Shop
        </Link>
        <Link href="/customize" className="hover:text-yellow-600 transition-colors">
          Custom Box
        </Link>
        <Link href="/admin" className="hover:text-yellow-600 transition-colors">
          Admin
        </Link>
      </div>
      <Link
        href="/cart"
        className="relative p-2 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 transition-colors"
      >
        <ShoppingCart size={24} className="text-gray-700" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
            {itemCount}
          </span>
        )}
      </Link>
    </nav>
  );
}
