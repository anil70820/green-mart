"use client";
import api from "@/utils/axios";
import { useEffect, useState } from "react";

const Stats = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    blockedUsers: 0,
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/users/stats");
        setStats(res.data);
        console.log(res);
      } catch (err) {
        console.log("Faild to fetch users stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);
  const STATS_UI = [
    {
      title: "Total Users",
      value: stats.total?.count ?? 0,
      icon: "group",
      growth: stats.total?.growth,
    },
    {
      title: "active users",
      value: stats.active?.count ?? 0,
      icon: "verified_user",
      growth: stats.active?.growth,
    },
    {
      title: "blocked users",
      value: stats.blocked?.count ?? 0,
      icon: "block",
      growth: stats.blocked?.growth,
    },
  ];

  if (loading) {
    return <p className="text-gray-600 font-semibold">Loading Stats...</p>;
  }
  return (
    <div className="flex gap-6 mb-8 overflow-auto">
      {STATS_UI.map((s) => (
        <div
          key={s.title}
          className="bg-white flex-auto xl:p-6 p-4 rounded-xl border border-[#e5e7eb] shadow-sm hover:shadow-lg hover:border-[#10b981]/30 transition-all duration-300 flex flex-col justify-between h-40 group relative overflow-hidden min-w-70"
        >
          <div className="flex justify-between items-center gap-5">
            <p className="text-[#6b7280] text-sm font-medium uppercase tracking-wide">
              {s.title}
            </p>
            <span
              className={`material-symbols-outlined ${
                s.icon == "block"
                  ? "text-red-600 bg-red-100"
                  : "text-emerald-600 bg-emerald-100"
              } p-2 rounded-lg`}
            >
              {s.icon}
            </span>
          </div>
          <h3 className="text-[#111827] text-3xl font-bold tracking-tight">
            {s.value}
          </h3>
          <div className="flex items-center gap-2 mt-auto z-10">
            <span
              className={`${
                s.growth.type === "increase"
                  ? "text-emerald-700"
                  : "text-red-700"
              } text-emerald-700 text-sm font-semibold flex items-center`}
            >
              <span className="material-symbols-outlined text-[14px] mr-0.5">
                {s.growth.type === "increase" ? "trending_up" : "trending_down"}
              </span>
              {s.growth.type === "increase" ? "+" : "-"} {s.growth.percent}%
            </span>
            <span
              className={`${
                s.growth.type === "increase"
                  ? "text-emerald-700"
                  : "text-red-700"
              } text-sm font-semibold`}
            >
              from last month
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Stats;
