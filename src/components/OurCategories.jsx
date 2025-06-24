"use client";
import { OUR_CATEGORIES_LIST } from "@/utils/helper";
import Image from "next/image";
import React, { useState } from "react";
import Cta from "./common/Cta";

const OurCategories = () => {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const toggleShowAllCategories = () => {
    setShowAllCategories((prev) => !prev);
  };

  return (
    <div className="lg:py-16 md:py-12 sm:py-9 py-6 relative">
      <Image
        className="absolute -right-20 -top-[16%] pointer-events-none -z-10 max-md:hidden"
        src="/assets/images/png/dhniya.png"
        alt="dhniya"
        width={189}
        height={182}
      />
      <div className="container xl:max-w-[1140px] mx-auto px-5 xl:px-0">
        <div className="flex items-center justify-between gap-6">
          <div>
            <h2 className="font-gilroy-bold text-off-black xl:text-[54px] lg:text-5xl md:text-4xl text-3xl lg:mb-4 md:mb-3 mb-2 leading-[130%] max-sm:text-center">
              Explore Our Categories
            </h2>
            <p className="text-black font-inter font-normal text-opacity-70 lg:text-base text-sm leading-[150%] max-sm:text-center">
              Find fresh, organic, and essential groceries with ease!
            </p>
          </div>
          <Cta
            onClick={toggleShowAllCategories}
            className="max-sm:hidden max-w-[124px] !me-0"
          >
            {showAllCategories ? "See Less" : "See All"}
          </Cta>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-6 md:gap-5 sm:gap-4 gap-3 lg:mt-12 md:mt-10 mt-8">
          {(showAllCategories
            ? OUR_CATEGORIES_LIST
            : OUR_CATEGORIES_LIST.slice(0, 4)
          ).map((category, index) => {
            return (
              <div
                key={index}
                className={`${category.theme} border-[1.53px] lg:h-[290px] w-full rounded-2xl p-5 flex items-center flex-col justify-between hover:scale-95 active:scale-95 focus:scale-95 transition-all duration-300 cursor-pointer`}
              >
                <div className="sm:max-h-[140px] max-h-[100px] w-full">
                  <Image
                    src={category.item}
                    alt="categories"
                    fill={false}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="object-contain w-full max-h-full"
                  />
                </div>
                <h3 className="font-gilroy-bold font-normal md:text-2xl sm:text-xl text-lg leading-[[130%] text-dark-black text-center mt-5 md:h-16 h-14 line-clamp-2 max-w-full overflow-ellipsis">
                  {category.title}
                </h3>
              </div>
            );
          })}
        </div>
        <Cta
          onClick={toggleShowAllCategories}
          className="sm:hidden mt-8 max-w-[124px] mx-auto"
        >
          {showAllCategories ? "See Less" : "See All"}
        </Cta>
      </div>
    </div>
  );
};

export default OurCategories;
