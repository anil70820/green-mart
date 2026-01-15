import AddNewProduct from "@/components/seller/product/AddNewProduct";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={null}>
        <AddNewProduct />
      </Suspense>
    </div>
  );
};

export default page;
