"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  ArrowLeft,
  Package,
  Loader2,
  MapPin,
  CreditCard,
  User,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface Order {
  _id: string;
  referenceId: string;
  customer: {
    name: string;
    phone: string;
    email: string;
    address: { district: string; area: string; fullAddress: string };
  };
  items: {
    productId?: { _id: string; name: string };
    variety: string;
    size: string;
    weight: number;
    pricePerKg: number;
    totalPrice: number;
  }[];
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  customNotes?: string;
  createdAt: string;
}

const ORDER_STATUSES = [
  "Pending",
  "Packed",
  "Shipped",
  "Delivered",
  "Cancelled",
];
const PAYMENT_STATUSES = ["Pending", "Paid", "Failed"];

export default function AdminOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders/${id}`);
        if (!res.ok) throw new Error("Not found");
        setOrder(await res.json());
      } catch {
        setOrder(null);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [id]);

  const updateField = async (field: string, value: string) => {
    if (!order) return;
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });
      if (res.ok) {
        setOrder(await res.json());
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch {
      // fail silently
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex justify-center items-center h-96">
          <Loader2 size={36} className="animate-spin text-green-700" />
        </div>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-extrabold text-gray-400 mb-4">404</h1>
          <p className="text-gray-500">Order not found</p>
          <Link href="/admin" className="text-green-700 font-bold hover:underline mt-4 inline-block">
            Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-8">
        <button
          onClick={() => router.push("/admin")}
          className="flex items-center gap-2 text-gray-500 hover:text-green-700 mb-6 transition-colors"
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </button>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">
              Order #{order.referenceId}
            </h1>
            <p className="text-gray-400 text-sm">
              {new Date(order.createdAt).toLocaleDateString("en-BD", {
                dateStyle: "long",
                timeStyle: "short",
              })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {saving && (
              <span className="text-sm text-gray-400 flex items-center gap-1">
                <Loader2 size={14} className="animate-spin" /> Saving...
              </span>
            )}
            {saved && (
              <span className="text-sm text-green-600 flex items-center gap-1">
                <CheckCircle size={14} /> Saved
              </span>
            )}
          </div>
        </div>

        {/* Status controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Package size={18} /> Order Status
            </h3>
            <select
              value={order.orderStatus}
              onChange={(e) => updateField("orderStatus", e.target.value)}
              disabled={saving}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-700 outline-none focus:border-green-500"
            >
              {ORDER_STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <CreditCard size={18} /> Payment Status
            </h3>
            <select
              value={order.paymentStatus}
              onChange={(e) => updateField("paymentStatus", e.target.value)}
              disabled={saving}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-700 outline-none focus:border-green-500"
            >
              {PAYMENT_STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Customer info */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <User size={18} className="text-green-700" /> Customer
          </h3>
          <p className="text-gray-600">
            <strong>{order.customer.name}</strong>
            <br />
            {order.customer.phone} &middot; {order.customer.email}
          </p>
        </div>

        {/* Delivery address */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <MapPin size={18} className="text-green-700" /> Delivery Address
          </h3>
          <p className="text-gray-600">
            {order.customer.address.fullAddress}
            <br />
            {order.customer.address.area}, {order.customer.address.district}
          </p>
        </div>

        {/* Items */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
          <h3 className="font-bold text-gray-800 mb-4">Items</h3>
          <table className="w-full text-left">
            <thead className="text-gray-400 text-sm">
              <tr>
                <th className="pb-3">Variety</th>
                <th className="pb-3">Size</th>
                <th className="pb-3">Weight</th>
                <th className="pb-3 text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, idx) => (
                <tr key={idx} className="border-t border-gray-100">
                  <td className="py-3 font-bold">{item.variety}</td>
                  <td className="py-3">{item.size}</td>
                  <td className="py-3">{item.weight} kg</td>
                  <td className="py-3 text-right font-bold">
                    ৳{item.totalPrice}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr className="mt-4 mb-4" />
          <div className="flex justify-between text-lg font-extrabold">
            <span>Total</span>
            <span className="text-green-800">৳{order.totalAmount}</span>
          </div>
          <p className="text-gray-400 text-sm mt-1">
            Payment: {order.paymentMethod}
          </p>
        </div>
      </div>
    </main>
  );
}
