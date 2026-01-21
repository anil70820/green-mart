import React from "react";

const recentOrders = [
  {
    id: "12345",
    items: 2,
    time: "Just now",
    amount: "$45.00",
    status: "pending",
  },
  {
    id: "12344",
    items: 1,
    time: "2 hrs ago",
    amount: "$120.50",
    status: "shipped",
  },
  {
    id: "12340",
    items: 4,
    time: "Yesterday",
    amount: "$210.00",
    status: "delivered",
  },
];

/* =====================
   STATUS CONFIG
===================== */
const statusConfig = {
  pending: {
    label: "Pending",
    icon: "package_2",
    badge:
      "bg-orange-50 text-orange-700 ring-orange-600/20 dk:bg-orange-900/20 dk:text-orange-300 dk:ring-orange-500/20",
  },
  shipped: {
    label: "Shipped",
    icon: "local_shipping",
    badge:
      "bg-green-50 text-green-700 ring-green-600/20 dk:bg-green-900/20 dk:text-green-300 dk:ring-green-500/20",
  },
  delivered: {
    label: "Delivered",
    icon: "check_circle",
    badge:
      "bg-gray-50 text-gray-600 ring-gray-500/10 dk:bg-gray-400/10 dk:text-gray-400 dk:ring-gray-400/20",
  },
};

const RecentOrders = () => {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg text-[#111811] dk:text-[#e0e6e0]">
          Recent Orders
        </h3>
        <a
          href="#"
          className="text-sm font-semibold text-[#0a3d0a] dk:text-[#13ec13]"
        >
          See All
        </a>
      </div>

      {/* Orders */}
      <div className="flex flex-col gap-3">
        {recentOrders.map((order) => {
          const config = statusConfig[order.status];

          return (
            <div
              key={order.id}
              className={`flex items-center justify-between bg-white dk:bg-[#1a2e1a] p-4 rounded-xl border border-gray-100 dk:border-gray-800 shadow-sm ${
                order.status === "delivered" ? "opacity-70" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-100 dk:bg-gray-800 flex items-center justify-center text-[#525c52] dk:text-[#a0baa0]">
                  <span className="material-symbols-outlined text-[20px]">
                    {config.icon}
                  </span>
                </div>

                <div>
                  <p className="font-bold text-sm text-[#111811] dk:text-[#e0e6e0]">
                    Order #{order.id}
                  </p>
                  <p className="text-xs text-[#525c52] dk:text-[#a0baa0]">
                    {order.items} items • {order.time}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <p className="font-bold text-sm text-[#111811] dk:text-[#e0e6e0]">
                  {order.amount}
                </p>

                <span
                  className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${config.badge}`}
                >
                  {config.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentOrders;
