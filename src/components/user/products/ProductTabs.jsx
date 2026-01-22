"use client";
import { useState } from "react";

const tabs = ["Description", "Specifications", "Eco Impact", "Shipping"];

export default function ProductTabs() {
  const [active, setActive] = useState("Description");

  return (
    <section className="mb-16 scrollbar_hidden">
      <div className="flex mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-6 py-3 font-semibold rounded text-nowrap ${
              active === tab
                ? "border-b-2 border-[#13ec13] text-[#13ec13] bg-green-500/10"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="text-gray-600">{active} content goes here…</div>
    </section>
  );
}
