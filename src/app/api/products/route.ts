import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import SneakerModel from "@/models/Sneaker";

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();

        const { searchParams } = new URL(req.url);
        const page = Math.max(1, Number(searchParams.get("page") || 1));
        const pageSize = Math.max(1, Math.min(50, Number(searchParams.get("pageSize") || 12)));
        const brands = (searchParams.get("brands") || "").split(",").filter(Boolean);
        const categories = (searchParams.get("categories") || "").split(",").filter(Boolean);
        const sizes = (searchParams.get("sizes") || "").split(",").filter(Boolean);

        const match: any = {};
        if (brands.length) match.brand = { $in: brands };
        if (categories.length) match.category = { $in: categories };
        if (sizes.length) match.sizes = { $in: sizes }; // any size matches

        const [items, total] = await Promise.all([
            SneakerModel.find(match)
                .sort({ id: 1 })
                .skip((page - 1) * pageSize)
                .limit(pageSize),
            SneakerModel.countDocuments(match),
        ]);

        return NextResponse.json({
            items,
            page,
            pageSize,
            total,
            totalPages: Math.max(1, Math.ceil(total / pageSize)),
        });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
    }
}


