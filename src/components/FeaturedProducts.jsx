"use client";
import Image from "next/image";
import React, { useState } from "react";
import Icons from "./common/Icons";
import { FEATURED_PRODUCTS_LIST } from "@/utils/helper";
import Cta from "./common/Cta";

const FeaturedProducts = () => {
  const [heartIcon, setHeartIcon] = useState(
    Array(FEATURED_PRODUCTS_LIST.length).fill(false)
  );
  const [showAllProducts, setShowAllProducts] = useState(false);
  const toggleHeartIcon = (index) => {
    setHeartIcon((prev) => prev.map((item, i) => (i === index ? !item : item)));
  };
  const toggleShowAllProducts = () => {
    setShowAllProducts((prev) => !prev);
  };

  return (
    <div className="lg:py-16 md:py-12 sm:py-9 py-6 relative">
      <Image
        className="absolute -left-12 -bottom-5 pointer-events-none -z-10 max-md:hidden"
        src="/assets/images/png/strawberries_ellipses.png"
        alt="straberries"
        width={124}
        height={117}
      />
      <div className="container xl:max-w-[1140px] mx-auto px-5 xl:px-0">
        <h2 className="font-gilroy-bold text-off-black text-center xl:text-[54px] lg:text-5xl md:text-4xl text-3xl leading-[130%] md:mb-6 mb-5">
          Featured Products
        </h2>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-6 md:gap-5 gap-3">
          {(showAllProducts
            ? FEATURED_PRODUCTS_LIST
            : FEATURED_PRODUCTS_LIST.slice(0, 8)
          ).map((product, index) => {
            return (
              <div
                key={index}
                className="cursor-pointer flex flex-col justify-between border hover:border-light-green/50 border-white shadow-[4px_4px_14px_0px_#3F8A3114] hover:shadow-[4px_4px_16px_0px_#3F8A3114] rounded-2xl relative transition-all duration-300 h-full"
              >
                <p className="max-w-[77px] h-6 flex items-center justify-center round p-1 bg-light-green font-iner font-medium text-xs leading-[100%] text-center text-[#fcfcfc] w-full rounded-tr-2xl rounded-br-2xl absolute left-0 md:top-[18px] top-2">
                  20% Off
                </p>
                <span
                  onClick={() => toggleHeartIcon(index)}
                  className="cursor-pointer absolute md:top-[18px] top-2 md:right-[18px] right-2"
                >
                  <Icons
                    icon="heartIcon"
                    toggleIcon={`${heartIcon[index] ? "stroke-red" : ""}`}
                    toggleIconFill={`${
                      heartIcon[index] ? "fill-red stroke-red" : ""
                    }`}
                  />
                </span>
                <div className="sm:max-h-[145px] max-h-[100px] w-full mt-16">
                  <Image
                    src={product.productImage}
                    alt={product.productName}
                    fill={false}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="object-contain w-full max-h-full"
                  />
                </div>
                <div className="sm:p-[18px] p-2">
                  <div className="flex justify-between gap-4 mb-1">
                    <p className="font-normal text-light-green/60 leading-100 text-13 font-inter">
                      {product.category}
                    </p>
                    <p className="text-black flex items-center gap-0.5 font-inter font-medium leading-100 md:text-xl sm:text-lg text-base">
                      <Image
                        src="/assets/images/svg/rating_star.svg"
                        alt="rating-star"
                        width={24}
                        height={24}
                      />
                      {product.productRating}
                    </p>
                  </div>
                  <h3 className="font-inter font-semibold md:text-lg sm:text-base text-sm text-black leading-[100%] md:mb-1.5 mb-1 max-w-full line-clamp-2 overflow-ellipsis">
                    {product.productName}
                  </h3>
                  <p className="font-inter font-normal md:text-sm text-xs text-[#333636] leading-[100%] md:mb-4 mb-2">
                    {product.productWeight}
                  </p>
                  <div className="flex sm:items-center justify-between gap-2 max-sm:flex-col">
                    <p className="font-inter font-semibold md:text-base sm:text-sm text-xs text-black">
                      ${product.productPrice.toFixed(2)}
                      <del className="font-medium md:text-xs text-[10px] text-[#6D6D6D] ms-1">
                        ${product.productOldPrice.toFixed(2)}
                      </del>
                    </p>
                    <button className="cursor-pointer rounded-lg bg-[#B8DDB4]/45 p-1 h-7 sm:text-sm text-xs font-medium font-inter sm:max-w-[67px] w-full flex items-center justify-center gap-1 hover:bg-light-green hover:text-white transition-all duration-300 group">
                      <Icons
                        icon="cartIcon"
                        className="group-hover:stroke-white transition-all duration-300"
                      />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Cta
          onClick={toggleShowAllProducts}
          className="mt-10 max-w-[215px] mx-auto"
        >
          {showAllProducts ? "View Less Products" : "View All Products"}
        </Cta>
      </div>
    </div>
  );
};

export default FeaturedProducts;
