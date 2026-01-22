"use client";

export default function ProductInfo({ product }) {
  return (
    <div>
      <p className="text-sm font-semibold text-[#13ec13] uppercase">
        {product.brand}
      </p>

      <h1 className="text-3xl font-bold mt-2 mb-4">
        {product.title}
      </h1>

      <div className="flex items-center gap-3 mb-4">
        <span className="text-4xl font-bold">${product.price}</span>
        <span className="line-through text-gray-400">${product.mrp}</span>
      </div>
    </div>
  );
}
