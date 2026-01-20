"use client";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import SideBar from "@/components/seller/common/SideBar";
import TopBar from "@/components/seller/common/TopBar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function SellerLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const titleMap = {
    "/seller/dashboard": "Dashboard",
    "/seller/orders": "Orders",
    "/seller/products": "Products",
    "/seller/products/add-new-product": "Add New Product",
    "/seller/payments": "Payments",
    "/seller/returns": "Returns Requests",
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
              title={titleMap[pathname] || "Seller Panel"}
              onMenuClick={() => setSidebarOpen(true)}
            />
            <div className="overflow-y-auto h-auto">{children}</div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
