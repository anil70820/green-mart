import React from "react";
import Cta from "./common/Cta";
import Image from "next/image";

const AppStore = () => {
  return (
    <div className="lg:my-16 md:my-12 sm:my-9 my-6 bg-orange  overflow-clip relative">
        <Image
              className="absolute -right-[50px] top-[5%] pointer-events-none opacity-30 max-md:hidden rotate-[30deg]"
              src="/assets/images/png/strawberries_ellipses.png"
              alt="straberries"
              width={124}
              height={117}
            />
        <Image
              className="absolute -left-[50px] -top-[4%] pointer-events-none opacity-30 max-md:hidden"
              src="/assets/images/png/strawberries_ellipses.png"
              alt="straberries"
              width={124}
              height={117}
            />
        <Image
              className="absolute left-[36%] -bottom-[12%] pointer-events-none opacity-30 max-md:hidden rotate-[35deg]"
              src="/assets/images/png/strawberries_ellipses.png"
              alt="straberries"
              width={124}
              height={117}
            />
      <div className="container xl:max-w-[1140px] mx-auto px-5 xl:px-0 lg:relative lg:py-24 md:py-20 sm:py-16 pt-12 flex flex-col gap-10">
        <div className="lg:max-w-[510px] md:max-w-[350px] sm:max-w-[300px]">
          <h2 className="font-gilroy-bold text-white xl:text-[54px] lg:text-5xl md:text-4xl text-3xl md:mb-4 mb-2 leading-[130%] max-sm:text-center">
            Download Our Mobile App
          </h2>
          <p className="font-inter font-normal md:text-base text-sm leading-[150%] text-white/90 md:mb-10 mb-8 max-sm:text-center">
            Shop fresh groceries anytime, anywhere with the GreenMart app! Enjoy
            exclusive deals, fast delivery, and a seamless shopping experience.
          </p>
          <div className="flex items-center gap-3.5 max-sm:justify-center">
            <Cta href="https://apps.apple.com/app/greenmart/id1234567890" target="_blank" ctaType="none">
                <Image src="/assets/images/svg/apple_store.svg" alt="apple_store" width={178} height={53} sizes="100vw"/>
            </Cta>
            <Cta href="https://play.google.com/store/apps/details?id=com.greenmart.app" target="_blank" ctaType="none">
                <Image src="/assets/images/svg/google_play_store.svg" alt="google_play_store" width={178} height={53} sizes="100vw"/>
            </Cta>
          </div>
        </div>
        <Image className="sm:absolute bottom-0 right-0 lg:w-[500px] md:w-[350px] sm:w-[300px] w-[250px] object-contain mx-auto" src="/assets/images/png/mobile_app_view.png" alt="app_view" width={500} height={600}/>
      </div>
    </div>
  );
};

export default AppStore;
