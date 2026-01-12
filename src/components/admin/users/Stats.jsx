const Stats = () => {
  const stats = [
    { title: "Total Users", value: "12,450", icon: "group" },
    { title: "active users", value: "11,200", icon: "verified_user" },
    { title: "blocked users", value: "1,250", icon: "block" },
  ];

  return (
    <div className="flex gap-6 mb-8 overflow-auto">
      {stats.map((s) => (
        <div
          key={s.title}
          className="bg-white flex-auto xl:p-6 p-4 rounded-xl border border-[#e5e7eb] shadow-sm hover:shadow-lg hover:border-[#10b981]/30 transition-all duration-300 flex flex-col justify-between h-40 group relative overflow-hidden min-w-70"
        >
       
            <div className="flex justify-between items-center gap-5">
              <p className="text-[#6b7280] text-sm font-medium uppercase tracking-wide">
                {s.title}
              </p>
            <span className={`material-symbols-outlined ${s.icon == "block" ? "text-red-600 bg-red-100":"text-emerald-600 bg-emerald-100"} p-2 rounded-lg`}>
              {s.icon}
            </span>
            </div>
              <h3 className="text-[#111827] text-3xl font-bold tracking-tight">
                {s.value}
              </h3>
          <div className="flex items-center gap-2 mt-auto z-10">
            <span className="text-emerald-700 text-sm font-semibold flex items-center">
              <span className="material-symbols-outlined text-[14px] mr-0.5">
                trending_up
              </span>
              +12%
            </span>
            <span className="text-[#16a34a] text-sm font-semibold">from last month</span>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Stats;
