"use client"
import AboutUs from "@/components/AboutUs";
import AppStore from "@/components/AppStore";
import Cards from "@/components/Cards";
import Deals from "@/components/Deals";
import Faqs from "@/components/Faqs";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import GoogleReview from "@/components/GoogleReview";
import Hero from "@/components/Hero";
import OurCategories from "@/components/OurCategories";
import Preloader from "@/components/Preloader";
import WhyUs from "@/components/WhyUs";
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
        <Preloader isLoading={isLoading} />
    
      <Hero/>
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
