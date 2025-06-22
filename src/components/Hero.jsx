import React from "react";
import Cta from "./common/Cta";
import Image from "next/image";
import Icons from "./common/Icons";

const Hero = () => {
  return (
    <div className="lg:pt-[122px] md:pt-24 sm:pt-20 pt-4 relative">
      <Image className="absolute right-0 -z-10 top-16 max-md:hidden pointer-events-none" src="/assets/images/png/dots.png" alt="dots" width={120} height={93}/>
      <Image className="absolute left-0 -z-10 -bottom-9 max-md:hidden pointer-events-none" src="/assets/images/png/dots.png" alt="dots" width={120} height={93}/>
      <Image className="absolute left-[42.5%] -z-10 top-5 max-md:hidden pointer-events-none" src="/assets/images/png/leaf.png" alt="leaf" width={99} height={44}/>
      <Image className="absolute -right-3 -z-10 -bottom-9 max-md:hidden pointer-events-none rotate-[30deg]" src="/assets/images/png/leaf.png" alt="leaf" width={99} height={44}/>
      <Image className="absolute left-[35%] -z-10 -bottom-9 max-md:hidden pointer-events-none rotate-[50deg] opacity-30" src="/assets/images/png/leaf.png" alt="leaf" width={99} height={44}/>
      <div className="container xl:max-w-[1140px] mx-auto px-5 xl:px-0 md:mb-[87px] mb-12">
        <div className="flex md:flex-row flex-col gap-7">
          <div className="max-w-[560px]">
            <h1 className="font-gilroy-bold text-off-black font-normal leading-[130%] xl:text-[58px] lg:text-[50px] md:text-[42px] sm::text-5xl  text-4xl sm:mb-4 mb-3 max-md:text-center">
              Fresh, Fast & Eco-Friendly{" "}
              <span className="text-orange"> Grocery Shopping!</span>
            </h1>
            <p className="font-inter font-normal lg:text-[22px] md:text-lg text-base leading-[150%] text-black-800 max-w-[378px] mb-10 max-md:text-center max-md:mx-auto">
              Shop smart, eat healthy, and stay sustainable with GreenMart.
            </p>
            <div className="flex items-center gap-3 max-md:justify-center">
              <Cta
                href="https://apps.apple.com/app/greenmart/id1234567890"
                target="_blank"
                ctaType="none"
              >
                <Image
                  src="/assets/images/svg/apple_store.svg"
                  alt="apple_store"
                  width={140}
                  height={42}
                  sizes="100vw"
                />
              </Cta>
              <Cta
                href="https://play.google.com/store/apps/details?id=com.greenmart.app"
                target="_blank"
                ctaType="none"
              >
                <Image
                  src="/assets/images/svg/google_play_store.svg"
                  alt="google_play_store"
                  width={140}
                  height={42}
                  sizes="100vw"
                />
              </Cta>
            </div>
          </div>
          <div className="max-w-[500px] w-full mx-auto flex max-md:justify-center relative mt-[73px]">
            <div className="lg:w-[95px] lg:h-[95px] w-20 h-20 bg-green rounded-full flex flex-col justify-center items-center absolute top-[10%] max-[500px]:right-0 right-[10%] sm:right-[1%] sm:top-[11%] md:-right-5 lg:right-0 xl:right-6 xl:top-[6%] pointer-events-none">
              <p className="font-inter font-medium text-xs leading-[100%] text-white">
                Discount
              </p>
              <p className="font-inter font-black md:text-2xl text-xl mt-1 leading-[100%] text-white">
                30%
              </p>
            </div>
            <div className="bg-white border border-orange/50 rounded-lg shadow-[0px_3.45px_24px_0px_#EC6D1D1F] md:p-[18px] p-3 flex justify-center items-center gap-3.5 absolute -top-[20%] xl:-right-[6%] md:-right-2 lg:-right-2 right-5 pointer-events-none">
              <span>
                <Icons icon="greenTick" />
              </span>
              <p className="font-inter font-normal text-black leading-[100%] lg:text-2xl md:text-xl text-base">
                Secure Payment
              </p>
            </div>
            <div className="bg-white border border-orange/50 rounded-lg shadow-[0px_3.45px_24px_0px_#EC6D1D1F] md:p-[18px] p-3 flex justify-center items-center gap-3.5 absolute -bottom-5 left-0 md:bottom-0 md:-left-28 lg:bottom-6 lg:-left-[140px] pointer-events-none">
              <span>
                <Icons icon="greenTick" className="fill-orange" />
              </span>
              <p className="font-inter font-normal text-black leading-[100%] lg:text-2xl md:text-xl text-base">
                Fast Delivery
              </p>
            </div>
            <Image
              src="/assets/images/png/hero_img_ellipse.png"
              alt="hero_image_ellipse"
              width={750}
              height={700}
              className="absolute -z-10 lg:min-w-[752px] lg:min-h-[700px] md:min-w-[500px] lg:top-[33%] lg:left-[45%] md:top-[42%] md:left-[60%] sm:min-w-[680px] sm:top-[40%] sm:left-[55%] min-w-[500px] left-[50%] top-[40%] -translate-x-1/2 -translate-y-1/2"
              sizes="100vw"
            />
            <Image
              src="/assets/images/png/hero_image.png"
              alt="hero_image"
              width={400}
              height={400}
              className="max-w-full h-auto max-sm:w-[300px]"
              sizes="100vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
