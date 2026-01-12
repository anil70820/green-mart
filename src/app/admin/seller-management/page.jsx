import SellerTable from "@/components/admin/sellers/SellerTable";
import Stats from "@/components/admin/sellers/Stats";
import React from "react";

const page = () => {
  return (
    <div className="p-5 h-[calc(100vh-80px)]">
      <Stats />
      <SellerTable/>
    </div>
  );
};

export default page;
