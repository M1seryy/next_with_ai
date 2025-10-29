import { NextRequest, NextResponse } from "next/server";
import data from "@/app/data";
import { Sneaker } from "@/types";

// Масив усіх кросівок з якого будуть братися дані
const sneakersArray = Object.values(data) as Sneaker[];

// Cloudflare Pages requires Edge Runtime
export const runtime = 'edge';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, Number(searchParams.get("page") || 1));
    const pageSize = Math.max(1, Math.min(50, Number(searchParams.get("pageSize") || 12)));
    const brands = (searchParams.get("brands") || "").split(",").filter(Boolean);
    const categories = (searchParams.get("categories") || "").split(",").filter(Boolean);
    const sizes = (searchParams.get("sizes") || "").split(",").filter(Boolean);

    let filtered = [...sneakersArray];

    if (brands.length) {
        filtered = filtered.filter((sneaker: Sneaker) => brands.includes(sneaker.brand));
    }
    if (categories.length) {
        filtered = filtered.filter((sneaker: Sneaker) => categories.includes(sneaker.category));
    }
    if (sizes.length) {
        filtered = filtered.filter((sneaker: Sneaker) =>
            sneaker.sizes && sizes.some(size => sneaker.sizes?.includes(size))
        );
    }

    const total = filtered.length;
    filtered.sort((a: Sneaker, b: Sneaker) => a.id - b.id);
    const items = filtered.slice((page - 1) * pageSize, page * pageSize);

    return NextResponse.json({
        items,
        page,
        pageSize,
        total,
        totalPages: Math.max(1, Math.ceil(total / pageSize)),
    });
}


