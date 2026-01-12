"use client";
import { useState } from "react";
import ImageUploader from "./ImageUploader";

const AddNewProduct = () => {
  const [images, setImages] = useState([]);

  return (
    <main className="p-6 bg-[#f6f8f6] dark:bg-[#102210] min-h-[calc(100vh-73px)]">
      <div className="grid md:grid-cols-2 gap-6">
        <section className="rounded-2xl bg-[#ffffff] dark:bg-[#162b16] p-5">
          <h2 className="text-lg font-bold text-[#111811] dark:text-[#e8f5e8] mb-4">
            Product Images
          </h2>
          <ImageUploader images={images} setImages={setImages} />
        </section>
        <section className="rounded-2xl bg-[#ffffff] dark:bg-[#162b16] p-5 space-y-4">
          <h2 className="text-lg font-bold text-[#111811] dark:text-[#e8f5e8]">
            Basic Details
          </h2>

          <input
            placeholder="Product Name"
            className="h-12 w-full rounded-xl bg-[#f0f4f0] dark:bg-[#1c331c]
            px-4 text-sm text-[#111811] dark:text-[#e8f5e8]"
          />

          <select className="h-12 w-full rounded-xl bg-[#f0f4f0] dark:bg-[#1c331c] px-4">
            <option>Fruits</option>
            <option>Vegetables</option>
          </select>
        </section>
        <section className="rounded-2xl bg-[#ffffff] dark:bg-[#162b16] p-5 space-y-4">
          <h2 className="text-lg font-bold text-[#111811] dark:text-[#e8f5e8]">
            Pricing & Stock
          </h2>

          <input
            type="number"
            placeholder="Price"
            className="h-12 w-full rounded-xl bg-[#f0f4f0] dark:bg-[#1c331c] px-4"
          />

          <input
            type="number"
            placeholder="Weight (kg / gm)"
            className="h-12 w-full rounded-xl bg-[#f0f4f0] dark:bg-[#1c331c] px-4"
          />

          <input
            type="number"
            placeholder="Stock Quantity"
            className="h-12 w-full rounded-xl bg-[#f0f4f0] dark:bg-[#1c331c] px-4"
          />
        </section>
        <section
          className="flex flex-col gap-4 rounded-2xl
      bg-[#ffffff] dark:bg-[#162b16]
      p-5 shadow-sm ring-1 ring-black/5 dark:ring-white/5"
        >
          <h2 className="text-lg font-bold text-[#111811] dark:text-[#e8f5e8]">
            Description
          </h2>

          <div className="flex flex-col gap-2">
            <textarea
              rows={8}
              placeholder="Describe the key features, benefits, and usage of your product..."
              className="w-full resize-none rounded-xl border-none
          bg-[#f0f4f0] dark:bg-[#1c331c]
          p-4 text-sm font-medium
          text-[#111811] dark:text-[#e8f5e8]
          placeholder:text-[#637563] dark:placeholder:text-[#a0b2a0]
          focus:ring-2 focus:ring-[#13ec13]/50 transition-all"
            />
          </div>
        </section>
        <section className="rounded-2xl bg-[#ffffff] dark:bg-[#162b16] p-5 grid grid-cols-2 gap-4 sm:min-h-50 min-h-20">
          <button className="rounded-xl border border-black/10 dark:border-white/10 py-3 h-12 cursor-pointer">
            Save Draft
          </button>
          <button className="rounded-xl bg-[#13ec13] text-[#052e05] py-3 font-bold h-12 cursor-pointer">
            Publish
          </button>
        </section>
      </div>
    </main>
  );
};

export default AddNewProduct;
