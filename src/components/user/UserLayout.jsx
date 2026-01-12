"use client"
import { usePathname } from "next/navigation";
import React from "react";
import TitleBar from "./TitleBar";
import Header from "./Header";

const UserLayout = ({children}) => {
  const path = usePathname();
  const pathname = ["/auth"];
  return (
    <>
      {!pathname.includes(path) && <TitleBar />}
      {!pathname.includes(path) && <Header />}
      {children}
    </>
  );
};

export default UserLayout;
