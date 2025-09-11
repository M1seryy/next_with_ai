"use client";
import React, { useMemo, useState } from "react";
import ProductCard from "../ProductCard";
import { Sneaker } from "@/types";
import rawData from "@/app/data";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Sneaker[]>(
    Object.values(rawData as Record<string, Sneaker>)
  );

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const brands = useMemo(() => {
    return [...Array.from(new Set(products.map((p) => p.brand))).sort()];
  }, [products]);

  const categories = useMemo(() => {
    return [...Array.from(new Set(products.map((p) => p.category))).sort()];
  }, [products]);

  const sizes = useMemo(() => {
    const collected = new Set<string>();
    products.forEach((p) => p.sizes?.forEach((s) => collected.add(s)));
    if (collected.size === 0) {
      return ["6", "7", "8", "9", "10", "11", "12"];
    }
    return [...Array.from(collected).sort()];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const brandSet = new Set(selectedBrands.map((b) => b.trim().toLowerCase()));
    const catSet = new Set(
      selectedCategories.map((c) => c.trim().toLowerCase())
    );
    return products.filter((p) => {
      const pBrand = p.brand.trim().toLowerCase();
      const pCat = p.category.trim().toLowerCase();

      const matchesBrand = brandSet.size === 0 || brandSet.has(pBrand);
      const matchesCategory = catSet.size === 0 || catSet.has(pCat);
      const matchesSize =
        selectedSizes.length === 0 ||
        (Array.isArray(p.sizes) &&
          p.sizes.some((s) => selectedSizes.includes(s)));
      return matchesBrand && matchesCategory && matchesSize;
    });
  }, [products, selectedBrands, selectedCategories, selectedSizes]);

  // Pagination
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(12);

  // Reset page when filters change
  React.useEffect(() => {
    setPage(1);
  }, [selectedBrands, selectedCategories, selectedSizes]);

  const totalItems = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const paginated = filteredProducts.slice(start, end);

  return (
    <div className="mt-8 lg:flex lg:items-start lg:gap-8">
      <aside className="mb-6 lg:mb-0 lg:w-64 lg:shrink-0">
        <div className="sticky top-4 border border-gray-100 rounded-2xl p-5 bg-white shadow-md ">
          <div className="space-y-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                Brand
              </div>
              <div className="flex flex-col gap-2 max-h-56 overflow-auto pr-1">
                {brands.map((b) => {
                  const checked = selectedBrands.includes(b);
                  return (
                    <label
                      key={b}
                      className="inline-flex items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        checked={checked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedBrands((prev) => [...prev, b]);
                          } else {
                            setSelectedBrands((prev) =>
                              prev.filter((x) => x !== b)
                            );
                          }
                        }}
                      />
                      {b}
                    </label>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                Category
              </div>
              <div className="flex flex-col gap-2">
                {categories.map((c) => {
                  const checked = selectedCategories.includes(c);
                  return (
                    <label
                      key={c}
                      className="inline-flex items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        checked={checked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCategories((prev) => [...prev, c]);
                          } else {
                            setSelectedCategories((prev) =>
                              prev.filter((x) => x !== c)
                            );
                          }
                        }}
                      />
                      {c}
                    </label>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                Sizes
              </div>
              <div className="flex flex-wrap gap-3">
                {sizes.map((s) => {
                  const checked = selectedSizes.includes(s);
                  return (
                    <label
                      key={s}
                      className="inline-flex items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        checked={checked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedSizes((prev) => [...prev, s]);
                          } else {
                            setSelectedSizes((prev) =>
                              prev.filter((x) => x !== s)
                            );
                          }
                        }}
                      />
                      {s}
                    </label>
                  );
                })}
              </div>
            </div>
            <button
              className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 shadow-sm"
              onClick={() => {
                setSelectedBrands([]);
                setSelectedCategories([]);
                setSelectedSizes([]);
              }}
            >
              Reset filters
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginated.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-10 mb-12 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs sm:text-sm text-gray-500">
            Showing {totalItems === 0 ? 0 : start + 1}-
            {Math.min(end, totalItems)} of {totalItems}
          </div>
          <div className="flex items-center gap-2">
            <button
              aria-label="First page"
              className="h-9 px-3 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white shadow-sm"
              onClick={() => setPage(1)}
              disabled={currentPage === 1}
            >
              «
            </button>
            <button
              aria-label="Previous page"
              className="h-9 px-3 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white shadow-sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              ‹
            </button>
            <span className="mx-2 text-sm text-gray-700">
              {currentPage} / {totalPages}
            </span>
            <button
              aria-label="Next page"
              className="h-9 px-3 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white shadow-sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              ›
            </button>
            <button
              aria-label="Last page"
              className="h-9 px-3 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white shadow-sm"
              onClick={() => setPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              »
            </button>
            <select
              aria-label="Items per page"
              className="ml-2 h-9 rounded-lg border border-gray-200 bg-white px-2 text-sm text-gray-700 hover:bg-gray-50 shadow-sm"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[8, 12, 16, 20, 24].map((n) => (
                <option key={n} value={n}>
                  {n}/page
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
