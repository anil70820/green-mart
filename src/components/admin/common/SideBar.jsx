"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const menuItems = [
  { name: "Dashboard", icon: "dashboard", href: "/admin/dashboard" },
  { name: "Users", icon: "people", href: "/admin/user-management" },
  { name: "Sellers", icon: "badge", href: "/admin/seller-management" },
  {
    name: "Products",
    icon: "inventory_2",
    href: "/admin/seller-products-management",
  },
  {
    name: "Orders",
    icon: "shopping_cart",
    href: "/admin/seller-order-management",
  },
  {
    name: "Payments",
    icon: "payments",
    href: "/admin/payments-and-Commissions",
  },
  {
    name: "Return",
    icon: "assignment_return",
    href: "/admin/returns-management",
  },
  { name: "Disputes", icon: "warning", href: "/admin/disputes" },
];

const bottomMenu = [
  { name: "Settings", icon: "settings", href: "/admin/settings" },
  { name: "Help & Support", icon: "help", href: "/admin/help-and-support" },
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
        bg-white shadow-xl transform transition-transform
        overflow-y-auto h-screen
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-0"}`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-100  mb-4">
            <Link href="/" className="relative z-[99]">
              <Image
                src="/assets/images/svg/logo.svg"
                alt="Logo"
                width={246}
                height={55}
                className="lg:w-[246px] w-[180px] h-auto"
                sizes="100vw"
              />
            </Link>

            <button
              onClick={() => setOpen(false)}
              className="rounded-full
        text-[#111811] hover:text-green-600 duration-300 cursor-pointer lg:hidden"
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
                        : "hover:bg-gray-50  text-[#111811] "
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

            <div className="my-2 border-t border-gray-100 " />

            {bottomMenu.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50  text-[#525c52] text-sm"
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
