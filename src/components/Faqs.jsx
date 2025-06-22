"use client";
import { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { FAQ_DATA_LIST } from "@/utils/helper";
import Icons from "./common/Icons";
import Image from "next/image";

const Faqs = () => {
  const [open, setOpen] = useState(null);

  const handleOpen = (index) => setOpen(open === index ? null : index);
  return (
    <div className="lg:py-16 md:py-12 sm:py-9 py-6 relative">
      <Image
        className="absolute -right-20 -bottom-[9%] pointer-events-none -z-10 max-md:hidden"
        src="/assets/images/png/dhniya.png"
        alt="dhniya"
        width={189}
        height={182}
      />
      <Image
        className="absolute -left-24 -bottom-[9%] pointer-events-none -z-10 max-md:hidden rotate-y-180"
        src="/assets/images/png/dhniya.png"
        alt="dhniya"
        width={189}
        height={182}
      />
      <div className="container xl:max-w-[1140px] mx-auto px-5 xl:px-0">
        <h2 className="font-gilroy-bold text-off-black xl:text-[54px] lg:text-5xl md:text-4xl text-3xl md:mb-10 mb-8 leading-[130%] text-center">
          Help & Support Center
        </h2>
        <div className="flex flex-col gap-4 mt-10">
          {FAQ_DATA_LIST.map((faq, index) => (
            <Accordion
              key={index}
              className={`sm:p-[18px] p-3 bg-white rounded-lg border ${
                open === index
                  ? "border-light-green/50 shadow-[4px_4px_16px_0px_#3F8A3114]"
                  : "border-transparent shadow-[4px_4px_14px_0px_#3F8A3114]"
              }`}
              open={open === index}
            >
              <AccordionHeader
                className="flex justify-between items-center border-0 cursor-pointer"
                onClick={() => handleOpen(index)}
              >
                <p className="text-black font-medium text-base lg:text-xl md:text-lg !leading-[130%] text-start font-inter max-w-[712px]">
                  <span> Q.{index + 1}</span> {faq.question}
                </p>
                <span
                  className={`transition-all duration-300 ms-2 ${
                    open === index ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <Icons icon="accordionArrow" />
                </span>
              </AccordionHeader>
              <AccordionBody className="pt-3 text-black-700 md:text-base text-sm font-inter font-normal leading-[130%] max-w-[712px]">
                {faq.answer}
              </AccordionBody>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faqs;
