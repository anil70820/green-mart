import Link from "next/link";
import React from "react";
import Icons from "./common/Icons";

const TitleBar = () => {
  return (
    <div className="py-2.5 bg-orange">
      <div className="container xl:max-w-[1140px] mx-auto xl:px-0 px-5 w-full flex justify-between md:gap-6 gap-3 items-center md:flex-row flex-col">
        <p className="font-inter font-medium text-sm leading-[150%] text-white">
          Free Local Shipping on All Orders
        </p>
        <div className="flex md:gap-6 gap-2 justify-center items-center md:flex-nowrap flex-wrap">
          <Link
            href="tel:+1 (800) 123-4567"
            target="_blank"
            rel="noopener noreferrer"
            className="font-inter font-medium text-sm leading-[100%] text-white hover:text-green active:text-green focus:text-green transition-all duration-300 flex gap-1 items-center"
          >
            <span>
              <Icons icon="titleCall" />
            </span>{" "}
            +1 (800) 123-4567
          </Link>
          <Link
            href="mailto:support@greenmart.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-inter font-medium text-sm leading-[100%] text-white hover:text-green active:text-green focus:text-green transition-all duration-300 flex gap-1 items-center"
          >
            <span>
              <Icons icon="titleEmail" />
            </span>{" "}
            support@greenmart.com
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
