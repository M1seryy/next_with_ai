import { NextResponse } from "next/server";
import data from "@/app/data";
import { connectToDatabase } from "@/lib/db";
import SneakerModel from "@/models/Sneaker";

export async function POST() {
    try {
        await connectToDatabase();
        const products = Object.values(data as any);
        await SneakerModel.deleteMany({});
        await SneakerModel.insertMany(products);
        return NextResponse.json({ inserted: products.length });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message || "Seed failed" }, { status: 500 });
    }
}


