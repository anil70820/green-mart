"use client";

import Dropdown from "@/components/common/Dropdown";
import { logout } from "@/redux/slice/authSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const TopBar = ({ title = "Dashboard", onMenuClick }) => {
  const { user, isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logOutUser = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    toast.success("Logout successfully");
  };
  console.log("user:",user)
  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-6 py-4
      bg-white dark:bg-[#1a2e1a]
      border-b border-gray-100 dark:border-gray-800 shadow-sm"
    >
      {/* Mobile Menu Button */}
      <button
        onClick={onMenuClick}
        className="rounded-full
        text-[#111811] hover:text-green-600 duration-300 cursor-pointer lg:hidden"
      >
        <span className="material-symbols-outlined">menu</span>
      </button>
      <h1 className="text-xl font-bold tracking-tight text-[#111811] dark:text-[#e0e6e0] hidden lg:block capitalize">
        {title}
      </h1>

      {/* Right Section */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Notifications */}
        <button
          className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 min-w-10 min-h-10 flex justify-center items-center
          text-[#111811] dark:text-[#e0e6e0]"
        >
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-[#111811] dark:text-[#e0e6e0]">
              {user?.name}
            </p>
            <p className="text-xs text-[#525c52] dark:text-[#a0baa0]">
              {user?.email}
            </p>
          </div>

          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700">
            <Dropdown
              trigger={
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhd6IQLUVb_GzUukDt2-AqQZUJUuyDHO1EXqU42OqFdE9rJ13-rYSsplvyC-SfYG9AjpCEGdQIHeQt8FvhvGE_Dk0lg3QJNEZ7fRDJ8PRUIbShvGGK9yKYaMSGmukRxUudq0j2PsKUZ27s8wX-piHP9PLZfu67ERTtzfEQlMp83UpaTKHYY5U3nyYkyU7y9CrouOykZgQ90PSX8vRA4fzWeRj2G1KpmUYi6tzAeviRo8MDunCjlxK0_sc9pkoQ-1ZuAlz2YgrzHwcj"
                  alt="Seller profile"
                  className="w-full h-full object-cover"
                />
              }
            >
              <button
                onClick={logOutUser}
                className="px-5 py-2 text-left hover:bg-black/5 min-w-35 text-red-600"
              >
                Logout
              </button>
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
