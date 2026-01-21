// app/orders/page.jsx

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const initialOrders = [
  {
    id: "ORD-1002",
    date: "2025-12-11",
    status: "Pending",
    itemsCount: 3,
    total: 32.5,
    payment: "Awaiting payment",
    thumbnail:
      "https://images.pexels.com/photos/3735153/pexels-photo-3735153.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "ORD-1003",
    date: "2025-12-12",
    status: "Canceled",
    itemsCount: 2,
    total: 21.0,
    payment: "Refunded",
    thumbnail:
      "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "ORD-1004",
    date: "2025-12-13",
    status: "Processing",
    itemsCount: 4,
    total: 44.9,
    payment: "Paid",
    thumbnail:
      "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const statusStyles = {
  Delivered: "bg-emerald-50 text-emerald-600 border-emerald-100",
  Processing: "bg-blue-50 text-blue-600 border-blue-100",
  Pending: "bg-amber-50 text-amber-600 border-amber-100",
  Canceled: "bg-red-50 text-red-500 border-red-100",
};

export default function OrdersPage() {
  const [orders] = useState(initialOrders);
  const [activeFilter, setActiveFilter] = useState("All");
  const router = useRouter();
  const filters = ["All", "Delivered", "Processing", "Pending", "Canceled"];

  const filteredOrders =
    activeFilter === "All"
      ? orders
      : orders.filter((o) => o.status === activeFilter);

  return (
    <div className="bg-[#F5F7FA] py-10">
      <div className="xl:max-w-285 xl:px-0 px-5 mx-auto container">
        {/* Header */}
       <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">My Orders</h1>
            <p className="text-sm text-gray-500">
              Track and manage all your orders
            </p>
          </div>
          <Link href="/" className="rounded-full bg-green-600 text-white px-6 py-2 text-sm font-medium hover:bg-green-700 transition">
            Back to Shop
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map((f) => {
            const isActive = f === activeFilter;
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={
                  "px-4 py-1.5 text-xs rounded-full border transition " +
                  (isActive
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-green-500 hover:text-green-600")
                }
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Orders list */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-6 text-center text-gray-500">
            No orders found for this status.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl shadow-sm p-4 flex sm:items-center gap-4 sm:flex-row flex-col"
              >
                {/* Thumbnail */}
                <div className="sm:w-24 sm:h-30 w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                  <img
                    src={order.thumbnail}
                    alt={order.id}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Order info */}
                <div className="flex flex-col flex-1 justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-gray-400">Order ID</p>
                      <h2 className="text-sm font-semibold text-gray-900">
                        {order.id}
                      </h2>
                      <p className="text-xs text-gray-400 mt-1">
                        Placed on {order.date}
                      </p>
                    </div>

                    {/* Status badge */}
                    <span
                      className={
                        "text-[11px] font-semibold px-3 py-1 rounded-full border " +
                        statusStyles[order.status]
                      }
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* Bottom row */}
                  <div className="mt-3 flex justify-between sm:items-start items-center">
                    <div className="text-xs text-gray-500">
                      <p>
                        Items:{" "}
                        <span className="font-semibold text-gray-800">
                          {order.itemsCount}
                        </span>
                      </p>
                      <p>
                        Payment:{" "}
                        <span className="font-semibold text-gray-800">
                          {order.payment}
                        </span>
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-gray-400">Order total</p>
                      <p className="text-lg font-semibold text-gray-900">
                        ${order.total.toFixed(2)}
                      </p>
                      <button
                        onClick={() => router.push(`/my-orders/${order.id}`)}
                        className="mt-1 text-xs text-green-600 hover:text-green-700"
                      >
                        View details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
