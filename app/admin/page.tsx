"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Plus, Trash2, Package, ClipboardList, Database } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  basePricePerKg: number;
  stock: number;
}

interface Order {
  _id: string;
  referenceId: string;
  customer: { name: string; phone: string };
  totalAmount: number;
  orderStatus: string;
  createdAt: string;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [seeded, setSeeded] = useState<{ message: string } | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [pRes, oRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/orders"),
        ]);
        const pData = await pRes.json();
        const oData = await oRes.json();
        setProducts(Array.isArray(pData) ? pData : []);
        setOrders(Array.isArray(oData) ? oData : []);
      } catch (err) {
        console.error("Admin fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSeed = async () => {
    setSeeding(true);
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      setSeeded(data);
      // Refresh products
      const pRes = await fetch("/api/products");
      setProducts(Array.isArray(await pRes.json()) ? await pRes.json() : []);
    } catch {
      setSeeded({ message: "Failed to seed" });
    } finally {
      setSeeding(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Store Management
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-bold flex items-center gap-2 hover:bg-yellow-600 transition-colors shadow-sm disabled:opacity-60"
            >
              <Database size={18} />
              {seeding ? "Seeding..." : "Seed Products"}
            </button>
            <button className="px-4 py-2 bg-green-700 text-white rounded-lg font-bold flex items-center gap-2 hover:bg-green-800 transition-colors shadow-sm">
              <Plus size={18} /> Add Product
            </button>
          </div>
        </div>

        {seeded && (
          <div className="mb-6 px-4 py-3 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-800 font-medium">
            {seeded.message}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Package className="text-green-700" /> Product Inventory
              </h2>
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-500 text-sm uppercase font-medium">
                    <tr>
                      <th className="px-6 py-4">Product</th>
                      <th className="px-6 py-4">Price/kg</th>
                      <th className="px-6 py-4">Stock</th>
                      <th className="px-6 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-6 py-10 text-center text-gray-400 italic"
                        >
                          No products found. Click &quot;Seed Products&quot; to
                          populate.
                        </td>
                      </tr>
                    ) : (
                      products.map((p) => (
                        <tr
                          key={p._id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 font-bold text-gray-900">
                            <Link
                              href={`/shop/${p._id}`}
                              className="hover:text-green-700"
                            >
                              {p.name}
                            </Link>
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            ৳{p.basePricePerKg}
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {p.stock} kg
                          </td>
                          <td className="px-6 py-4">
                            <button className="text-red-500 hover:text-red-700 p-1">
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <ClipboardList className="text-green-700" /> Recent Orders
              </h2>
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-500 text-sm uppercase font-medium">
                    <tr>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-6 py-10 text-center text-gray-400 italic"
                        >
                          No orders yet
                        </td>
                      </tr>
                    ) : (
                      orders.map((o) => (
                        <tr
                          key={o._id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 font-medium text-gray-900">
                            <Link
                              href={`/admin/orders/${o._id}`}
                              className="hover:text-green-700"
                            >
                              {o.customer.name}
                            </Link>
                          </td>
                          <td className="px-6 py-4 font-bold text-green-800">
                            ৳{o.totalAmount}
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
                              {o.orderStatus}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-400 text-sm">
                            {new Date(o.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
