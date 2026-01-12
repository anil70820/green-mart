import EarningsCard from "@/components/seller/payments/EarningsCard";
import EarningsChart from "@/components/seller/payments/EarningsChart";
import RecentActivity from "@/components/seller/payments/RecentActivity";
import React from "react";

const page = () => {
  return (
    <div className="p-5">
      <EarningsCard />
      <EarningsChart />
      <RecentActivity />
    </div>
  );
};

export default page;
