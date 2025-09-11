"use client";
import React, { useMemo, useState } from "react";
import ProductCard from "../ProductCard";
import { Sneaker } from "@/types";
import rawData from "@/app/data";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Sneaker[]>(
    Object.values(rawData as Record<string, Sneaker>)
  );

  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSize, setSelectedSize] = useState<string>("All");

  const brands = useMemo(() => {
    return ["All", ...Array.from(new Set(products.map((p) => p.brand))).sort()];
  }, [products]);

  const categories = useMemo(() => {
    return [
      "All",
      ...Array.from(new Set(products.map((p) => p.category))).sort(),
    ];
  }, [products]);

  const sizes = useMemo(() => {
    const collected = new Set<string>();
    products.forEach((p) => p.sizes?.forEach((s) => collected.add(s)));
    if (collected.size === 0) {
      return ["All", "6", "7", "8", "9", "10", "11", "12"];
    }
    return ["All", ...Array.from(collected).sort()];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesBrand = selectedBrand === "All" || p.brand === selectedBrand;
      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      const matchesSize =
        selectedSize === "All" ||
        (p.sizes ? p.sizes.includes(selectedSize) : true);
      return matchesBrand && matchesCategory && matchesSize;
    });
  }, [products, selectedBrand, selectedCategory, selectedSize]);

  // Pagination
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(12);

  // Reset page when filters change
  React.useEffect(() => {
    setPage(1);
  }, [selectedBrand, selectedCategory, selectedSize]);

  const totalItems = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const paginated = filteredProducts.slice(start, end);

  return (
    <div className="mt-8 lg:flex lg:items-start lg:gap-8">
      <aside className="mb-6 lg:mb-0 lg:w-64 lg:shrink-0">
        <div className="sticky top-4 border rounded-lg p-4 bg-white">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Brand</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Size</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                {sizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginated.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-8 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {totalItems === 0 ? 0 : start + 1}-
            {Math.min(end, totalItems)} of {totalItems}
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-2 border rounded disabled:opacity-50"
              onClick={() => setPage(1)}
              disabled={currentPage === 1}
            >
              « First
            </button>
            <button
              className="px-3 py-2 border rounded disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              ‹ Prev
            </button>
            <span className="px-2 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-3 py-2 border rounded disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next ›
            </button>
            <button
              className="px-3 py-2 border rounded disabled:opacity-50"
              onClick={() => setPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              Last »
            </button>
            <select
              className="ml-3 border rounded px-2 py-2 text-sm"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[8, 12, 16, 20, 24].map((n) => (
                <option key={n} value={n}>
                  {n} / page
                </option>
              ))}
            </select>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Products;
