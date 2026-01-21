import React from "react";

const TotalSales = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-8">
      {/* Total Sales */}
      <div className="bg-white dk:bg-[#1a2e1a] p-5 rounded-xl border border-gray-100 dk:border-gray-800 shadow-sm">
        <div className="flex justify-between items-start mb-2">
          <div className="min-w-10 min-h-10 flex justify-center items-center bg-green-50 dk:bg-green-900/20 rounded-lg text-[#0a3d0a] dk:text-[#13ec13]">
            <span className="material-symbols-outlined">attach_money</span>
          </div>

          <span className="flex items-center text-[#0a3d0a] dk:text-[#13ec13] text-xs font-bold bg-green-50 dk:bg-green-900/20 px-2 py-1 rounded-full">
            <span className="material-symbols-outlined text-[14px] mr-1">
              trending_up
            </span>
            +12%
          </span>
        </div>

        <p className="text-[#525c52] dk:text-[#a0baa0] text-sm font-medium">
          Total Sales
        </p>

        <p className="text-2xl font-extrabold text-[#111811] dk:text-[#e0e6e0] mt-1">
          $4,250.00
        </p>
      </div>

      {/* Pending Orders */}
      <div className="bg-orange-50 dk:bg-orange-900/10 p-5 rounded-xl border border-orange-100 dk:border-orange-800/30">
        <div className="flex justify-between items-start mb-2">
          <div className="min-w-10 min-h-10 flex justify-center items-center bg-orange-100 dk:bg-orange-800/30 rounded-lg text-orange-700 dk:text-orange-400">
            <span className="material-symbols-outlined">pending_actions</span>
          </div>
        </div>

        <p className="text-orange-900/70 dk:text-orange-300 text-sm font-medium">
          Pending Orders
        </p>

        <p className="text-2xl font-extrabold text-orange-900 dk:text-orange-200 mt-1">
          8
        </p>
      </div>

      {/* Today's Orders */}
      <div className="bg-white dk:bg-[#1a2e1a] p-5 rounded-xl border border-gray-100 dk:border-gray-800 shadow-sm">
        <div className="flex justify-between items-start mb-2">
          <div className="bg-blue-50 dk:bg-blue-900/20 rounded-lg text-blue-700 dk:text-blue-400 min-w-10 min-h-10 flex justify-center items-center">
            <span className="material-symbols-outlined">shopping_bag</span>
          </div>
        </div>

        <p className="text-[#525c52] dk:text-[#a0baa0] text-sm font-medium">
          Today's Orders
        </p>

        <p className="text-2xl font-extrabold text-[#111811] dk:text-[#e0e6e0] mt-1">
          12
        </p>
      </div>
    </div>
  );
};

export default TotalSales;
