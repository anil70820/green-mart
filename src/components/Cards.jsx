import { CARDS_LIST } from "@/utils/helper";
import React from "react";
import Cta from "./common/Cta";
import Image from "next/image";

const Cards = () => {
  return (
    <div className="lg:py-16 md:py-12 sm:py-9 py-6 xl:mt-7 relative">
      <Image
        className="absolute -left-12 top-[25%] pointer-events-none -z-10 max-md:hidden"
        src="/assets/images/png/strawberries_ellipses.png"
        alt="straberries"
        width={124}
        height={117}
      />
      <div className="container xl:max-w-[1140px] mx-auto px-5 xl:px-0 grid grid-cols-1 md:grid-cols-2 gap-6">
        {CARDS_LIST.map((card, index) => {
          return (
            <div
              key={index}
              className={`${card.theme} relative overflow-clip rounded-3xl md:py-14 md:px-10 py-10 px-6 z-10`}
            >
              <Image
                src={card.productImage}
                alt="product_cards_image"
                width={250}
                height={250}
                sizes="100vw"
                className={`object-contain absolute right-0 bottom-0 lg:size-[250px] md:size-[180px] size-[150px] -z-10 pointer-events-none ${
                  index === 1 ? "!-bottom-4" : index === 0 ? "!-right-4" : ""
                }`}
              />
              <div className="max-w-[300px] w-full">
                <p className="font-inter font-normal md:text-2xl sm:text-xl text-lg leading-[100%] text-white mb-2">
                  {card.category}
                </p>
                <p className="font-inter font-semibold lg:text-4xl md:text-2xl text-xl leading-[140%] text-white mb-4">
                  {card.title}
                </p>
                <Cta className="shadow-none hover:bg-transparent active:bg-transparent focus:bg-transparent !text-black hover:!text-white active:!text-white focus:!text-white sm:max-w-[152px] max-w-[120px] max-sm:!text-base bg-white border border-transparent hover:border-white active:border-white focus:border-white max-sm:h-10">
                  Shop Now
                </Cta>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
