import AboutUs from "@/components/AboutUs";
import AppStore from "@/components/AppStore";
import Cards from "@/components/Cards";
import Deals from "@/components/Deals";
import Faqs from "@/components/Faqs";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import GoogleReview from "@/components/GoogleReview";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import OurCategories from "@/components/OurCategories";
import TitleBar from "@/components/TitleBar";
import WhyUs from "@/components/WhyUs";
export default function Home() {
  return (
    <div className="overflow-x-clip max-w-[1920px] mx-auto">
      <TitleBar />
      <Header />
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
