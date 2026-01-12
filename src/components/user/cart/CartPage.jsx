"use client";

import {
  fetchCart,
  removeFromCart,
  updateQuantity,
} from "@/redux/slice/cartSlice";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cta from "../../common/Cta";
import { toast } from "react-toastify";

export default function CartPage() {
  const dispatch = useDispatch();
  const { items: cart, loading } = useSelector((state) => state.cart);

  /* FETCH CART ON LOAD */
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  /* TOTALS */
  const totals = useMemo(() => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const discountPriceTotal = cart.reduce(
      (sum, item) => sum + item.product.discountPrice * item.quantity,
      0
    );
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return { subtotal, totalItems, discountPriceTotal };
  }, [cart]);

  /* ACTIONS */
  const incrementQty = (item) => {
    dispatch(
      updateQuantity({
        productId: item.product._id,
        quantity: item.quantity + 1,
      })
    );
    toast.success("Product quantity Increased.");
  };

  const decrementQty = (item) => {
    if (item.quantity === 1) {
      dispatch(removeFromCart({ productId: item.product._id }));
      toast.success("Product Removed from your Cart.");
    } else {
      dispatch(
        updateQuantity({
          productId: item.product._id,
          quantity: item.quantity - 1,
        })
      );
      toast.success("Product quantity Decreased.");
    }
  };

  const removeItem = (productId) => {
    dispatch(removeFromCart({ productId }));
  };

  return (
    <main className="min-h-screen bg-[#F5F7FA] py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Your Cart</h1>
            <p className="text-sm text-gray-500">
              You have {totals.totalItems} item
              {totals.totalItems !== 1 && "s"} in your cart
            </p>
          </div>
          <Cta href="/" className="max-w-62.5">
            Continue Shopping
          </Cta>
        </div>

        <div className="grid lg:grid-cols-[2fr,1fr] gap-6">
          {/* Cart items */}
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.product._id}
                className="flex gap-4 bg-white rounded-3xl shadow-sm p-4 relative"
              >
                {/* Discount badge */}
                <span className="absolute left-4 top-4 bg-green-600 text-white text-[10px] font-semibold px-2 py-1 rounded-full">
                  20% Off
                </span>

                {/* Image */}
                <div className="w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs text-green-500 font-medium">
                        {item.product.categoryName}
                      </p>
                      <h2 className="text-sm font-semibold text-gray-900">
                        {item.product.title}
                      </h2>
                      <p className="text-xs text-gray-400">
                        {item.product.weight}
                      </p>
                      <div className="flex items-center gap-1 mt-1 text-xs">
                        <span className="text-yellow-400">★</span>
                        <span className="font-medium text-gray-700">
                          {item.product.rating}
                        </span>
                      </div>
                    </div>

                    {/* Prices + remove */}
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-sm font-semibold text-gray-900">
                          ${item.product.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-gray-400 line-through">
                          ${item.product.discountPrice.toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={() => removeItem(item.product._id)}
                        className="mt-2 text-xs text-red-500 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Qty + item subtotal */}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                      <button
                        onClick={() => decrementQty(item)}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="w-10 text-center text-sm font-medium text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => incrementQty(item)}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-gray-400">Item total</p>
                      <p className="text-sm font-semibold text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {cart.length === 0 && (
              <div className="bg-white rounded-3xl p-6 text-center text-gray-500">
                Your cart is empty.
              </div>
            )}
          </div>

          {/* Summary card */}
          {cart.length !== 0 && (
            <aside className="bg-white rounded-3xl shadow-sm p-5 h-fit">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Items ({totals.totalItems})
                  </span>
                  <span className="font-medium text-gray-900">
                    ${totals.discountPriceTotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Discount</span>
                  <span className="font-medium text-green-600">
                    -${(totals.discountPriceTotal - totals.subtotal).toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>

                <div className="border-t border-gray-100 pt-3 mt-2 flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Total</span>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      ${totals.subtotal.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <button className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-3 rounded-full transition">
                Proceed to Checkout
              </button>
            </aside>
          )}
        </div>
      </div>
    </main>
  );
}
