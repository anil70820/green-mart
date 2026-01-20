"use client";
import { NAV_LINKS_LIST } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Cta from "../common/Cta";
import { useSelector } from "react-redux";
import Profile from "./Profile";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, isAuth } = useSelector((state) => state.auth);
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
    <div className="py-4.5">
      <div className="container xl:max-w-285 mx-auto xl:px-0 px-5 w-full">
        <div className="flex items-center justify-between">
          <Link href="/" className="relative z-99">
            <Image
              src="/assets/images/svg/logo.svg"
              alt="Logo"
              width={246}
              height={55}
              className="lg:w-61.5 w-45 h-auto"
              sizes="100vw"
            />
          </Link>
          <div
            className={`flex items-center md:flex-row flex-col md:static fixed duration-300 md:h-auto  ${
              isOpen
                ? "right-0 top-0 w-screen h-screen justify-center bg-white z-50"
                : "-right-full top-0"
            }`}
          >
            <ul className="flex items-center lg:gap-6 md:gap-4 gap-6 md:flex-row flex-col">
              {NAV_LINKS_LIST.map((obj, index) => {
                return (
                  <li key={index}>
                    <Link
                      onClick={() => setIsOpen(false)}
                      href={obj.url}
                      className="text-off-black font-inter font-medium leading-100 capitalize text-base relative after:absolute after:w-full after:bg-green after:h-px after:scale-x-0 after:-bottom-1 after:left-0 hover:after:scale-100 active:after:scale-100 focus:after:scale-100 after:transition-all after:duration-300 hover:text-green active:text-green focus:text-green duration-300 transition-all inline-block"
                    >
                      {obj.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
            {!isAuth && (
              <Cta
                href="/auth"
                onClick={() => setIsOpen(false)}
                className="sm:hidden mt-6  max-w-45"
              >
                Login
              </Cta>
            )}
          </div>
          <div className="flex items-center gap-3">
            {isAuth ? (
              user?.role === "admin" ? (
                <Cta
                  href="/admin/dashboard"
                  className="sm:min-w-40"
                >
                  Dashboard
                </Cta>
              ) : (
                <div
                  onClick={() => setIsProfileOpen(true)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  {user?.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-50 text-green-700 border border-green-600 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[28px]">
                        person
                      </span>
                    </div>
                  )}
                </div>
              )
            ) : (
              <Cta
                href="/auth"
                onClick={() => setIsOpen(false)}
                className="max-sm:hidden max-w-35 min-w-30"
              >
                Login
              </Cta>
            )}

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
      <Profile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </div>
  );
};

export default Header;
