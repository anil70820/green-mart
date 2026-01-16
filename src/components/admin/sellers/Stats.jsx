"use client"
import api from "@/utils/axios";
import { useEffect, useState } from "react";

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
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/sellers/stats");

        const { totalSellers, pendingKyc, activeStores } = res.data;

        setStats([
          {
            title: "Total Sellers",
            value: totalSellers.count.toLocaleString(),
            icon: "store",
            growth: totalSellers.growth,
          },
          {
            title: "Pending KYC",
            value: pendingKyc.count.toLocaleString(),
            icon: "verified_user",
          },
          {
            title: "Active Stores",
            value: activeStores.count.toLocaleString(),
            icon: "check_circle",
          },
        ]);
      } catch (error) {
        console.error("Failed to fetch seller stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return null;

  return (
 <div className="flex gap-6 mb-8 overflow-auto">
      {stats.map((s) => {
        const config = STATS_CONFIG[s.title];

        return (
          <div
            key={s.title}
            className="bg-white flex-auto xl:p-6 p-4 rounded-xl border border-[#e5e7eb] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between min-w-70"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center">
              <p className="text-[#6b7280] text-sm font-semibold uppercase">
                {s.title}
              </p>

              <span
                className={`material-symbols-outlined p-2 rounded-lg ${config.iconBg} ${config.iconText}`}
              >
                {s.icon}
              </span>
            </div>

            {/* VALUE */}
            <h3 className="text-[#111827] text-3xl font-bold mt-3">
              {s.value}
            </h3>

            {/* FOOTER */}
            <div className="mt-5">
              {/* GROWTH */}
              {config.footerType === "growth" && s.growth && (
                <div
                  className={`flex items-center gap-1.5 text-xs font-semibold ${
                    s.growth.type === "increase"
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  <span
                    className="flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {s.growth.type === "increase"
                        ? "trending_up"
                        : "trending_down"}
                    </span>
                    {s.growth.percent}%
                  </span>

                  <span className="font-medium">
                    {config.footerText}
                  </span>
                </div>
              )}

              {/* ALERT */}
              {config.footerType === "alert" && (
                <span className="bg-orange-50 text-orange-600 text-xs font-semibold px-2 py-1 rounded inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-base!">
                    priority_high
                  </span>
                  {config.footerText}
                </span>
              )}

              {/* INFO */}
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
