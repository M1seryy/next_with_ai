"use client";
import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "../ProductCard";
import { Sneaker } from "@/types";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Sneaker[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const [allBrands, setAllBrands] = useState<string[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [allSizes, setAllSizes] = useState<string[]>([]);

  const brands = useMemo(() => allBrands, [allBrands]);

  const categories = useMemo(() => allCategories, [allCategories]);

  const sizes = useMemo(() => allSizes, [allSizes]);

  // Pagination
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(12);

  // Fetch products from backend with filters + pagination
  useEffect(() => {
    const controller = new AbortController();
    async function run() {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedBrands.length)
          params.set("brands", selectedBrands.join(","));
        if (selectedCategories.length)
          params.set("categories", selectedCategories.join(","));
        if (selectedSizes.length) params.set("sizes", selectedSizes.join(","));
        params.set("page", String(page));
        params.set("pageSize", String(pageSize));

        const res = await fetch(`/api/products?${params.toString()}`, {
          signal: controller.signal,
        });
        const json = await res.json();
        setProducts(json.items || []);
        setTotalItems(json.total || 0);
      } catch (e) {
        if (!(e instanceof DOMException && e.name === "AbortError")) {
          console.error(e);
        }
      } finally {
        setIsLoading(false);
      }
    }
    run();
    return () => controller.abort();
  }, [selectedBrands, selectedCategories, selectedSizes, page, pageSize]);

  // Initial fetch to build filter options (brands/categories/sizes)
  useEffect(() => {
    const controller = new AbortController();
    async function run() {
      try {
        const res = await fetch(`/api/products?page=1&pageSize=500`, {
          signal: controller.signal,
        });
        const json = await res.json();
        console.log(json);
        const items: Sneaker[] = json.items || [];
        const brandSet = new Set<string>();
        const catSet = new Set<string>();
        const sizeSet = new Set<string>();
        items.forEach((p) => {
          brandSet.add(p.brand);
          catSet.add(p.category);
          p.sizes?.forEach((s) => sizeSet.add(s));
        });
        setAllBrands(Array.from(brandSet).sort());
        setAllCategories(Array.from(catSet).sort());
        const computedSizes = sizeSet.size
          ? Array.from(sizeSet).sort()
          : ["6", "7", "8", "9", "10", "11", "12"];
        setAllSizes(computedSizes);
      } catch (e) {
        if (!(e instanceof DOMException && e.name === "AbortError")) {
          console.error(e);
        }
      }
    }
    run();
    return () => controller.abort();
  }, []);

  // Reset page when filters change
  React.useEffect(() => {
    setPage(1);
  }, [selectedBrands, selectedCategories, selectedSizes]);

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const paginated = products; // API already returns the correct slice

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
          {isLoading && products.length === 0
            ? Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-72 rounded-2xl bg-gray-100 animate-pulse"
                />
              ))
            : paginated.map((p) => <ProductCard key={p.id} product={p} />)}
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
