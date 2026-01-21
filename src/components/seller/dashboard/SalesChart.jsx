"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = {
  daily: [
    { day: "Mon", value: 1200 },
    { day: "Tue", value: 2600 },
    { day: "Wed", value: 1800 },
    { day: "Thu", value: 3200 },
    { day: "Fri", value: 4200 },
    { day: "Sat", value: 2200 },
    { day: "Sun", value: 2800 },
  ],
  weekly: [
    { day: "W1", value: 12000 },
    { day: "W2", value: 18500 },
    { day: "W3", value: 16200 },
    { day: "W4", value: 21000 },
  ],
  monthly: [
    { day: "Jan", value: 42000 },
    { day: "Feb", value: 38000 },
    { day: "Mar", value: 46000 },
    { day: "Apr", value: 52000 },
    { day: "May", value: 48000 },
    { day: "Jun", value: 51000 },
    { day: "Jul", value: 49500 },
    { day: "Aug", value: 53000 },
    { day: "Sep", value: 47000 },
    { day: "Oct", value: 56000 },
    { day: "Nov", value: 60000 },
    { day: "Dec", value: 58000 },
  ],
};
const BAR_WIDTH = 70;

const SalesChart = () => {
  const [activeTab, setActiveTab] = useState("daily");
  return (
    <div className="w-full">
      <div className="bg-surface-light dk:bg-surface-dark p-5 rounded-xl border border-gray-100 dk:border-gray-800 shadow-sm scrollbar_hidden">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6 gap-4  flex-wrap">
          <h3 className="font-bold text-lg text-text-main-light dk:text-text-main-dark">
            Sales Overview
          </h3>

          <div className="flex bg-gray-100 dk:bg-gray-800 rounded-lg p- min-w-55">
            {["daily", "weekly", "monthly"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 text-xs rounded transition w-1/3 text-center ${
                  activeTab === tab
                    ? "font-bold bg-white dk:bg-gray-700 text-text-main-light dk:text-text-main-dark shadow-sm"
                    : "font-medium text-text-sub-light dk:text-text-sub-dark"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto w-full">
          <div
            className="relative h-55"
            style={{
              minWidth: chartData[activeTab].length * BAR_WIDTH,
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData[activeTab]} barCategoryGap={8}>
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  className="text-xs text-text-sub-light"
                />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    background: "#111827",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "11px",
                    color: "#fff",
                  }}
                  formatter={(value) => `$${value.toLocaleString()}`}
                />
                <Bar
                  dataKey="value"
                  radius={[6, 6, 0, 0]}
                  fill="#bbf7d0"
                  isAnimationActive
                >
                  {/* Active (Highest) Bar Highlight */}
                  {chartData[activeTab].map((entry, index) => {
                    const maxValue = Math.max(
                      ...chartData[activeTab].map((d) => d.value),
                    );
                    return (
                      <cell
                        key={`cell-${index}`}
                        fill={entry.value === maxValue ? "#22c55e" : "#bbf7d0"}
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
