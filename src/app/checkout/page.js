// app/checkout/page.jsx

"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const initialCart = [
  {
    id: 1,
    name: "Fresh Strawberries",
    category: "Fruits",
    weight: "500g",
    price: 10,
    oldPrice: 12,
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
    oldPrice: 12,
    quantity: 2,
    image:
      "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export default function CheckoutPage() {
  const router = useRouter();

  const [cart] = useState(initialCart);
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    line1: "",
    city: "",
    zip: "",
  });
  const [delivery, setDelivery] = useState("standard");
  const [payment, setPayment] = useState("cod");

  const totals = useMemo(() => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const oldSubtotal = cart.reduce(
      (sum, item) => sum + item.oldPrice * item.quantity,
      0
    );
    const discount = oldSubtotal - subtotal;

    const deliveryFee = delivery === "express" ? 4 : 0;
    const total = subtotal + deliveryFee;

    return { subtotal, oldSubtotal, discount, deliveryFee, total };
  }, [cart, delivery]);

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // In real app you’d validate + send to backend here
    // For now, just go to a fake thank-you page or orders page
    router.push("/orders");
  };

  return (
    <main className="min-h-screen bg-[#F5F7FA] py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Checkout
            </h1>
            <p className="text-sm text-gray-500">
              Complete your order by providing your details
            </p>
          </div>
          <button
            onClick={() => router.push("/cart")}
            className="rounded-full bg-white border border-gray-200 text-gray-700 px-6 py-2 text-sm font-medium hover:border-green-600 hover:text-green-600 transition"
          >
            Back to Cart
          </button>
        </div>

        <form
          onSubmit={handlePlaceOrder}
          className="grid lg:grid-cols-[2fr,1fr] gap-6"
        >
          {/* Left side: forms */}
          <div className="space-y-4">
            {/* Address card */}
            <section className="bg-white rounded-3xl shadow-sm p-5">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Delivery Address
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Full name
                  </label>
                  <input
                    type="text"
                    required
                    value={address.fullName}
                    onChange={(e) =>
                      setAddress({ ...address, fullName: e.target.value })
                    }
                    className="w-full rounded-2xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={address.phone}
                    onChange={(e) =>
                      setAddress({ ...address, phone: e.target.value })
                    }
                    className="w-full rounded-2xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={address.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                    className="w-full rounded-2xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Mumbai"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    required
                    value={address.line1}
                    onChange={(e) =>
                      setAddress({ ...address, line1: e.target.value })
                    }
                    className="w-full rounded-2xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="House no, street, area"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Postal code
                  </label>
                  <input
                    type="text"
                    required
                    value={address.zip}
                    onChange={(e) =>
                      setAddress({ ...address, zip: e.target.value })
                    }
                    className="w-full rounded-2xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="400001"
                  />
                </div>
              </div>
            </section>

            {/* Delivery card */}
            <section className="bg-white rounded-3xl shadow-sm p-5">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Delivery Options
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDelivery("standard")}
                  className={`text-left border rounded-2xl px-4 py-3 text-sm transition ${
                    delivery === "standard"
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200 bg-white hover:border-green-500"
                  }`}
                >
                  <p className="font-semibold text-gray-900">
                    Standard Delivery
                  </p>
                  <p className="text-xs text-gray-500">
                    2-3 days, Free
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => setDelivery("express")}
                  className={`text-left border rounded-2xl px-4 py-3 text-sm transition ${
                    delivery === "express"
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200 bg-white hover:border-green-500"
                  }`}
                >
                  <p className="font-semibold text-gray-900">
                    Express Delivery
                  </p>
                  <p className="text-xs text-gray-500">
                    Same day, $4.00
                  </p>
                </button>
              </div>
            </section>

            {/* Payment card */}
            <section className="bg-white rounded-3xl shadow-sm p-5">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Payment Method
              </h2>
              <div className="space-y-2 text-sm">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={payment === "cod"}
                    onChange={() => setPayment("cod")}
                    className="h-4 w-4 text-green-600"
                  />
                  <span className="text-gray-800">
                    Cash on Delivery
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={payment === "upi"}
                    onChange={() => setPayment("upi")}
                    className="h-4 w-4 text-green-600"
                  />
                  <span className="text-gray-800">
                    UPI / Wallet (mock)
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={payment === "card"}
                    onChange={() => setPayment("card")}
                    className="h-4 w-4 text-green-600"
                  />
                  <span className="text-gray-800">
                    Credit / Debit Card (placeholder)
                  </span>
                </label>
              </div>
            </section>
          </div>

          {/* Right side: summary */}
          <aside className="bg-white rounded-3xl shadow-sm p-5 h-fit">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Order Summary
            </h2>

            <div className="space-y-2 mb-4 max-h-56 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-gray-800 text-xs font-medium">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-gray-400">
                        {item.weight} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Items total</span>
                <span className="font-medium text-gray-900">
                  ${totals.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Discount</span>
                <span className="font-medium text-green-600">
                  -${totals.discount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery</span>
                <span className="font-medium text-gray-900">
                  {totals.deliveryFee === 0
                    ? "Free"
                    : `$${totals.deliveryFee.toFixed(2)}`}
                </span>
              </div>

              <div className="border-t border-gray-100 pt-3 mt-2 flex justify-between items-center">
                <span className="font-semibold text-gray-900">
                  Grand Total
                </span>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    ${totals.total.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-400 line-through">
                    ${totals.oldSubtotal.toFixed(2)}
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-3 rounded-full transition"
              >
                Place Order
              </button>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
}
