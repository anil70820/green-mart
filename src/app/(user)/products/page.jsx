import AllProducts from "@/components/user/products/AllProducts";
import CategoryStrip from "@/components/user/products/Categories";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading products...</div>}>
        <CategoryStrip />
        <AllProducts />
      </Suspense>
    </div>
  );
};

export default page;
