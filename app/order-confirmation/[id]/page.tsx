"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { CheckCircle, Package, ArrowRight, Loader2 } from "lucide-react";

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
    variety: string;
    size: string;
    weight: number;
    pricePerKg: number;
    totalPrice: number;
  }[];
  totalAmount: number;
  paymentMethod: string;
  orderStatus: string;
  createdAt: string;
}

export default function OrderConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setOrder(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-96">
          <Loader2 size={40} className="animate-spin text-green-700" />
        </div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-extrabold text-gray-400 mb-4">
            Order Not Found
          </h1>
          <Link href="/shop" className="text-green-700 font-bold hover:underline">
            Go to Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-green-100 rounded-full mb-4">
            <CheckCircle size={56} className="text-green-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-gray-500 text-lg">
            Thank you for your order. We&apos;ll get your mangoes on their way!
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Order Reference</span>
            <span className="text-xl font-extrabold text-green-800">
              #{order.referenceId}
            </span>
          </div>

          <hr />

          <div>
            <h3 className="font-bold text-gray-800 mb-2">Customer</h3>
            <p className="text-gray-600">
              {order.customer.name}
              <br />
              {order.customer.phone}
              <br />
              {order.customer.email}
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-800 mb-2">Delivery Address</h3>
            <p className="text-gray-600">
              {order.customer.address.fullAddress}
              <br />
              {order.customer.address.area}, {order.customer.address.district}
            </p>
          </div>

          <hr />

          <div>
            <h3 className="font-bold text-gray-800 mb-3">Items</h3>
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.variety} ({item.size}) — {item.weight}kg
                  </span>
                  <span className="font-bold">৳{item.totalPrice}</span>
                </div>
              ))}
            </div>
          </div>

          <hr />

          <div className="flex justify-between items-center">
            <span className="text-gray-500">Payment Method</span>
            <span className="font-bold">{order.paymentMethod}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500">Status</span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-bold">
              {order.orderStatus}
            </span>
          </div>

          <hr />

          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">Total Paid</span>
            <span className="text-3xl font-extrabold text-green-800">
              ৳{order.totalAmount}
            </span>
          </div>

          <div className="flex items-center gap-2 text-green-700 bg-green-50 px-4 py-3 rounded-xl">
            <Package size={20} />
            <span className="font-medium">
              Estimated delivery: 2-3 business days
            </span>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-green-700 text-white rounded-full font-bold text-lg hover:bg-green-800 transition-all shadow-lg"
          >
            Continue Shopping <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </main>
  );
}
