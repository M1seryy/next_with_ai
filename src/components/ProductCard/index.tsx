// src/components/Products/ProductCard.tsx
import Image from "next/image";
import React from "react";
import { Sneaker } from "@/types";

type Props = { product: Sneaker };

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="group border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-md transition-all duration-200 hover:shadow-2xl hover:-translate-y-0.5 hover:border-gray-200">
      <div className="relative w-full h-56 bg-gray-50">
        <Image
          src={product.imageURL}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        {!product.is_in_inventory && (
          <span className="absolute top-3 left-3 text-[11px] uppercase tracking-wide bg-gray-900/80 text-white px-2 py-1 rounded">
            Out of stock
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium tracking-wide text-gray-500">
            {product.brand}
          </span>
          <span className="text-indigo-600 font-semibold">
            ${product.price}
          </span>
        </div>
        <div className="mt-1 font-semibold text-gray-900 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-[11px] px-2 py-1 rounded-full bg-gray-100 text-gray-600">
            {product.category}
          </span>
          <span className="text-[11px] px-2 py-1 rounded-full bg-gray-100 text-gray-600">
            {product.gender}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
