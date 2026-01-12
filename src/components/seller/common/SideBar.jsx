"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Dashboard", icon: "dashboard", href: "/seller/dashboard" },
  { name: "Products", icon: "inventory_2", href: "/seller/products" },
  { name: "Add New Product", icon: "add_circle", href: "/seller/products/add-new-product" },
  { name: "Orders", icon: "shopping_cart", href: "/seller/orders" },
  { name: "Returns", icon: "keyboard_return", href: "/seller/returns" },
  { name: "Payments", icon: "payments", href: "/seller/payments" },
];

const bottomMenu = [
  { name: "Settings", icon: "settings", href: "/seller/settings" },
  { name: "Help & Support", icon: "help", href: "/seller/help" },
];

const SideBar = ({ open, setOpen }) => {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity lg:hidden ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <div
        className={`max-lg:fixed left-0 top-0 bottom-0 z-50 w-3/4 max-w-75
        bg-white dark:bg-[#1a2e1a] shadow-xl transform transition-transform
        overflow-y-auto h-screen
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-0"}`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-[#0a3d0a] font-bold">
                G
              </div>
              <span className="text-lg font-bold text-[#111811] dark:text-[#e0e6e0]">
                Green-Mart
              </span>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-[#525c52] dark:text-[#a0baa0] lg:hidden"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Menu */}
          <ul className="flex flex-col gap-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg font-medium
                    ${
                      isActive
                        ? "bg-green-500/20 text-[#0a3d0a] font-bold"
                        : "hover:bg-gray-50 dark:hover:bg-white/5 text-[#111811] dark:text-[#e0e6e0]"
                    }`}
                  >
                    <span className="material-symbols-outlined">
                      {item.icon}
                    </span>
                    {item.name}
                  </Link>
                </li>
              );
            })}

            <div className="my-2 border-t border-gray-100 dark:border-gray-800" />

            {bottomMenu.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 text-[#525c52] dark:text-[#a0baa0] text-sm"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideBar;
