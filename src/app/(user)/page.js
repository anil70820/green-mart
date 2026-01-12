"use client";

import Preloader from "@/components/common/Preloader";
import AboutUs from "@/components/user/AboutUs";
import AppStore from "@/components/user/AppStore";
import Cards from "@/components/user/Cards";
import Deals from "@/components/user/Deals";
import Faqs from "@/components/user/Faqs";
import FeaturedProducts from "@/components/user/FeaturedProducts";
import Footer from "@/components/user/Footer";
import GoogleReview from "@/components/user/GoogleReview";
import Hero from "@/components/user/Hero";
import OurCategories from "@/components/user/OurCategories";
import WhyUs from "@/components/user/WhyUs";
import { useEffect, useState } from "react";
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="overflow-x-clip max-w-480 mx-auto">
      {/* <Preloader isLoading={isLoading} /> */}

      <Hero />
      <Cards />
      <WhyUs />
      <OurCategories />
      <FeaturedProducts />
      <AboutUs />
      <Deals />
      <GoogleReview />
      <Faqs />
      <AppStore />
      <Footer />
    </div>
  );
}
