const StatsCards = () => {
  const stats = [
    { title: "Total Revenue", value: "$1,240,500", icon: "attach_money" },
    { title: "Total Orders", value: "15,340", icon: "shopping_cart" },
    { title: "Active Sellers", value: "145", icon: "store" },
    { title: "Active Products", value: "3,402", icon: "inventory" },
  ];

  return (
    <div className="flex gap-6 mb-8 overflow-auto">
      {stats.map((s) => (
        <div
          key={s.title}
          className="bg-white flex-auto xl:p-6 p-4 rounded-xl border border-[#e5e7eb] shadow-sm hover:shadow-lg hover:border-[#10b981]/30 transition-all duration-300 flex flex-col justify-between h-40 group relative overflow-hidden min-w-70"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[#6b7280] text-sm font-medium uppercase tracking-wide">
                {s.title}
              </p>
              <h3 className="text-[#111827] text-3xl font-bold tracking-tight">
                {s.value}
              </h3>
            </div>
            <span className="material-symbols-outlined text-emerald-600 bg-emerald-100 p-2 rounded-lg">
              {s.icon}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-auto z-10">
            <span className="text-emerald-700 bg-emerald-100 text-xs font-bold flex items-center px-2 py-0.5 rounded-full">
              <span className="material-symbols-outlined text-[14px] mr-0.5">
                trending_up
              </span>
              12%
            </span>
            <span className="text-[#6b7280] text-xs">vs last month</span>
          </div>
        </div>
      ))}
    </div>
  );
};
export default StatsCards;
