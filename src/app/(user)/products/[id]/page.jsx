import ProductGallery from "@/components/user/products/ProductGallery";
import ProductInfo from "@/components/user/products/ProductInfo";
import ProductReviews from "@/components/user/products/ProductReview";
import ProductTabs from "@/components/user/products/ProductTabs";
import { product } from "@/utils/helper";
import React from "react";

const page = () => {
  return (
    <main className="xl:max-w-285 xl:px-0 mx-auto px-5 pt-6 md:pt-10 container">
      <section className="grid grid-cols-1 lg:grid-cols-2 xl:gap-16 gap-10 mb-16">
        <ProductGallery images={product.images} />
        <ProductInfo product={product} />
      </section>

      <ProductTabs />
      <ProductReviews />
    </main>
  );
};

export default page;
