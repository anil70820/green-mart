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
  { week: "Mon", value: 20 },
  { week: "Tue", value: 35 },
  { week: "Wed", value: 50 },
  { week: "Thu", value: 45 },
  { week: "Fri", value: 70 },
  { week: "Sat", value: 65 },
  { week: "Sun", value: 80 },
];

const DATA_30_DAYS = Array.from({ length: 30 }, (_, i) => ({
  week: `Day ${i + 1}`,
  value: Math.floor(Math.random() * 80) + 20,
}));

const DATA_YEAR = [
  { week: "Jan", value: 120 },
  { week: "Feb", value: 90 },
  { week: "Mar", value: 140 },
  { week: "Apr", value: 160 },
  { week: "May", value: 180 },
  { week: "Jun", value: 150 },
  { week: "Jul", value: 200 },
  { week: "Aug", value: 170 },
  { week: "Sep", value: 190 },
  { week: "Oct", value: 220 },
  { week: "Nov", value: 210 },
  { week: "Dec", value: 240 },
];
const EarningsChart = () => {
  const [range, setRange] = useState("30");

  const data = useMemo(() => {
    if (range === "7") return DATA_7_DAYS;
    if (range === "365") return DATA_YEAR;
    return DATA_30_DAYS;
  }, [range]);

  /* Dynamic width */
  const POINT_WIDTH = 100;
  const chartWidth = Math.max(data.length * POINT_WIDTH, 700);

  return (
    <div>
      <div className="mb-8 grid grid-cols-2 gap-6">
        <div className="rounded-lg bg-orange-50 p-3 text-center text-orange-600 shadow">
          <span className="material-symbols-outlined text-base lg:text-xl">
            hourglass_top
          </span>
          <p className="text-base sm:text-lg md:text-xl font-bold">Pending</p>
          <p className="text-base sm:text-lg md:text-2xl font-extrabold">
            $450
          </p>
        </div>

        <div className="rounded-lg bg-blue-50 p-3 text-center text-blue-600 shadow">
          <span className="material-symbols-outlined text-base lg:text-xl">
            calendar_today
          </span>
          <p className="text-base sm:text-lg md:text-xl font-bold">
            Next Payout
          </p>
          <p className="text-base sm:text-lg md:text-2xl font-extrabold">
            Oct 25
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-white py-5 shadow ring-1 ring-black/5 lg:p-8 mb-8 overflow-hidden">
        <div className="mb-6 flex items-center justify-between px-5">
          <div>
            <h3 className="text-lg font-bold">Earnings Flow</h3>
            <p className="text-xs text-gray-500">
              Your financial journey over time
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
              <AreaChart data={data}>
                <defs>
                  <linearGradient
                    id="greenGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#22c55e" stopOpacity={0.4} />
                    <stop
                      offset="100%"
                      stopColor="#22c55e"
                      stopOpacity={0.05}
                    />
                  </linearGradient>
                </defs>

                <XAxis
                  dataKey="week"
                  tick={{ fontSize: 16, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis hide />

                <Tooltip
                  cursor={{ stroke: "#22c55e", strokeDasharray: "3 3" }}
                />

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
    </div>
  );
};

export default EarningsChart;
