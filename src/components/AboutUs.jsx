import React from "react";
import Cta from "./common/Cta";

const AboutUs = () => {
  return (
    <div className="lg:mt-16 md:mt-12 sm:mt-9 mt-6 lg:py-[119px] md:py-20 sm:py-16 py-12 bg-black/60 bg-[url(/assets/images/webp/about_bg.webp)] bg-cover bg-no-repeat bg-right">
      <div className="container xl:max-w-[1140px] mx-auto px-5 xl:px-0">
        <h2 className="font-gilroy-bold text-white xl:text-[54px] lg:text-5xl md:text-4xl text-3xl leading-[130%] mb-4 max-sm:text-center">
          About GreenMart 🌿
        </h2>
        <p className="font-inter text-white/90 text-base leading-[150%] max-w-[524px] font-normal max-sm:text-center">
          At GreenMart, we bring you the freshest and highest-quality groceries
          straight from local farms to your doorstep. Our mission is to make
          healthy eating simple, affordable, and sustainable. From organic
          fruits and vegetables to eco-friendly packaging, we are committed to a
          greener future.
        </p>
        <Cta className="max-w-[136px] md:mt-10 mt-8 ms-0 bg-orange shadow-none hover:text-orange border border-transparent hover:border-orange max-sm:mx-auto">Shop Now</Cta>
      </div>
    </div>
  );
};

export default AboutUs;
