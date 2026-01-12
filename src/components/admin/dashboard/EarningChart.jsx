"use client";
import { useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const DATA_7_DAYS = [
  { week: "Mon", value: 2000 },
  { week: "Tue", value: 3500 },
  { week: "Wed", value: 5000 },
  { week: "Thu", value: 4500 },
  { week: "Fri", value: 7000 },
  { week: "Sat", value: 6500 },
  { week: "Sun", value: 8000 },
];

const DATA_30_DAYS = Array.from({ length: 30 }, (_, i) => ({
  week: `Day ${i + 1}`,
  value: Math.floor(Math.random() * 1500) ,
}));

const DATA_YEAR = [
  { week: "Jan", value: 1200 },
  { week: "Feb", value: 9000 },
  { week: "Mar", value: 1400 },
  { week: "Apr", value: 1600 },
  { week: "May", value: 1800 },
  { week: "Jun", value: 1500 },
  { week: "Jul", value: 2000 },
  { week: "Aug", value: 1700 },
  { week: "Sep", value: 1900 },
  { week: "Oct", value: 2200 },
  { week: "Nov", value: 2100 },
  { week: "Dec", value: 2400 },
];
const EarningChart = () => {
  const [range, setRange] = useState("30");

  const data = useMemo(() => {
    if (range === "7") return DATA_7_DAYS;
    if (range === "365") return DATA_YEAR;
    return DATA_30_DAYS;
  }, [range]);
  const dataWithZero = useMemo(() => {
    if (!data.length) return data;

    return [
      { week: "", value: 0 }, // 👈 origin point
      ...data,
    ];
  }, [data]);

  /* Dynamic width */
  const POINT_WIDTH = 100;
  const chartWidth = Math.max(data.length * POINT_WIDTH, 700);

  return (
    <div className="rounded-2xl bg-white py-5 shadow ring-1 ring-black/5 my-8 overflow-hidden">
      <div className="mb-6 flex items-center justify-between px-5">
        <div>
          <h3 className="text-lg font-bold">Revenue & Orders</h3>
          <p className="text-xs text-gray-500">
            Platform performance over time
          </p>
        </div>

        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="rounded-lg bg-gray-50 px-3 py-1 text-xs font-bold"
        >
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="365">Last Year</option>
        </select>
      </div>
      <div className="relative w-full lg:h-70 overflow-x-auto">
        <div className="h-52.5 lg:h-70" style={{ minWidth: chartWidth }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dataWithZero}>
              <defs>
                <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="week"
                tick={{ fontSize: 16, fill: "#94a3b8" }}
                axisLine={true}
                tickLine={true}
                tickFormatter={(value) => (value === "" ? "" : value)}
              />

              <YAxis
                tick={{ fontSize: 14, fill: "#94a3b8" }}
                axisLine={true}
                tickLine={true}
                tickFormatter={(value) =>
                  value === 0 ? "" : `${value / 1000}k`
                }
              />

              <Tooltip cursor={{ stroke: "#22c55e", strokeDasharray: "3 3" }} />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#22c55e"
                strokeWidth={3}
                fill="url(#greenGradient)"
                animationDuration={800}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default EarningChart;
