"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { PRELOADER_IMAGES_LIST } from "@/utils/helper";

const Preloader = ({ isLoading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hide, setHide] = useState(false);

  // Image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PRELOADER_IMAGES_LIST.length);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Trigger fade-out animation when loading is done
  useEffect(() => {
    if (!isLoading) {
      const timeout = setTimeout(() => setHide(true), 500); // after fade animation
      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  if (hide) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col justify-center items-center bg-white transition-opacity duration-500 ${
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="lg:w-[300px] lg:h-[300px] md:w-[250px] md:h-[250px] sm:w-[200px] sm:h-[200px] w-[120px] h-[120px] relative mb-6">
        <Image
          src={PRELOADER_IMAGES_LIST[currentIndex]}
          alt="Loading fruit"
          fill
          className="object-contain"
        />
      </div>

      <div className="text-xl font-semibold text-green-700 flex gap-1 items-end font-inter">
        <span>Loading your Green Mart</span>
        <span className="flex gap-1">
          <span className="animate-bounce [animation-delay:0ms]">.</span>
          <span className="animate-bounce [animation-delay:200ms]">.</span>
          <span className="animate-bounce [animation-delay:400ms]">.</span>
        </span>
      </div>
    </div>
  );
};

export default Preloader;
