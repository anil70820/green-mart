import { List, Plus } from "lucide-react";
import React from "react";

const QuickActions = () => {
  return (
    <div>
      <div className="lg:col-span-3 xl:col-span-4 mb-4">
        <h3 className="font-bold text-lg text-text-main-light dk:text-text-main-dark mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-3 p-6 rounded-xl bg-[#13ec13] text-[#0a3d0a] shadow-lg shadow-primary/20 hover:scale-95 transition-transform cursor-pointer">
            <span className="material-symbols-outlined text-3xl">add_box</span>

            <span className="font-bold text-lg">Add New Product</span>
          </button>
          <button className="flex items-center justify-center gap-3 p-6 rounded-xl bg-surface-light dk:bg-surface-dark border hover:scale-95 border-gray-200 dk:border-gray-700 text-text-main-light dk:text-text-main-dark shadow-sm active:scale-95 transition-transform cursor-pointer">
            <span className="material-symbols-outlined text-3xl">list_alt</span>
            <span className="font-bold text-lg">View All Orders</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
