// "use client";
// import axios from "axios";
// import { useEffect, useState } from "react";

// const green = "bg-emerald-500";
// const USER_ID = 1; // 👉 you can replace this with logged-in user id

// const CartPage = () => {
//   const [cart, setCart] = useState([]);

//   // ===========================
//   // Fetch user cart
//   // ===========================
//   const loadCart = async () => {
//     const res = await axios.get(`http://localhost:8000/cart/${USER_ID}`);
//     setCart(res.data.cart.items || []);
//     console.log(res);
//   };

//   useEffect(() => {
//     loadCart();
//   }, []);

//   // ===========================
//   // Increase quantity
//   // ===========================
//   const increaseQty = async (productId, qty) => {
//     await axios.post("http://localhost:8000/cart/update", {
//       userId: USER_ID,
//       productId,
//       qty: qty + 1,
//     });

//     loadCart();
//   };

//   // ===========================
//   // Decrease quantity
//   // ===========================
//   const decreaseQty = async (productId, qty) => {
//     if (qty <= 1) return;

//     await axios.post("http://localhost:8000/cart/update", {
//       userId: USER_ID,
//       productId,
//       qty: qty - 1,
//     });

//     loadCart();
//   };

//   // ===========================
//   // Remove item
//   // ===========================
//   const removeItem = async (productId) => {
//     await axios.post("http://localhost:8000/cart/remove", {
//       userId: USER_ID,
//       productId,
//     });

//     loadCart();
//   };

//   // ===========================
//   // Summary Calculation
//   // ===========================
//   const subtotal = cart.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );
//   const discount = 0;
//   const delivery = 4;
//   const total = subtotal - discount + delivery;

//   return (
//     <main className="min-h-screen bg-gray-50 px-4 py-8">
//       {/* top bar */}
//       <header className="mb-6 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <a
//             href="/"
//             className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm"
//           >
//             ←
//           </a>
//           <h1 className="text-2xl font-semibold text-gray-900">My Cart</h1>
//         </div>

//         <span className="text-sm text-gray-500">{cart.length} items</span>
//       </header>

//       {/* content */}
//       <div className="grid gap-6 lg:grid-cols-[2.5fr_1fr]">
//         {/* Cart Grid */}
//         <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
//           {cart.map((item) => (
//             <article
//               key={item.productId}
//               className="relative flex flex-col rounded-3xl bg-white p-4 shadow-sm transition hover:shadow-md"
//             >
//               {/* Image */}
//               <div className="flex max-h-full max-w-[250px] w-full p-2 items-center justify-center rounded-2xl bg-gray-50">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-full object-contain"
//                 />
//               </div>

//               {/* Info */}
//               <div className="mt-3">
//                 <h2 className="text-sm font-semibold text-gray-900">
//                   {item.title}
//                 </h2>
//                 <p className="text-xs text-gray-500 mt-1">
//                   Quantity: {item.quantity}
//                 </p>
//               </div>

//               {/* Price + Actions */}
//               <div className="mt-4 flex items-end justify-between gap-3">
//                 <p className="text-lg font-semibold text-gray-900">
//                   ${item.price.toFixed(2) * item.quantity}
//                 </p>

//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => decreaseQty(item.productId, item.quantity)}
//                     className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300"
//                   >
//                     -
//                   </button>

//                   <span className="w-6 text-center text-sm font-medium">
//                     {item.quantity}
//                   </span>

//                   <button
//                     onClick={() => increaseQty(item.productId, item.quantity)}
//                     className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300"
//                   >
//                     +
//                   </button>

//                   <button
//                     onClick={() => removeItem(item.productId)}
//                     className="ml-1 text-xs text-red-500"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </article>
//           ))}
//         </section>

//         {/* Summary */}

//         <aside className="h-fit rounded-3xl bg-white p-5 shadow-sm">
//           {cart.length === 0 ? (
//             <p className="text-center font-semibold text-xl">
//               Your Cart is empty
//             </p>
//           ) : (
//             <div>
//               <h2 className="mb-4 text-lg font-semibold text-gray-900">
//                 Order Summary
//               </h2>

