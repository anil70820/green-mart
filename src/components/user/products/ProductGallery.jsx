"use client";
import { useState } from "react";

export default function ProductGallery({ images }) {
  const [active, setActive] = useState(images[0]);

  return (
    <div className="flex lg:flex-col sm:gap-4 gap-3">
      <div className="w-full rounded-xl bg-gray-100 bg-cover bg-center transition-all overflow-hidden">
        <img className="w-full h-full aspect-4/3 duration-500 hover:scale-105" src={active} alt="product" />
      </div>
      <div className="grid lg:grid-cols-5 sm:gap-3 gap-2">
        {images.map((img) => (
          <button
            key={img}
            onClick={() => setActive(img)}
            className={`aspect-square w-18 sm:w-30 lg:w-full sm:rounded-lg rounded border overflow-hidden transition-all duration-300 ${
              active === img
                ? "border-[#13ec13]"
                : "border-transparent hover:border-gray-300"
            }`}
          >
        <img src={img} alt="product"/>
          </button>
        ))}
      </div>
    </div>
  );
}
