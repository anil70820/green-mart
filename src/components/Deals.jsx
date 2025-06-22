"use client";
import { BONUS_DEALS_LIST, DEALS_PRODUCT_SLIDER_LIST } from "@/utils/helper";
import Image from "next/image";
import Cta from "./common/Cta";
import DealsProduct from "./DealsProduct";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Icons from "./common/Icons";
import { useRef } from "react";

const Deals = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <div className="bg-off-white lg:pt-[109px] lg:pb-[125px] md:py-20 sm:py-16 py-12">
      <div className="container xl:max-w-[1140px] mx-auto px-5 xl:px-0">
        <h2 className="font-gilroy-bold xl:text-[54px] lg:text-5xl md:text-4xl text-3xl leading-[130%] mb-4 text-center text-off-black">
          Deals of the Day!
        </h2>
        <div className="relative">
          <Swiper
            slidesPerView={1}
            navigation={{
              nextEl: `.slider-next-arrow`,
              prevEl: `.slider-prev-arrow`,
              // disabledClass: "swiper-button-disabled",
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            speed={500}
            loop={true}
            modules={[Navigation, Autoplay]}
            className="mySwiper"
          >
            {DEALS_PRODUCT_SLIDER_LIST.map((product, index) => {
              return (
                <SwiperSlide key={index}>
                  <DealsProduct
                    description={product}
                    productImages={product.images}
                    countDownTime={product.countdownTarget}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="xl:flex justify-center items-center gap-10 mt-10 hidden">
            <span
              ref={prevRef}
              className="group duration-300 sm:absolute top-1/2 xl:!-left-16 sm:!-left-4 -translate-y-1/2 slider-prev-arrow cursor-pointer z-10 left-10 -bottom-0 w-6 h-12"
            >
              <Icons
                icon="sliderLeftArrow"
                className="group-hover:stroke-green stroke-black duration-300 transition-all" arrowSize="!w-6 !h-12"
              />
            </span>
            <span
              ref={nextRef}
              className="group duration-300 sm:absolute top-1/2 xl:!-right-16 sm:!-right-4 -translate-y-1/2 slider-next-arrow cursor-pointer z-10 right-10 -bottom-0 w-6 h-12"
            >
              <Icons
                icon="sliderRightArrow"
                className="group-hover:stroke-green stroke-black duration-300 transition-all" arrowSize="!w-6 !h-12"
              />
            </span>
          </div>
        </div>
        <h3 className="text-black-900 font-inter font-bold leading-[100%] lg:text-4xl md:text-3xl text-2xl mb-6 md:mt-16 mt-10">
          Bonus <span className="text-green"> Deals</span>
        </h3>
        <div className="grid grid-cols-1 gap-5">
          {BONUS_DEALS_LIST.map((product, index) => {
            return (
              <div
                key={index}
                className="bg-white p-[22px] rounded-sm flex md:flex-row flex-col justify-between md:items-center sm:items-end md:gap-12 gap-6"
              >
                <div className="flex sm:flex-row flex-col items-center md:gap-12 gap-8">
                  <div className="sm:w-[204px] sm:h-[119px] w-full h-[200px] rounded-xl flex justify-center items-center bg-green-100">
                    <Image
                      className={`object-contain w-[80%]  ${
                        index === 1 ? "max-h-[80%]" : "max-h-full"
                      }`}
                      src={product.productImage}
                      alt={product.productName}
                      width={0}
                      height={0}
                      sizes="100vw"
                    />
                  </div>
                  <div>
                    <h3 className="font-inter font-bold md:text-2xl text-xl leading-[100%] text-black-900 mb-1.5">
                      {product.productName}
                    </h3>
                    <p className="font-inter font-normal md:text-base text-sm leading-[100%] text-black-900 md:mb-5 mb-3">
                      {product.productDiscription}
                    </p>
                    <p className="font-inter font-semibold md:text-xl text-lg leading-[100%]">
                      <del className="text-black-900/80">
                        ${product.productOldPrice}
                      </del>
                      &nbsp; &nbsp;
                      <span className="text-green">
                        ${product.productPrice}
                      </span>
                    </p>
                  </div>
                </div>
                <Cta className="max-w-[146px]">Add to cart</Cta>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Deals;
