"use client";
import Image from "next/image";
import React, { useState } from "react";

const getPrimaryAction = (status) => {
  switch (status) {
    case "Pending":
      return "Pack Order";
    case "Packed":
      return "Ship Order";
    case "Shipped":
      return "Mark Delivered";
    case "Delivered":
      return "Archive Order";
    default:
      return "Update Order";
  }
};

const OrdersCardSm = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col rounded-xl bg-white dark:bg-surface-dark shadow-lg ring-1 ring-black/5 dark:ring-white/10 overflow-hidden">
      {/* ================= HEADER ================= */}
      <div className="p-4 flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-secondary-text">
            {order.time || "—"}
          </span>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            #{order.id}
          </h3>

          <p className="text-sm text-secondary-text font-medium">
            {order.customer} • {order.items?.length || 0} items
          </p>
        </div>

        <div className="flex flex-col items-end gap-1">
          <p className="text-xl font-extrabold text-slate-900 dark:text-white">
            ${Number(order.total || 0).toFixed(2)}
          </p>

          {/* STATUS BADGE */}
          <span
            className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-bold
              ${
                order.status === "Pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : order.status === "Delivered"
                  ? "bg-gray-100 text-gray-600"
                  : "bg-green-100 text-green-700"
              }`}
          >
            {order.status?.toUpperCase()}
          </span>
        </div>
      </div>

      {/* ================= PRODUCT PREVIEW (OPEN ONLY) ================= */}
      {isOpen && (
        <div className="px-4 flex gap-2 mb-2">
          {order.items?.map((item, i) => (
            <div key={i} className="size-14 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
              <Image
                src={item.image}
                alt={item.name}
                width={56}
                height={56}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      )}

      {/* ================= DETAILS (OPEN ONLY) ================= */}
      {isOpen && (
        <div className="mx-4 mb-3 p-3 rounded-lg bg-background-light dark:bg-black/20 flex flex-col gap-3">
          {order.address && (
            <>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary-text text-[20px]">
                  location_on
                </span>
                <div>
                  <p className="text-xs font-bold text-secondary-text uppercase">
                    Delivery Address
                  </p>
                  <p className="text-sm text-slate-900 dark:text-white">
                    {order.address}
                  </p>
                </div>
              </div>
              <div className="h-px bg-gray-200 dark:bg-gray-700" />
            </>
          )}

          {order.payment && (
            <>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary-text text-[20px]">
                  credit_card
                </span>
                <p className="text-sm text-slate-900 dark:text-white">
                  {order.payment}
                </p>
              </div>
              <div className="h-px bg-gray-200 dark:bg-gray-700" />
            </>
          )}

          {order.notes && (
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-secondary-text text-[20px]">
                sticky_note_2
              </span>
              <p className="text-sm text-slate-900 dark:text-white italic">
                “{order.notes}”
              </p>
            </div>
          )}
        </div>
      )}

      {/* ================= ACTIONS ================= */}
      <div className="p-4 pt-2 bg-gray-50 dark:bg-black/10">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="w-full h-10 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-600 text-sm font-bold"
          >
            View Details
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={() => setIsOpen(false)}
              className="flex-1 h-10 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-600 text-sm font-bold"
            >
              Decline
            </button>

            <button className="flex-[2] h-10 rounded-xl bg-primary text-primary-content text-sm font-bold flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px]">
                inventory_2
              </span>
              {getPrimaryAction(order.status)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersCardSm;
