"use client";
import { GOOGLE_REVIEWS_LIST } from "@/utils/helper";
import Image from "next/image";
import React, { useRef } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Icons from "./common/Icons";
const GoogleReview = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <div className="lg:py-16 md:py-12 sm:py-9 py-6 relative">
      <Image
        className="absolute -right-[70px] top-[5%] pointer-events-none -z-10 max-md:hidden rotate-[30deg]"
        src="/assets/images/png/strawberries_ellipses.png"
        alt="straberries"
        width={124}
        height={117}
      />
      <div className="container xl:max-w-[1140px] mx-auto px-5 xl:px-0">
        <h2 className="font-gilroy-bold text-off-black xl:text-[54px] lg:text-5xl md:text-4xl text-3xl lg:mb-4 md:mb-3 mb-2 leading-[130%] text-center">
          Google Reviews
        </h2>
        <p className="text-black-800 font-inter font-normal text-opacity-70 lg:text-base text-sm leading-[150%] max-w-[584px] text-center mx-auto">
          Real reviews from happy shoppers! Fresh products, great prices, and
          fast delivery—experience the GreenMart difference today.
        </p>
        <div className="mt-8 relative">
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
            centeredSlides={true}
            loop={true}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            modules={[Navigation, Autoplay]}
            className="mySwiper !h-full !grid !pt-11"
          >
            {GOOGLE_REVIEWS_LIST.map((review, index) => {
              return (
                <SwiperSlide key={index} className="!h-full">
                  <div className="bg-white !h-full w-full shadow-[4px_4px_14px_0px_#3F8A3114] hover:shadow-[4px_4px_16px_0px_#3F8A3114] active:shadow-[4px_4px_16px_0px_#3F8A3114] focus:shadow-[4px_4px_16px_0px_#3F8A3114] rounded-3xl md:p-7 p-5 flex flex-col items-center justify-between relative transition-all duration-300 border border-transparent hover:border-light-green/50 active:border-light-green/50 focus:border-light-green/50">
                    <Image
                      className="absolute lg:right-4 lg:top-4 top-3 right-3 md:size-[50px] size-10"
                      src="/assets/images/svg/quotes.svg"
                      alt="quotes"
                      width={50}
                      height={50}
                    />
                    <Image
                      className="absolute left-1/2 lg:-top-[15%] -top-[16%] -translate-x-1/2 lg:size-[100px] size-[80px]"
                      src={review.profileImage}
                      alt={review.name}
                      width={100}
                      height={100}
                    />
                    <p className="font-inter font-medium text-lg leading-[150%] text-black-700 lg:mt-10 mt-8 lg:mb-4 mb-2">
                      {review.name}
                    </p>
                    <div className="flex items-center lg:mb-4 mb-2">
                      {[...Array(Math.min(review.rating, 5))].map((_, i) => (
                        <Image
                          key={i}
                          className="lg:size-[33px] size-7"
                          src="/assets/images/svg/rating_star.svg"
                          alt="rating_star"
                          width={33}
                          height={33}
                        />
                      ))}
                    </div>
                    <h3 className="font-inter font-semibold lg:mb-4 mb-2 lg:text-lg text-base leading-[150%] text-black-700 text-center line-clamp-2 overflow-ellipsis overflow-hidden">
                      {review.title}
                    </h3>
                    <p className="font-inter font-normal lg:text-bsae text-sm leading-[150%] text-black-800 text-center line-clamp-3 overflow-ellipsis overflow-hidden">
                      {review.description}
                    </p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="flex justify-center items-center gap-10 mt-10">
            <div
              ref={prevRef}
              className="group duration-300 sm:absolute xl:top-[60%] top-1/2 xl:!-left-16 sm:!-left-4 -translate-y-1/2 slider-prev-arrow cursor-pointer z-10 left-10 -bottom-0 xl:w-[49px] xl:h-[49px] w-10 h-10 rounded-full bg-white shadow-[0px_4px_8.2px_0px_#00000029] hover:bg-green flex justify-center items-center"
            >
              <Icons
                icon="sliderLeftArrow"
                className="group-hover:stroke-off-white group-active:stroke-off-white group-focus:stroke-off-white duration-300 transition-all"
              />
            </div>
            <div
              ref={nextRef}
              className="group duration-300 sm:absolute xl:top-[60%] top-1/2 xl:!-right-16 sm:!-right-4 -translate-y-1/2 slider-next-arrow cursor-pointer z-10 right-10 -bottom-0 xl:w-[49px] xl:h-[49px] w-10 h-10 rounded-full bg-white shadow-[0px_4px_8.2px_0px_#00000029] hover:bg-green flex justify-center items-center"
            >
              <Icons
                icon="sliderRightArrow"
                className="group-hover:stroke-off-white group-active:stroke-off-white group-focus:stroke-off-white duration-300 transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleReview;
