// app/checkout/page.jsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/axios";
import { toast } from "react-toastify";

const CheckOut = () => {
  const router = useRouter();

  const [cartCheckout, setCartCheckout] = useState({
    items: [],
    pricing: {
      subtotal: 0,
      discount: 0,
      shipping: 0,
      total: 0,
    },
  });

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [delivery, setDelivery] = useState("standard");
  const [payment, setPayment] = useState("cod");
  useEffect(() => {
    if (window.Razorpay) return; // duplicate load se bachne ke liye

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      console.log("Razorpay SDK loaded");
    };
    document.body.appendChild(script);
  }, []);
  const fetchItems = async () => {
    try {
      const res = await api.get("/checkout/preview-ordered-product");
      setCartCheckout({
        items: res.data.items,
        pricing: res.data.pricing,
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchItems();
  }, []);
  const validateCheckout = () => {
    const { name, phone, street, city, state, pincode } = address;

    if (!name || !phone || !street || !city || !state || !pincode) {
      toast.error("Please fill all address fields");
      return false;
    }

    if (phone.length !== 10) {
      toast.error("Invalid phone number");
      return false;
    }

    if (pincode.length !== 6) {
      toast.error("Invalid pincode");
      return false;
    }

    return true;
  };

  const handleCheckout = async () => {
    try {
      // ✅ 1. Validate form fields
      const { name, phone, street, city, state, pincode } = address;
      if (!name || !phone || !street || !city || !pincode) {
        toast.error("Please fill all address fields");
        return;
      }
      if (phone.length !== 10) {
        toast.error("Invalid phone number");
        return;
      }
      if (pincode.length !== 6) {
        toast.error("Invalid pincode");
        return;
      }

      if (!payment) {
        toast.error("Select a payment method");
        return;
      }

      // ✅ 2. Prepare payload for backend
      const payload = {
        address: {
          name,
          phone,
          street,
          city,
          state: state || "NA", // make sure not empty
          pincode,
        },
        paymentMethod: payment, // COD | UPI | CARD
        deliveryType: delivery, // standard | express
      };

      // ✅ 3. Create Order in DB
      const orderRes = await api.post("/checkout/create-order", payload);
      const dbOrderId = orderRes.data.orderId;

      // ✅ 4. Handle COD immediately
      if (payment.toLowerCase() === "cod") {
        toast.success("Order placed successfully 🎉");
        router.push("/my-orders");
        return;
      }

      // ✅ 5. Razorpay flow for online payment
      const paymentRes = await api.post("/payment/create-order", {
        orderId: dbOrderId,
        amount: cartCheckout.pricing.total,
      });

      const { orderId, key, amount, currency } = paymentRes.data;

      const options = {
        key,
        amount,
        currency,
        name: "Green Mart",
        description: "Order Payment",
        order_id: orderId,
        handler: async function (response) {
          try {
            const verifyRes = await api.post("/payment/verify", {
              ...response,
              dbOrderId,
            });

            if (verifyRes.data.success) {
              toast.success("Payment Successful 🎉");
              router.push("/my-orders");
            } else {
              toast.error("Payment verification failed");
            }
          } catch (err) {
            console.error(err);
            toast.error("Payment verification error");
          }
        },
        theme: { color: "#16a34a" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error(err.response?.data?.message || "Checkout failed");
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F7FA] py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Checkout</h1>
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

        <form className="grid lg:grid-cols-[2fr,1fr] gap-6">
          {/* Left side: forms */}
          <div className="space-y-4">
            {/* Address card */}
            <section className="bg-white rounded-3xl shadow-sm p-5">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Delivery Address
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Full name
                  </label>
                  <input
                    type="text"
                    required
                    value={address.name}
                    onChange={(e) =>
                      setAddress({ ...address, name: e.target.value })
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
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    required
                    value={address.street}
                    onChange={(e) =>
                      setAddress({ ...address, street: e.target.value })
                    }
                    className="w-full rounded-2xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="House no, street, area"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={address.state}
                    onChange={(e) =>
                      setAddress({ ...address, state: e.target.value })
                    }
                    placeholder="Haryana"
                    className="w-full rounded-2xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Postal code
                  </label>
                  <input
                    type="text"
                    required
                    value={address.pincode}
                    onChange={(e) =>
                      setAddress({ ...address, pincode: e.target.value })
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
                  <p className="text-xs text-gray-500">2-3 days, Free</p>
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
                  <p className="text-xs text-gray-500">Same day, $4.00</p>
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
                  <span className="text-gray-800">Cash on Delivery</span>
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
                  <span className="text-gray-800">UPI / Wallet (mock)</span>
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
              {cartCheckout.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-gray-800 text-xs font-medium">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-gray-400">
                        {item.discountPrice} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-gray-900">
                    ${(item.discountPrice * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Items total</span>
                <span className="font-medium text-gray-900">
                  ${cartCheckout.pricing.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Discount</span>
                <span className="font-medium text-green-600">
                  ${cartCheckout.pricing.discount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery</span>
                <span className="font-medium text-gray-900">
                  {cartCheckout.pricing.shipping}
                </span>
              </div>

              <div className="border-t border-gray-100 pt-3 mt-2 flex justify-between items-center">
                <span className="font-semibold text-gray-900">Grand Total</span>
                <p className="text-lg font-semibold text-gray-900">
                  ${cartCheckout.pricing.total.toFixed(2)}
                </p>
              </div>
              <button
                type="button"
                onClick={handleCheckout}
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
};

export default CheckOut;
