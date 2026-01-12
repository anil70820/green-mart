"use client";

import { useMemo, useState } from "react";
import ProductsListSm from "./ProductsListSm";

const PRODUCTS = [
  {
    id: 1,
    name: "Organic Avocados",
    sku: "12345",
    category: "Fresh Produce",
    price: 2.5,
    stock: 145,
    status: "active",
  },
  {
    id: 2,
    name: "Bamboo Toothbrush",
    sku: "67890",
    category: "Personal Care",
    price: 5,
    stock: 12,
    status: "low stock",
  },
  {
    id: 3,
    name: "Metal Water Bottle",
    sku: "99821",
    category: "Accessories",
    price: 15,
    stock: 0,
    status: "inactive",
  },
];
const ProductsList = () => {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");

  /* ================= FILTER ================= */
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.includes(search);

      const matchTab =
        tab === "all" ||
        (tab === "low" && p.stock > 0 && p.stock <= 20) ||
        (tab === "active" && p.status === "active") ||
        (tab === "inactive" && p.status === "inactive");

      return matchSearch && matchTab;
    });
  }, [search, tab]);

  return (
    <div className="px-5 mt-2 pt-3 pb-5 overflow-y-auto h-[calc(100vh-90px)]">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ===== TOP FILTER BAR ===== */}
        <div className="dark:bg-[#102210] pb-4">
          <div className="flex gap-4 mb-3">
            {/* Search */}
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#618961] material-symbols-outlined">
                search
              </span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, SKU..."
                className="w-full rounded-xl bg-white dark:bg-[#1a331a] py-2.5 pl-10 pr-4
              text-sm text-[#111811] dark:text-[#e0e6e0]
              border border-gray-200 focus:border-[#13ec13] outline-none"
              />
            </div>

            <button className="rounded-xl bg-[#13ec13] px-5 py-2.5 text-white font-medium">
              + Add Product
            </button>
          </div>
          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto">
            {[
              { key: "all", label: "All Items" },
              { key: "low", label: "Low Stock" },
              { key: "active", label: "Active" },
              { key: "inactive", label: "Inactive" },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap
              ${
                tab === t.key
                  ? "bg-[#13ec13] text-white"
                  : "bg-white dark:bg-[#1a331a] text-[#618961] border border-gray-200 dark:border-gray-700"
              }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* ===== TABLE ===== */}
        <div className="max-sm:hidden flex-1 overflow-auto rounded-xl bg-white dark:bg-[#1a331a] ring-1 ring-gray-100 dark:ring-gray-800">
          <table className="min-w-full">
            <thead className="sticky top-0 bg-gray-50 dark:bg-gray-800 z-10">
              <tr className="text-xs text-[#618961]">
                <th className="p-3 flex items-center justify-start">Sr. No.</th>
                <th className="text-left">Product</th>
                <th className="text-left">SKU</th>
                <th className="text-left">Category</th>
                <th className="text-left">Price</th>
                <th className="text-left">Stock</th>
                <th className="text-left">Status</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((p, index) => (
                <tr
                  key={p.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="p-3 min-w-16 font-medium ps-4">
                    {index + 1}
                  </td>
                  <td className="font-medium text-[#111811] dark:text-[#e0e6e0] min-w-50">
                    {p.name}
                  </td>
                  <td className="text-[#618961] min-w-24">{p.sku}</td>
                  <td className="text-[#618961] min-w-40">{p.category}</td>
                  <td className="min-w-20">${p.price}</td>
                  <td className="min-w-20">{p.stock}</td>
                  <td className="min-w-30">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium capitalize
                    ${
                      p.status === "active"
                        ? "bg-green-100 text-green-700"
                        : p.status === "low stock"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="text-right pr-4">⋮</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* ======= MOBILE VIEW ==== */}
        <div className="flex flex-col gap-3 sm:hidden">
          {filteredProducts.map((product) => (
            <ProductsListSm key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
