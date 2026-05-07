import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/lib/models/Product";
import { mangoVarieties } from "@/lib/seed-data";

export async function POST() {
  try {
    await dbConnect();

    const count = await Product.countDocuments();
    if (count > 0) {
      return NextResponse.json(
        { message: "Database already seeded", count },
        { status: 200 }
      );
    }

    const products = await Product.insertMany(mangoVarieties);

    return NextResponse.json(
      { message: "Database seeded successfully", count: products.length },
      { status: 201 }
    );
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed database" },
      { status: 500 }
    );
  }
}
