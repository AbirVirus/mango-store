import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Order from "@/lib/models/Order";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const order = await Order.findById(id).populate("items.productId");

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order.toObject(), { status: 200 });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();

    const allowedStatuses = [
      "Pending",
      "Packed",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];
    const allowedPayment = ["Pending", "Paid", "Failed"];

    const update: Record<string, unknown> = {};
    if (body.orderStatus && allowedStatuses.includes(body.orderStatus))
      update.orderStatus = body.orderStatus;
    if (body.paymentStatus && allowedPayment.includes(body.paymentStatus))
      update.paymentStatus = body.paymentStatus;
    if (body.customNotes !== undefined) update.customNotes = body.customNotes;

    const order = await Order.findByIdAndUpdate(id, update, { new: true });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order.toObject(), { status: 200 });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}
