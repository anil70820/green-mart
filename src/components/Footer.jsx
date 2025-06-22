"use client";

import { FOOTER_LINKS_LIST, SOCIAL_LINKS_LIST } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import Icons from "./common/Icons";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="lg:pt-16 md:pt-12 sm:pt-9 pt-6">
      <div className="container xl:max-w-[1140px] mx-auto px-5 xl:px-0">
        <div className="flex lg:flex-row flex-col md:gap-8 gap-6 justify-between lg:mb-12 md:mb-10 mb-8">
          <div className="lg:max-w-4/12 w-full max-w-[400px]">
           <Link href="/">
            <Image
              className="md:w-[274px] w-[200px] h-auto"
              src="/assets/images/svg/logo.svg"
              alt="GreenMart Logo"
              width={274}
              height={61}
            />
           </Link>
            <p className="font-inter font-normal lg:text-base text-sm leading-[150%] text-black/70 lg:max-w-[300px] mt-4 lg:mb-8 md:mb-6 mb-4">
              GreenMart is your trusted online grocery store, offering fresh and
              high-quality products at the best prices.
            </p>
            <div className="flex gap-4 mt-4 text-orange-600 text-lg">
              {SOCIAL_LINKS_LIST.map((link, index) => {
                return (
                  <Link
                    href={link.href}
                    key={index}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.icon}
                    className="group w-8 h-8 rounded-full flex items-center justify-center border border-orange hover:border-green duration-300 transition-all"
                  >
                    {
                      <Icons
                        icon={link.icon}
                        className="group-hover:fill-green transition-all duration-300"
                      />
                    }
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="lg:max-w-8/12 flex justify-between gap-6 w-full md:flex-nowrap flex-wrap">
            {FOOTER_LINKS_LIST.map((section) => (
              <div key={section.section}>
                <h3 className="font-inter font-semibold md:text-xl text-lg leading-[140%] text-black md:mb-6 mb-4">
                  {section.section}
                </h3>
                <ul className="lg:gap-6 md:gap-4 gap-3 font-inter font-medium lg:text-base text-sm leading-[150%] text-black/70 flex flex-col">
                  {section.links.map((link, index) => (
                    <li
                      key={index}
                      className="flex items-start lg:gap-5 gap-3 mb-0"
                    >
                      {link.icon && (
                        <span className="-mt-1">
                          {<Icons icon={link.icon} />}
                        </span>
                      )}
                      <Link
                        href={link.href}
                        className="relative after:absolute after:w-full after:bg-green after:h-px after:scale-x-0 after:bottom-0 after:left-0 hover:after:scale-100 after:transition-all after:duration-300 hover:text-green duration-300 transition-all inline-block"
                        target={
                          link.href.startsWith("http") ? "_blank" : "_self"
                        }
                        rel="noopener noreferrer"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-[1440px] w-full h-px bg-[linear-gradient(90deg,_rgba(255,255,255,0)_3%,_#010101_56%,_rgba(255,255,255,0)_100%)] mx-auto"></div>
      <div className="font-inter font-normal md:text-base leading-[150%] text-center lg:my-5 my-3 text-sm text-black-600/70">
        © {year} GreenMart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
