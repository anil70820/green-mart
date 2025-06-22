import { WHY_CHOOSE_US_CARDS_LIST } from "@/utils/helper";
import Image from "next/image";

const WhyUs = () => {
  return (
    <div className="lg:py-16 md:py-12 sm:py-9 py-6">
      <div className="container xl:max-w-[1140px] mx-auto px-5 xl:px-0">
        <h2 className="font-gilroy-bold text-off-black text-center xl:text-[54px] lg:text-5xl md:text-4xl text-3xl leading-[130%] lg:mb-4 md:mb-3 mb-2">
          Why Choose GreenMart
        </h2>
        <p className="text-black font-inter font-normal text-opacity-50 lg:text-base text-sm leading-[150%] mb-4 text-center max-w-[648px] mx-auto">
          Fresh, organic, and eco-friendly groceries delivered fast! Enjoy
          sustainable shopping, great deals, and a seamless experience—all in
          one place.{" "}
        </p>
        <div className="lg:mt-12 md:mt-10 mt-8 flex justify-center sm:gap-6 gap-5 flex-wrap items-stretch">
          {WHY_CHOOSE_US_CARDS_LIST.map((card, index) => {
            return (
              <div
                key={index}
                className="flex flex-col flex-1 basis-0 min-w-[250px] items-stretch border border-black/10 shadow-[4px_4px_14px_0px_#3F8A3114] rounded-2xl p-6 max-w-[364px] w-full hover:border-light-green/50 hover:shadow-[4px_4px_16px_0px_#3F8A3114] transition-all duration-300"
              >
                <div className="w-[110px] h-[110px] bg-bermuda rounded-md flex items-center justify-center mb-4 mx-auto">
                  <Image
                    src={card.icon}
                    alt="why_us"
                    width={50}
                    height={50}
                    className="w-fit"
                  />
                </div>
                <h3 className="mb-2.5 font-normal lg:text-2xl md:text-[22px] text-xl leading-[120%] text-black font-gilroy-semibold text-center">
                  {card.title}
                </h3>
                <p className="font-inter lg:text-[17px] md:text-base text-sm leading-[150%] text-opacity-80 text-black text-center font-normal">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
