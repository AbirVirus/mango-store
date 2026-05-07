import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Order from "@/lib/models/Order";
import Product from "@/lib/models/Product";
import { sendOrderConfirmation, sendAdminNotification } from "@/lib/email";

const PAYMENT_METHODS = ["bKash", "Nagad", "Rocket", "COD"];

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // --- validation ---
    const errors: Record<string, string> = {};

    if (!body.customer?.name?.trim())
      errors["customer.name"] = "Name is required";
    if (!body.customer?.phone?.trim())
      errors["customer.phone"] = "Phone is required";
    else if (!/^01[0-9]{9}$/.test(body.customer.phone.replace(/\s|-/g, "")))
      errors["customer.phone"] = "Invalid Bangladesh phone number";
    if (!body.customer?.email?.trim())
      errors["customer.email"] = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.customer.email))
      errors["customer.email"] = "Invalid email";
    if (!body.customer?.address?.district?.trim())
      errors["address.district"] = "District is required";
    if (!body.customer?.address?.area?.trim())
      errors["address.area"] = "Area is required";
    if (!body.customer?.address?.fullAddress?.trim())
      errors["address.fullAddress"] = "Full address is required";

    if (!Array.isArray(body.items) || body.items.length === 0)
      errors.items = "At least one item required";

    for (let i = 0; i < (body.items || []).length; i++) {
      const item = body.items[i];
      if (!item.productId) errors[`items[${i}].productId`] = "Missing";
      if (!item.variety?.trim()) errors[`items[${i}].variety`] = "Missing";
      if (typeof item.weight !== "number" || item.weight <= 0)
        errors[`items[${i}].weight`] = "Must be > 0";
      if (typeof item.pricePerKg !== "number" || item.pricePerKg <= 0)
        errors[`items[${i}].pricePerKg`] = "Must be > 0";
    }

    if (typeof body.totalAmount !== "number" || body.totalAmount <= 0)
      errors.totalAmount = "Invalid total";

    if (!PAYMENT_METHODS.includes(body.paymentMethod))
      errors.paymentMethod = `Must be one of: ${PAYMENT_METHODS.join(", ")}`;

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: "Validation failed", errors }, { status: 400 });
    }

    await dbConnect();

    // Generate reference ID
    const ts = Date.now().toString(36).toUpperCase();
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
    const referenceId = `MGO-${ts}-${rand}`;

    const order = await Order.create({
      ...body,
      referenceId,
      orderStatus: "Pending",
      paymentStatus: "Pending",
    });

    // Send emails (don't block order creation on email failure)
    try {
      await Promise.all([
        sendOrderConfirmation(order.toObject(), body.customer.email),
        sendAdminNotification(order.toObject()),
      ]);
    } catch (emailErr) {
      console.error("[CHECKOUT] Email error:", emailErr);
    }

    return NextResponse.json(order.toObject(), { status: 201 });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
