"use client";
import SideBar from "@/components/admin/common/SideBar";
import TopBar from "@/components/admin/common/TopBar";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const titleMap = {
    "/admin/dashboard": "Dashboard Overview",
    "/admin/seller-order-management": "Orders Mamagements",
    "/admin/seller-products-management": "Products Mamagements",
    "/admin/payments-and-Commissions": "Payments And Commissions",
    "/admin/returns-management": "Returns Overview",
    "/admin/disputes": "disputes",
    "/admin/settings": "settings",
    "/admin/help-and-support": "help and support",
  };
  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // cleanup (important)
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [sidebarOpen]);
  return (
    <ProtectedRoute>
      <div className="max-w-500 mx-auto h-screen overflow-hidden scrollbar_hidden">
        <div className="flex">
          <SideBar open={sidebarOpen} setOpen={setSidebarOpen} />

          <div className="w-full h-screen overflow-y-auto">
            <TopBar
              title={titleMap[pathname] || "Admin Panel"}
              onMenuClick={() => setSidebarOpen(true)}
            />
            <div className="overflow-y-auto h-auto">{children}</div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
