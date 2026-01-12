import EarningChart from "@/components/admin/dashboard/EarningChart";
import QuickActions from "@/components/admin/dashboard/QuickActions";
import RecentActivities from "@/components/admin/dashboard/RecentActivities";
import StatsCards from "@/components/admin/dashboard/StatsCards";
import StatusCards from "@/components/admin/dashboard/StatusCards";

const page = () => {
  return (
    <div className="p-5">
      <StatsCards />
      <div className="grid 2xl:grid-cols-2  lg:grid-cols-1 sm:grid-cols-2 gap-6">
      <StatusCards />
      <QuickActions/>
      </div>
      <EarningChart/>
      <RecentActivities />
    </div>
  );
};

export default page;
