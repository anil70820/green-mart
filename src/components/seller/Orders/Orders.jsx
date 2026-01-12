"use client";

import { useState, useMemo } from "react";
import StatusBadge from "../common/StatusBadge";
import OrderDetails from "./OrderDetails";
import OrdersCardSm from "./OrdersCardSm";

/* ------------------ MOCK DATA ------------------ */
const ORDERS = [
  {
    id: "ORD-3920",
    status: "Pending",
    customer: "Jane Doe",
    total: 45.5,
    time: "2 hrs ago",
    phone: "(555) 123-4567",
    address: "123 Green St, Apt 4B, Eco City, CA 90210",
    payment: "Visa •••• 4242",
    notes: "Please leave at the front door. Thank you!",
    items: [
      {
        name: "Organic Avocados",
        qty: 2,
        price: 2.5,
        image: "/assets/images/png/broccoli.png",
      },
      {
        name: "Organic Oranges",
        qty: 1,
        price: 40.5,
        image: "/assets/images/png/carrots.png",
      },
    ],
  },

  {
    id: "ORD-3921",
    status: "Packed",
    customer: "John Smith",
    total: 120,
    time: "5 hrs ago",
    phone: "(555) 222-9876",
    address: "89 Market Road, San Jose, CA 95112",
    payment: "Mastercard •••• 5588",
    notes: "Call before delivery.",
    items: [
      {
        name: "Apple",
        qty: 3,
        price: 10,
        image: "/assets/images/png/apple.png",
      },
      {
        name: "Cold Drinks",
        qty: 2,
        price: 45,
        image: "/assets/images/png/cold_drinks.png",
      },
    ],
  },

  {
    id: "ORD-3918",
    status: "Shipped",
    customer: "Emily White",
    total: 22,
    time: "1 day ago",
    phone: "(555) 111-3344",
    address: "742 Evergreen St, LA, CA 90001",
    payment: "Visa •••• 9012",
    notes: "Leave with security.",
    items: [
      {
        name: "Almond Milk",
        qty: 2,
        price: 11,
        image: "/assets/images/png/almond_milk.png",
      },
    ],
  },

  {
    id: "ORD-3899",
    status: "Delivered",
    customer: "Michael Brown",
    total: 56.8,
    time: "2 days ago",
    phone: "(555) 888-6677",
    address: "15 Lake View, Austin, TX 73301",
    payment: "Cash on Delivery",
    notes: "Delivered successfully.",
    items: [
      {
        name: "Broccoli",
        qty: 2,
        price: 28.4,
        image: "/assets/images/png/deals_broccoli_1.png",
      },
      {
        name: "Cauliflower",
        qty: 1,
        price: 0,
        image: "/assets/images/png/cauliflower.png",
      },
    ],
  },
];

const TABS = ["All", "Pending", "Packed", "Shipped", "Delivered"];

/* ------------------ COMPONENT ------------------ */
const Orders = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredOrders = useMemo(() => {
    if (activeTab === "All") return ORDERS;
    return ORDERS.filter((o) => o.status === activeTab);
  }, [activeTab]);

  return (
    <div className="h-[calc(100vh-80px)] bg-[#f6f8f6]">
      {/* ================= LEFT ================= */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* -------- TABS -------- */}
        <div className="px-4 py-3 shadow-sm">
          <div className="flex gap-3 overflow-x-auto">
            {TABS.map((tab) => {
              const count =
                tab === "All"
                  ? ORDERS.length
                  : ORDERS.filter((o) => o.status === tab).length;

              const active = activeTab === tab;

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`h-9 px-5 rounded-xl text-sm font-bold whitespace-nowrap transition
                    ${
                      active
                        ? "bg-[#13ec13] text-[#052e05]/70"
                        : "bg-white border border-gray-200 text-[#618961] hover:bg-gray-50"
                    }`}
                >
                  {tab} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* -------- TABLE -------- */}
        <div className="flex-1  p-4 max-sm:hidden">
          <div className="rounded-xl bg-white shadow ring-1 ring-black/5 overflow-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 dark:bg-surface-dark sticky top-0 z-10">
                <tr>
                  <th className="p-3 pl-4 py-3.5 text-left text-base font-semibold text-gray-900 dark:text-white min-w-20">
                    Sr. No.
                  </th>
                  <th
                    className="py-3.5 text-left text-base font-semibold text-gray-900 dark:text-white min-w-30"
                    scope="col"
                  >
                    <div className="group inline-flex cursor-pointer">
                      Order ID
                    </div>
                  </th>
                  <th
                    className="py-3.5 text-left text-base font-semibold text-gray-900 dark:text-white min-w-30"
                    scope="col"
                  >
                    <div className="group inline-flex cursor-pointer">
                      Status
                    </div>
                  </th>
                  <th
                    className="py-3.5 text-left text-base font-semibold text-gray-900 dark:text-white min-w-30"
                    scope="col"
                  >
                    <div className="group inline-flex cursor-pointer">
                      Customer
                    </div>
                  </th>
                  <th
                    className="py-3.5 text-left text-base font-semibold text-gray-900 dark:text-white min-w-30"
                    scope="col"
                  >
                    Total
                  </th>
                  <th
                    className="py-3.5 text-left text-base font-semibold text-gray-900 dark:text-white min-w-20"
                    scope="col"
                  >
                    <span>Actions</span>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-surface-light dark:bg-surface-dark">
                {filteredOrders.map((order, index) => (
                  <tr
                    key={order.id}
                    className={`
                      ${
                        selectedOrder?.id === order.id ? "bg-[#13ec13]/10" : ""
                      }`}
                  >
                    <td className="p-3 pl-4 min-w-10 text-start  font-medium">
                      {index + 1}
                    </td>
                    <td className="py-3.5 font-medium sm:text-base text-sm">
                      #{order.id}
                    </td>
                    <td>
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="font-medium sm:text-base text-sm">
                      {order.customer}
                    </td>
                    <td className="text-left pr-4 font-medium sm:text-base text-sm">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pr-4 text-left text-sm font-medium sm:pr-6">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setIsSidebarOpen(true);
                        }}
                        className="text-green-500 hover:text-green-600/50 dark:hover:text-green-400 cursor-pointer"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= RIGHT SIDEBAR ================= */}
      <OrderDetails
        order={selectedOrder}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="sm:hidden p-4 flex flex-col gap-4">
        {filteredOrders.map((order) => (
          <OrdersCardSm key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
