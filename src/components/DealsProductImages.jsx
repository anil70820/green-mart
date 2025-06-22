"use client";
import { DEALS_PRODUCTS_IMAGES_LIST } from "@/utils/helper";
import Image from "next/image";
import { useState } from "react";

const DealsProductImages = ({productImages}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col items-center gap-3.5">
      {/* Main Image */}
      <div className="lg:w-[363px] lg:h-[293px] md:w-[280px] md:h-[280px] w-full bg-green-100 rounded-xl flex items-center justify-center p-3">
        <Image
          src={productImages[activeIndex]}
          alt="Broccoli"
          width={309}
          height={185}
           sizes="100vw"
          className="object-contain lg:w-[309px] lg:h-[185px] md:w-[200px] md:h-[200px] w-full h-[200px]"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex lg:gap-4 gap-2 justify-between w-full">
        {productImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`lg:w-[110px] sm:h-20 md:w-[88px] h-16 w-full rounded-lg border p-1 flex justify-center items-center duration-300 transition-all ${
              activeIndex === idx
                ? "border-green bg-white"
                : "border-transparent hover:bg-white hover:border-green/50 bg-green-100"
            }`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              width={78}
              height={46}
              sizes="100vw"
              className="object-contain w-full h-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default DealsProductImages;
