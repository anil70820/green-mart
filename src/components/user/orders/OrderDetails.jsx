// app/orders/[id]/page.jsx

"use client";

import { useRouter, useParams } from "next/navigation";
import { useMemo } from "react";

// In a real app this would come from API or global state
const mockOrders = [
  {
    id: "ORD-1002",
    date: "2025-12-10",
    status: "Pending",
    paymentStatus: "Paid",
    paymentMethod: "Cash on Delivery",
    customer: {
      name: "John Doe",
      phone: "+91 98765 43210",
      addressLine: "House 21, Green Street",
      city: "Mumbai",
      zip: "400001",
    },
    items: [
      {
        id: 1,
        name: "Fresh Strawberries",
        category: "Fruits",
        weight: "500g",
        price: 10,
        quantity: 1,
        image:
          "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        id: 2,
        name: "Fresh Cauliflower",
        category: "Vegetables",
        weight: "500g",
        price: 10,
        quantity: 2,
        image:
          "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    deliveryFee: 0,
    discount: 6,
  },
  {
    id: "ORD-1003",
    date: "2025-12-11",
    status: "Canceled",
    paymentStatus: "Paid",
    paymentMethod: "UPI",
    customer: {
      name: "Sarah Lee",
      phone: "+91 98765 11111",
      addressLine: "Flat 502, Ocean View",
      city: "Pune",
      zip: "411001",
    },
    items: [
      {
        id: 3,
        name: "Fresh Almond Milk",
        category: "Dairy & Beverages",
        weight: "1Liter",
        price: 5,
        quantity: 3,
        image:
          "https://images.pexels.com/photos/3735146/pexels-photo-3735146.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    deliveryFee: 4,
    discount: 3,
  },
  {
    id: "ORD-1004",
    date: "2025-12-11",
    status: "Processing",
    paymentStatus: "Paid",
    paymentMethod: "UPI",
    customer: {
      name: "Sarah Lee",
      phone: "+91 98765 11111",
      addressLine: "Flat 502, Ocean View",
      city: "Pune",
      zip: "411001",
    },
    items: [
      {
        id: 3,
        name: "Fresh Almond Milk",
        category: "Dairy & Beverages",
        weight: "1Liter",
        price: 5,
        quantity: 3,
        image:
          "https://images.pexels.com/photos/3735146/pexels-photo-3735146.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    deliveryFee: 4,
    discount: 3,
  },
];

// derive initialOrders from mockOrders
const initialOrders = mockOrders.map((order) => {
  const itemsCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const itemsTotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = itemsTotal + order.deliveryFee - order.discount;

  return {
    id: order.id,
    date: order.date,
    status: order.status,
    itemsCount,
    total,
    payment: order.paymentStatus,
    thumbnail: order.items[0]?.image || "",
  };
});

const statusSteps = ["Placed", "Processing", "Shipped", "Delivered"];

const statusColors = {
  Delivered: "bg-emerald-50 text-emerald-600 border-emerald-100",
  Processing: "bg-blue-50 text-blue-600 border-blue-100",
  Pending: "bg-amber-50 text-amber-600 border-amber-100",
  Canceled: "bg-red-50 text-red-500 border-red-100",
};

const OrderDetails = () => {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id;

  const order = mockOrders.find((o) => o.id === orderId) || mockOrders[0]; // fallback

  const prices = useMemo(() => {
    const itemsTotal = order.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const total = itemsTotal + order.deliveryFee - order.discount;
    return { itemsTotal, total };
  }, [order]);

  // For timeline: decide current step based on status
  const statusStepIndexMap = {
    Placed: 0,
    Pending: 0,
    Processing: 1,
    Shipped: 2,
    Delivered: 3,
    Canceled: 3,
  };

  const currentStepIndex = statusStepIndexMap[order.status] ?? 0;

  return (
    <main className="min-h-screen bg-[#F5F7FA] py-10">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Order Details
            </h1>
            <p className="text-sm text-gray-500">Order ID: {order.id}</p>
          </div>
          <button
            onClick={() => router.push("/orders")}
            className="rounded-full bg-white border border-gray-200 text-gray-700 px-6 py-2 text-sm font-medium hover:border-green-600 hover:text-green-600 transition"
          >
            Back to Orders
          </button>
        </div>

        <div className="grid lg:grid-cols-[2fr,1fr] gap-6">
          {/* Left column */}
          <div className="space-y-4">
            {/* Status + basic info */}
            <section className="bg-white rounded-3xl shadow-sm p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs text-gray-400">
                    Placed on {order.date}
                  </p>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Delivery to {order.customer.name}
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    {order.customer.addressLine}, {order.customer.city}{" "}
                    {order.customer.zip}
                  </p>
                  <p className="text-xs text-gray-500">
                    Phone: {order.customer.phone}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={
                      "inline-block text-[11px] font-semibold px-3 py-1 rounded-full border " +
                      (statusColors[order.status] ||
                        "bg-gray-50 text-gray-600 border-gray-100")
                    }
                  >
                    {order.status}
                  </span>
                  <p className="mt-2 text-xs text-gray-500">
                    Payment:{" "}
                    <span className="font-semibold text-gray-800">
                      {order.paymentStatus}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Method:{" "}
                    <span className="font-semibold text-gray-800">
                      {order.paymentMethod}
                    </span>
                  </p>
                </div>
              </div>

              {/* Status timeline */}
              <div className="mt-4">
                <p className="text-xs font-medium text-gray-600 mb-3">
                  Order progress
                </p>
                <div className="flex items-center justify-between">
                  {statusSteps.map((step, index) => {
                    const isActive = index <= currentStepIndex;
                    const isLast = index === statusSteps.length - 1;

                    // if order is canceled, override the last label to "Canceled"
                    const label =
                      order.status === "Canceled" && isLast ? "Canceled" : step;

                    return (
                      <div key={step} className="flex-1 flex items-center">
                        <div className="flex flex-col items-center">
                          <div
                            className={
                              "w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold " +
                              (isActive
                                ? "bg-green-600 text-white"
                                : "bg-gray-200 text-gray-500")
                            }
                          >
                            {index + 1}
                          </div>
                          <span className="mt-1 text-[11px] text-gray-600">
                            {label}
                          </span>
                        </div>
                        {index < statusSteps.length - 1 && (
                          <div
                            className={
                              "flex-1 h-0.5 mx-1 -mt-5 " +
                              (index < currentStepIndex
                                ? "bg-green-500"
                                : "bg-gray-200")
                            }
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Items list */}
            <section className="bg-white rounded-3xl shadow-sm p-5">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Items in this order
              </h2>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-gray-400">
                        {item.category} • {item.weight}
                      </p>
                      <p className="text-[11px] text-gray-500 mt-1">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right text-sm">
                      <p className="font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-[11px] text-gray-400">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right column: price summary */}
          <aside className="bg-white rounded-3xl shadow-sm p-5 h-fit">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Price Summary
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">
                  Items total (
                  {order.items.reduce((sum, i) => sum + i.quantity, 0)} items)
                </span>
                <span className="font-medium text-gray-900">
                  ${prices.itemsTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery fee</span>
                <span className="font-medium text-gray-900">
                  {order.deliveryFee === 0
                    ? "Free"
                    : `$${order.deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Discount</span>
                <span className="font-medium text-green-600">
                  -${order.discount.toFixed(2)}
                </span>
              </div>

              <div className="border-t border-gray-100 pt-3 mt-2 flex justify-between items-center">
                <span className="font-semibold text-gray-900">Total</span>
                <p className="text-lg font-semibold text-gray-900">
                  ${prices.total.toFixed(2)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => router.push("/")}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-3 rounded-full transition"
              >
                Continue Shopping
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default OrderDetails;
