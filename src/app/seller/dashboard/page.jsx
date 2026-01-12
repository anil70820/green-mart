import QuickActions from "@/components/seller/dashboard/QuickActions";
import RecentOrders from "@/components/seller/dashboard/RecentOrders";
import SalesChart from "@/components/seller/dashboard/SalesChart";
import TotalSales from "@/components/seller/dashboard/TotalSales";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="px-5 mt-2 pt-3 pb-5 overflow-y-auto h-[calc(100vh-80px)]">
      <h2 className="text-2xl font-bold tracking-tight mb-1">Hello, Marcus</h2>
      <p className="text-text-sub-light dark:text-text-sub-dark text-sm mb-6">
        Here's what's happening in your store today.
      </p>
      <div className="bg-red-50 dark:bg-red-900/10 p-5 rounded-xl border border-red-100 dark:border-red-800/30 flex items-center gap-4 shadow-sm mb-10">
        <div className=" bg-red-100 dark:bg-red-800/30 rounded-lg text-red-700 dark:text-red-400 min-w-10 min-h-10 flex justify-center items-center">
          <span className="material-symbols-outlined leading-0">error</span>
        </div>
        <div>
          <p className="sm:text-lg text-base font-extrabold text-red-900 dark:text-red-200">
            Urgent: Low Stock!
          </p>
          <p className="text-red-900/70 dark:text-red-300 text-sm sm:text-base">
            3 items are running low. Take action now!
          </p>
        </div>
        <Link
          className="ml-auto text-red-700 dark:text-red-400 font-semibold text-sm shrink-0"
          href="#"
        >
          View
        </Link>
      </div>
      <QuickActions />
      <TotalSales />
      <div className="grid xl:grid-cols-2 grid-cols-1 gap-6">
        <SalesChart />
        <RecentOrders />
      </div>
    </div>
  );
};

export default page;
