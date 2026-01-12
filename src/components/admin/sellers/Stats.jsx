const STATS_CONFIG = {
  "Total Sellers": {
    iconBg: "bg-blue-50",
    iconText: "text-blue-600",
    footerType: "growth",
    footerText: "vs last month",
    footerValue: "12%",
  },
  "Pending KYC": {
    iconBg: "bg-orange-50",
    iconText: "text-orange-600",
    footerType: "alert",
    footerText: "Action Required",
  },
  "Active Stores": {
    iconBg: "bg-emerald-50",
    iconText: "text-emerald-600",
    footerType: "info",
    footerText: "89% Approval Rate",
  },
  "Total Revenue": {
    iconBg: "bg-purple-50",
    iconText: "text-purple-600",
    footerType: "growth",
    footerText: "increase",
    footerValue: "8%",
  },
};

const Stats = () => {
  const stats = [
    { title: "Total Sellers", value: "1,240", icon: "store" },
    { title: "Pending KYC", value: "45", icon: "verified_user" },
    { title: "Active Stores", value: "1,105", icon: "check_circle" },
    { title: "Total Revenue", value: "$2.4M", icon: "payments" },
  ];

  return (
    <div className="flex gap-6 mb-8 overflow-auto">
      {stats.map((s) => {
        const config = STATS_CONFIG[s.title];

        return (
          <div
            key={s.title}
            className="bg-white flex-auto xl:p-6 p-4 rounded-xl border border-[#e5e7eb] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative overflow-hidden min-w-70"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center">
              <p className="text-[#6b7280] text-sm font-semibold uppercase tracking-wide">
                {s.title}
              </p>

              <span
                className={`material-symbols-outlined p-2 rounded-lg ${config.iconBg} ${config.iconText}`}
              >
                {s.icon}
              </span>
            </div>

            {/* VALUE */}
            <h3 className="text-[#111827] text-3xl font-bold tracking-tight mt-3">
              {s.value}
            </h3>

            {/* FOOTER */}
            <div className="mt-5">
              {config.footerType === "growth" && (
                <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-semibold">
                  <span className="bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      trending_up
                    </span>
                    {config.footerValue}
                  </span>
                  <span className="text-[#6b7280] font-medium">
                    {config.footerText}
                  </span>
                </div>
              )}

              {config.footerType === "alert" && (
                <span className="bg-orange-50 text-orange-600 text-xs font-semibold px-2 py-1 rounded inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-base!">
                    priority_high
                  </span>
                  {config.footerText}
                </span>
              )}

              {config.footerType === "info" && (
                <span className="bg-slate-100 text-[#6b7280] text-xs font-semibold px-2 py-1 rounded">
                  {config.footerText}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stats;
