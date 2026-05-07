"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useCart } from "@/lib/CartContext";
import { ShoppingCart, Star } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  description: string;
  basePricePerKg: number;
  category: string;
  images: string[];
  stock: number;
  varieties: { jat: string }[];
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const defaultVariety = (p: Product) =>
    p.varieties.length > 0 ? p.varieties[0].jat : "";

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-green-900 mb-2">
              Our Mango Collection
            </h1>
            <p className="text-gray-600">
              Hand-picked premium varieties from the heart of Rajshahi.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
            <span className="text-sm font-medium text-gray-500">
              Filter by:
            </span>
            <select className="text-sm font-bold text-green-800 outline-none bg-transparent">
              <option>All Varieties</option>
              <option>Premium</option>
              <option>Standard</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 text-lg mb-4">
              No mangoes available in stock right now.
            </p>
            <p className="text-sm text-gray-400">
              Our farmers are working hard to bring the best harvest!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <Link
                  href={`/shop/${product._id}`}
                  className="relative aspect-square overflow-hidden"
                >
                  <Image
                    src={
                      product.images[0] ||
                      "https://images.unsplash.com/photo-1553289395-f65f6ca9517b?w=800"
                    }
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-green-800 shadow-sm">
                    {product.category}
                  </div>
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <Link
                      href={`/shop/${product._id}`}
                      className="hover:text-green-700 transition-colors"
                    >
                      <h3 className="text-xl font-bold text-gray-900">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star size={14} fill="currentColor" />
                      <span className="text-xs font-bold">4.9</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-extrabold text-green-800">
                        ৳{product.basePricePerKg}
                      </span>
                      <span className="text-gray-400 text-xs ml-1">/ kg</span>
                    </div>
                    <button
                      onClick={() =>
                        addToCart({
                          productId: product._id,
                          name: product.name,
                          variety: defaultVariety(product),
                          size: "Medium",
                          weight: 1,
                          pricePerKg: product.basePricePerKg,
                          image: product.images[0] || "",
                        })
                      }
                      className="p-3 bg-green-700 text-white rounded-full hover:bg-green-800 transition-colors shadow-md hover:shadow-lg"
                    >
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
