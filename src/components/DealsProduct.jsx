import React from "react";
import Cta from "./common/Cta";
import DealsProductImages from "./DealsProductImages";
import DealsCountDown from "./DealsCountDown";

const DealsProduct = ({ description,productImages,countDownTime }) => {
  return (
    <div className="bg-white sm:rounded-3xl rounded-2xl flex md:flex-row flex-col mt-9 md:p-[22px] p-4 sm:!pb-10 !pb-30 lg:gap-12 gap-6 relative overflow-hidden">
      <div className="lg:max-w-[370px] md:max-w-[280px] w-full">
        <DealsProductImages productImages={productImages} />
      </div>
      <div className="max-w-full">
        <h3 className="font-inter font-bold lg:text-4xl md:text-3xl text-2xl leading-[100%] text-black-900 lg:mb-4 mb-3">
          {description.title}
        </h3>
        <p className="max-w-[570px] font-inter font-bold lg:text-base text-sm leading-[100%] text-black-900/80 lg:mb-4 mb-3">
          {description.description}
        </p>
        <p className="font-inter font-bold lg:text-2xl text-xl leading-[100%] text-black-900 lg:mb-5 mb-3">
          {description.weight} -{" "}
          <span className="text-light-green">${description.price}</span>
        </p>
        <p className="font-inter font-semibold lg:text-xl text-lg leading-[100%] text-light-green lg:mb-4 mb-3">
          {description.discountNote}
        </p>
        <ul className="list-disc pl-5 lg:space-y-2 space-y-1 font-inter font-normal text-base leading-[100%] text-black-900 marker:text-green marker:text-2xl marker:leading-[100%]">
          {description.features.map((feature,index) => {
            return <li key={index}>{feature}</li>;
          })}
        </ul>
        <Cta className="max-w-[146px] mt-8">Add to cart</Cta>
      </div>
      <div className="absolute right-0 bottom-0">
        <DealsCountDown countDownTime={countDownTime} />
      </div>
    </div>
  );
};

export default DealsProduct;