//               <div className="space-y-2 text-sm">
//                 <div className="flex justify-between">
//                   <span className="text-gray-500">Subtotal</span>
//                   <span className="font-medium">${subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-500">Discount</span>
//                   <span className="font-medium text-emerald-600">
//                     -${discount.toFixed(2)}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-500">Delivery</span>
//                   <span className="font-medium">${delivery.toFixed(2)}</span>
//                 </div>

//                 <hr className="my-3" />

//                 <div className="flex justify-between text-base">
//                   <span className="font-semibold text-gray-900">Total</span>
//                   <span className="font-semibold text-gray-900">
//                     ${total.toFixed(2)}
//                   </span>
//                 </div>
//               </div>

//               <button
//                 className={`${green} mt-6 w-full rounded-full py-3 text-sm font-semibold text-white shadow-md hover:brightness-110`}
//               >
//                 Proceed to Checkout
//               </button>

//               <p className="mt-3 text-center text-xs text-gray-400">
//                 By proceeding, you agree to our Terms & Conditions.
//               </p>
//             </div>
//           )}
//         </aside>
//       </div>
//     </main>
//   );
// };

// export default CartPage;


// app/cart/page.jsx  (Next.js 13+ App Router, JS only)

"use client";

import { useMemo, useState } from "react";

const initialCart = [
  {
    id: 1,
    name: "Fresh Strawberries",
    category: "Fruits",
    weight: "500g",
    rating: 4.9,
    price: 10,
    oldPrice: 12,
    image:
      "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=600",
    quantity: 1,
  },
  {
    id: 2,
    name: "Fresh Cauliflower",
    category: "Vegetables",
    weight: "500g",
    rating: 4.9,
    price: 10,
    oldPrice: 12,
    image:
      "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=600",
    quantity: 2,
  },
  {
    id: 3,
    name: "Fresh Almond Milk",
    category: "Dairy & Beverages",
    weight: "1Liter",
    rating: 4.9,
    price: 5,
    oldPrice: 7,
    image:
      "https://images.pexels.com/photos/3735146/pexels-photo-3735146.jpeg?auto=compress&cs=tinysrgb&w=600",
    quantity: 1,
  },
];

export default function CartPage() {
  const [cart, setCart] = useState(initialCart);

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
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return { subtotal, oldSubtotal, discount, totalItems };
  }, [cart]);

  const incrementQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrementQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <main className="min-h-screen bg-[#F5F7FA] py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Your Cart
            </h1>
            <p className="text-sm text-gray-500">
              You have {totals.totalItems} item
              {totals.totalItems !== 1 && "s"} in your cart
            </p>
          </div>
          <button className="rounded-full bg-green-600 text-white px-6 py-2 text-sm font-medium hover:bg-green-700 transition">
            Continue Shopping
          </button>
        </div>

        <div className="grid lg:grid-cols-[2fr,1fr] gap-6">
          {/* Cart items */}
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 bg-white rounded-3xl shadow-sm p-4 relative"
              >
                {/* Discount badge */}
                <span className="absolute left-4 top-4 bg-green-600 text-white text-[10px] font-semibold px-2 py-1 rounded-full">
                  20% Off
                </span>

                {/* Image */}
                <div className="w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs text-green-500 font-medium">
                        {item.category}
                      </p>
                      <h2 className="text-sm font-semibold text-gray-900">
                        {item.name}
                      </h2>
                      <p className="text-xs text-gray-400">{item.weight}</p>
                      <div className="flex items-center gap-1 mt-1 text-xs">
                        <span className="text-yellow-400">★</span>
                        <span className="font-medium text-gray-700">
                          {item.rating}
                        </span>
                      </div>
                    </div>

                    {/* Prices + remove */}
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-sm font-semibold text-gray-900">
                          ${item.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-gray-400 line-through">
                          ${item.oldPrice.toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
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
                        onClick={() => decrementQty(item.id)}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="w-10 text-center text-sm font-medium text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => incrementQty(item.id)}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-gray-400">Item total</p>
                      <p className="text-sm font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
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
                <span className="font-medium text-green-600">Free</span>
              </div>

              <div className="border-t border-gray-100 pt-3 mt-2 flex justify-between items-center">
                <span className="font-semibold text-gray-900">Total</span>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    ${totals.subtotal.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-400 line-through">
                    ${totals.oldSubtotal.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <button className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-3 rounded-full transition">
              Proceed to Checkout
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}
