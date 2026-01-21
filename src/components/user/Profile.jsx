"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../common/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slice/authSlice";
import { toast } from "react-toastify";

const Profile = ({ isOpen, onClose }) => {
  const { user, isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isDark, setIsDark] = useState(false);

  // page load par localStorage check
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  // toggle handler
  const toggleDarkMode = () => {
    const next = !isDark;
    setIsDark(next);

    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };
  const logOutUser = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    toast.success("Logout successfully");
    onClose();
  };

  console.log("user:", user);
  return (
    <Sidebar isOpen={isOpen} onClose={onClose} position="right" header={false}>
      <header className="border-b border-gray-100 dk:border-gray-800 flex items-center justify-between shrink-0 px-4 pb-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex items-center gap-2 ">
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-gray-50 text-green-700 border-green-600 border flex items-center justify-center font-semibold uppercase">
                  <span className="material-symbols-outlined text-3xl!">
                    {" "}
                    person
                  </span>
                </div>
              )}
            </div>
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#3fa659] border-2 border-white dk:border-background-dark rounded-full"></div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-gray-900 dk:text-white font-bold text-lg leading-tight">
              {user?.name}
            </h2>
            <p className="text-gray-500 capitalize dk:text-gray-400 text-sm">
              Role: {user?.role}
            </p>
          </div>
        </div>

        <span
          onClick={onClose}
          className="material-symbols-outlined hover:text-green-500 transition-all duration-300 cursor-pointer"
        >
          close
        </span>
      </header>

      <div className="flex-1 overflow-y-auto custom-scrollbar mt-5">
        <section>
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 dk:text-gray-500 mb-2 px-4">
            Account
          </h3>
          {user?.role === "seller" && (
            <a
              className="px-4 group flex items-center gap-4  py-3.5 hover:bg-[#3fa659]/5 dk:hover:bg-[#3fa659]/10 transition-all"
              href="/seller/dashboard"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-50 dk:bg-gray-800 group-hover:bg-[#3fa659]/20 group-hover:text-[#3fa659] transition-colors">
                <span className="material-symbols-outlined text-[22px]">
                  dashboard
                </span>
              </div>
              <span className="flex-1 text-gray-700 dk:text-gray-200 font-medium">
                Dashboard
              </span>
              <span className="material-symbols-outlined text-gray-300 dk:text-gray-600 group-hover:translate-x-1 transition-transform">
                chevron_right
              </span>
            </a>
          )}
          <a
            className="px-4 group flex items-center gap-4  py-3.5 hover:bg-[#3fa659]/5 dk:hover:bg-[#3fa659]/10 transition-all"
            href="#"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-50 dk:bg-gray-800 group-hover:bg-[#3fa659]/20 group-hover:text-[#3fa659] transition-colors">
              <span className="material-symbols-outlined text-[22px]">
                person
              </span>
            </div>
            <span className="flex-1 text-gray-700 dk:text-gray-200 font-medium">
              My Profile
            </span>
            <span className="material-symbols-outlined text-gray-300 dk:text-gray-600 group-hover:translate-x-1 transition-transform">
              chevron_right
            </span>
          </a>
          <a
            className="px-4 group flex items-center gap-4  py-3.5 hover:bg-[#3fa659]/5 dk:hover:bg-[#3fa659]/10 transition-all"
            href="#"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-50 dk:bg-gray-800 group-hover:bg-[#3fa659]/20 group-hover:text-[#3fa659] transition-colors">
              <span className="material-symbols-outlined text-[22px]">
                location_on
              </span>
            </div>
            <span className="flex-1 text-gray-700 dk:text-gray-200 font-medium">
              Saved Addresses
            </span>
            <span className="material-symbols-outlined text-gray-300 dk:text-gray-600 group-hover:translate-x-1 transition-transform">
              chevron_right
            </span>
          </a>
        </section>
        <div className="">
          <hr className="border-gray-100 dk:border-gray-800" />
        </div>

        <section className="py-4">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 dk:text-gray-500 mb-2 px-4">
            Orders &amp; Activity
          </h3>
          <a
            className="px-4 group flex items-center gap-4  py-3.5 hover:bg-[#3fa659]/5 dk:hover:bg-[#3fa659]/10 transition-all"
            href="/my-orders"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-50 dk:bg-gray-800 group-hover:bg-[#3fa659]/20 group-hover:text-[#3fa659] transition-colors">
              <span className="material-symbols-outlined text-[22px]">
                shopping_bag
              </span>
            </div>
            <span className="flex-1 text-gray-700 dk:text-gray-200 font-medium">
              My Orders
            </span>
            <span className="bg-[#3fa659] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              2 Active
            </span>
            <span className="material-symbols-outlined text-gray-300 dk:text-gray-600 group-hover:translate-x-1 transition-transform">
              chevron_right
            </span>
          </a>
          <a
            className="px-4 group flex items-center gap-4  py-3.5 hover:bg-[#3fa659]/5 dk:hover:bg-[#3fa659]/10 transition-all"
            href="/wishlist"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-50 dk:bg-gray-800 group-hover:bg-[#3fa659]/20 group-hover:text-[#3fa659] transition-colors">
              <span className="material-symbols-outlined text-[22px]">
                favorite
              </span>
            </div>
            <span className="flex-1 text-gray-700 dk:text-gray-200 font-medium">
              Wishlist
            </span>
            <span className="material-symbols-outlined text-gray-300 dk:text-gray-600 group-hover:translate-x-1 transition-transform">
              chevron_right
            </span>
          </a>
          <a
            className="px-4 group flex items-center gap-4  py-3.5 hover:bg-[#3fa659]/5 dk:hover:bg-[#3fa659]/10 transition-all"
            href="/cart"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-50 dk:bg-gray-800 group-hover:bg-[#3fa659]/20 group-hover:text-[#3fa659] transition-colors">
              <span className="material-symbols-outlined text-[22px]">
               shopping_cart_checkout
              </span>
            </div>
            <span className="flex-1 text-gray-700 dk:text-gray-200 font-medium">
              Cart
            </span>
            <span className="material-symbols-outlined text-gray-300 dk:text-gray-600 group-hover:translate-x-1 transition-transform">
              chevron_right
            </span>
          </a>
        </section>
        <div className="">
          <hr className="border-gray-100 dk:border-gray-800" />
        </div>

        <section className="py-4">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 dk:text-gray-500 mb-2 px-4">
            Financials
          </h3>
          <div className="mb-2 mx-4 p-4 rounded-xl bg-[#3fa659]/10 border border-[#3fa659]/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-[#3fa659]">
                <span className="material-symbols-outlined">
                  account_balance_wallet
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#3fa659]/70 font-bold uppercase">
                  Balance
                </span>
                <span className="text-lg font-bold text-[#3fa659]">$24.50</span>
              </div>
            </div>
            <button className="bg-[#3fa659] text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-[#3fa659]/90 transition-colors">
              Add Funds
            </button>
          </div>
          <a
            className="px-4 group flex items-center gap-4  py-3.5 hover:bg-[#3fa659]/5 dk:hover:bg-[#3fa659]/10 transition-all"
            href="#"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-50 dk:bg-gray-800 group-hover:bg-[#3fa659]/20 group-hover:text-[#3fa659] transition-colors">
              <span className="material-symbols-outlined text-[22px]">
                sell
              </span>
            </div>
            <span className="flex-1 text-gray-700 dk:text-gray-200 font-medium">
              My Offers
            </span>
            <span className="material-symbols-outlined text-gray-300 dk:text-gray-600 group-hover:translate-x-1 transition-transform">
              chevron_right
            </span>
          </a>
        </section>
        <div className="">
          <hr className="border-gray-100 dk:border-gray-800" />
        </div>

        <section className="py-4">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 dk:text-gray-500 mb-2 px-4">
            Settings
          </h3>
          <div className="flex items-center gap-4 px-4 py-3.5">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-50 dk:bg-gray-800 text-gray-500">
              <span className="material-symbols-outlined text-[22px]">
                dark_mode
              </span>
            </div>
            <span className="flex-1 text-gray-700 dk:text-gray-200 font-medium">
              Dark Mode
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                className="sr-only peer"
                type="checkbox"
                checked={isDark}
                onChange={toggleDarkMode}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dk:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dk:border-gray-600 peer-checked:bg-[#3fa659]"></div>
            </label>
          </div>
          <a
            className="px-4 group flex items-center gap-4  py-3.5 hover:bg-[#3fa659]/5 dk:hover:bg-[#3fa659]/10 transition-all"
            href="#"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-50 dk:bg-gray-800 group-hover:bg-[#3fa659]/20 group-hover:text-[#3fa659] transition-colors">
              <span className="material-symbols-outlined text-[22px]">
                notifications
              </span>
            </div>
            <span className="flex-1 text-gray-700 dk:text-gray-200 font-medium">
              Notifications
            </span>
            <span className="material-symbols-outlined text-gray-300 dk:text-gray-600 group-hover:translate-x-1 transition-transform">
              chevron_right
            </span>
          </a>
        </section>

        <section className="py-4">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 dk:text-gray-500 mb-2 px-4">
            Support
          </h3>
          <a
            className="px-4 group flex items-center gap-4  py-3.5 hover:bg-[#3fa659]/5 dk:hover:bg-[#3fa659]/10 transition-all"
            href="#"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-50 dk:bg-gray-800 group-hover:bg-[#3fa659]/20 group-hover:text-[#3fa659] transition-colors">
              <span className="material-symbols-outlined text-[22px]">
                help
              </span>
            </div>
            <span className="flex-1 text-gray-700 dk:text-gray-200 font-medium">
              Help Center
            </span>
          </a>
          <a
            className="px-4 group flex items-center gap-4  py-3.5 hover:bg-[#3fa659]/5 dk:hover:bg-[#3fa659]/10 transition-all"
            href="#"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-50 dk:bg-gray-800 group-hover:bg-[#3fa659]/20 group-hover:text-[#3fa659] transition-colors">
              <span className="material-symbols-outlined text-[22px]">
                headset_mic
              </span>
            </div>
            <span className="flex-1 text-gray-700 dk:text-gray-200 font-medium">
              Contact Us
            </span>
          </a>
        </section>
      </div>
      <div className="px-4 border-t border-t-gray-100 py-5">
        <button
          onClick={logOutUser}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-[#D62D20] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#D62D20]/20 hover:brightness-110 active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          Logout
        </button>
      </div>
    </Sidebar>
  );
};

export default Profile;
