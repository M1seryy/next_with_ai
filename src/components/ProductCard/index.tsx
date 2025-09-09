// src/components/Products/ProductCard.tsx
import Image from "next/image";
import React from "react";
import { Sneaker } from "@/types";

type Props = { product: Sneaker };

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white">
      <div className="relative w-full h-52">
        <Image
          src={product.imageURL}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>
      <div className="p-4">
        <div className="text-sm text-gray-500">{product.brand}</div>
        <div className="font-semibold mt-1">{product.name}</div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-blue-600 font-bold">${product.price}</span>
          {!product.is_in_inventory && (
            <span className="text-xs px-2 py-1 bg-gray-200 rounded">
              Out of stock
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
