"use client";
import { NAV_LINKS_LIST } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Cta from "./common/Cta";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    const newState = !isOpen;
    setIsOpen(newState);

    if (newState) {
      // Menu is now open — prevent scroll on mobile
      document.body.classList.add("max-md:overflow-hidden");
      document.body.classList.remove("overflow-auto");
    } else {
      // Menu is now closed — allow scroll again
      document.body.classList.remove("max-md:overflow-hidden");
      document.body.classList.add("overflow-auto");
    }
  };

  return (
    <div className="py-[18px]">
      <div className="container xl:max-w-[1140px] mx-auto xl:px-0 px-5 w-full">
        <div className="flex items-center justify-between">
          <Link href="/" className="relative z-[99]">
            <Image
              src="/assets/images/svg/logo.svg"
              alt="Logo"
              width={246}
              height={55}
              className="lg:w-[246px] w-[180px] h-auto"
              sizes="100vw"
            />
          </Link>
          <div
            className={`flex items-center md:flex-row flex-col md:static fixed duration-300 md:h-auto  ${
              isOpen
                ? "right-0 top-0 w-screen h-screen justify-center bg-white z-50"
                : "right-[-100%] top-0"
            }`}
          >
            <ul className="flex items-center lg:gap-6 md:gap-4 gap-6 md:flex-row flex-col">
              {NAV_LINKS_LIST.map((obj, index) => {
                return (
                  <li key={index}>
                    <Link
                      onClick={() => setIsOpen(false)}
                      href={obj.url}
                      className="text-off-black font-inter font-medium leading-[100%] capitalize text-base relative after:absolute after:w-full after:bg-green after:h-px after:scale-x-0 after:-bottom-1 after:left-0 hover:after:scale-100 active:after:scale-100 focus:after:scale-100 after:transition-all after:duration-300 hover:text-green active:text-green focus:text-green duration-300 transition-all inline-block"
                    >
                      {obj.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Cta
              onClick={() => setIsOpen(false)}
              className="sm:hidden mt-6 max-w-[173px] !h-[46px] w-full text-center bg-transparent !border-black !text-black border shadow-none hover:!border-green hover:!text-green active:!border-green focus:!text-green focus:!border-green active:!text-green"
            >
              Order Delivery
            </Cta>
          </div>
          <Cta
            onClick={() => setIsOpen(false)}
            className="max-sm:hidden max-w-[173px] !h-[46px] w-full text-center bg-transparent !border-black !text-black border shadow-none hover:!border-green hover:!text-green active:!border-green focus:!text-green focus:!border-green active:!text-green"
          >
            Order Delivery
          </Cta>
          <button
            aria-label="menu"
            onClick={toggleMenu}
            className="flex flex-col items-center justify-center w-10 h-10 outline-none md:hidden relative z-50"
          >
            <span
              className={`block w-6 h-0.5 bg-green transition-transform duration-300 ${
                isOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-green my-1 transition-opacity duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-green transition-transform duration-300 ${
                isOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
