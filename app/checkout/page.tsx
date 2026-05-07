"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useCart } from "@/lib/CartContext";
import {
  ArrowLeft,
  CreditCard,
  MapPin,
  User,
  CheckCircle,
  Loader2,
} from "lucide-react";

const DISTRICTS = [
  "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogura",
  "Brahmanbaria", "Chandpur", "Chapai Nawabganj", "Chattogram", "Chuadanga",
  "Cox's Bazar", "Cumilla", "Dhaka", "Dinajpur", "Faridpur", "Feni",
  "Gaibandha", "Gazipur", "Gopalganj", "Habiganj", "Jamalpur", "Jashore",
  "Jhalokathi", "Jhenaidah", "Joypurhat", "Khagrachhari", "Khulna",
  "Kishoreganj", "Kurigram", "Kushtia", "Lakshmipur", "Lalmonirhat",
  "Madaripur", "Magura", "Manikganj", "Meherpur", "Moulvibazar",
  "Munshiganj", "Mymensingh", "Naogaon", "Narail", "Narayanganj",
  "Narsingdi", "Natore", "Netrokona", "Nilphamari", "Noakhali", "Pabna",
  "Panchagarh", "Patuakhali", "Pirojpur", "Rajbari", "Rajshahi", "Rangamati",
  "Rangpur", "Satkhira", "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj",
  "Sylhet", "Tangail", "Thakurgaon",
];

type PaymentMethod = "bKash" | "Nagad" | "Rocket" | "COD";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalAmount, clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [district, setDistrict] = useState("Dhaka");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("COD");

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items, router]);

  if (items.length === 0) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!phone.trim()) errs.phone = "Phone number is required";
    else if (!/^01[0-9]{9}$/.test(phone.replace(/\s|-/g, "")))
      errs.phone = "Enter a valid Bangladeshi phone number (01XXXXXXXXX)";
    if (!email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Enter a valid email address";
    if (!area.trim()) errs.area = "Area/Thana is required";
    if (!address.trim()) errs.address = "Full address is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: { name, phone, email, address: { district, area, fullAddress: address } },
          items: items.map((item) => ({
            productId: item.productId,
            variety: item.variety,
            size: item.size,
            weight: item.weight,
            pricePerKg: item.pricePerKg,
            totalPrice: item.pricePerKg * item.weight,
          })),
          totalAmount,
          paymentMethod,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || "Something went wrong");
        return;
      }

      clearCart();
      router.push(`/order-confirmation/${data._id}`);
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-8">
        <button
          onClick={() => router.push("/cart")}
          className="flex items-center gap-2 text-gray-500 hover:text-green-700 mb-6 transition-colors"
        >
          <ArrowLeft size={18} /> Back to Cart
        </button>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-10">
          Checkout
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Info */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-5">
                  <User size={20} className="text-green-700" /> Customer Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none"
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none"
                      placeholder="01XXXXXXXXX"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none"
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-5">
                  <MapPin size={20} className="text-green-700" /> Delivery Address
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      District *
                    </label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none"
                    >
                      {DISTRICTS.map((d) => (
                        <option key={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Area / Thana *
                    </label>
                    <input
                      type="text"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none"
                      placeholder="e.g. Gulshan, Motijheel"
                    />
                    {errors.area && (
                      <p className="text-red-500 text-xs mt-1">{errors.area}</p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Full Address *
                    </label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none resize-none"
                      placeholder="House/Flat, Road, Area"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-5">
                  <CreditCard size={20} className="text-green-700" /> Payment Method
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {([
                    ["bKash", "bKash"],
                    ["Nagad", "Nagad"],
                    ["Rocket", "Rocket"],
                    ["COD", "Cash on Delivery"],
                  ] as [PaymentMethod, string][]).map(([val, label]) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setPaymentMethod(val)}
                      className={`p-4 rounded-xl border-2 text-left font-bold transition-all ${
                        paymentMethod === val
                          ? "border-green-700 bg-green-50 text-green-800"
                          : "border-gray-200 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {paymentMethod === val && (
                          <CheckCircle size={18} className="text-green-700" />
                        )}
                        {label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column - order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm sticky top-24">
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                  Order Summary
                </h2>
                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {items.map((item, idx) => (
                    <div
                      key={`${item.productId}-${idx}`}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-gray-600 truncate max-w-[180px]">
                        {item.name} ({item.weight}kg)
                      </span>
                      <span className="font-bold">
                        ৳{item.pricePerKg * item.weight}
                      </span>
                    </div>
                  ))}
                </div>
                <hr className="mb-4" />
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-bold">৳{totalAmount}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-500">Delivery</span>
                  <span className="text-sm text-green-700">2-3 business days</span>
                </div>
                <hr className="mb-4" />
                <div className="flex justify-between items-center mb-6">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-extrabold text-green-800">
                    ৳{totalAmount}
                  </span>
                </div>

                {serverError && (
                  <p className="text-red-500 text-sm mb-4 text-center bg-red-50 py-2 rounded-lg">
                    {serverError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-green-700 text-white rounded-2xl font-bold text-lg hover:bg-green-800 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={22} className="animate-spin" /> Placing Order...
                    </>
                  ) : (
                    "Place Order"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
