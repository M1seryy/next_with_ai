"use client";
import React, { useState } from "react";
import ProductCard from "../ProductCard";
import { Sneaker } from "@/types";
import rawData from "@/app/data";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Sneaker[]>(
    Object.values(rawData as Record<string, Sneaker>)
  );

  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};

export default Products;
