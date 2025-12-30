"use client";

import MainLayout from "@/components/layout/MainLayout";
import ProductsSection from "@/components/section/Product_section";
import ServiceFeature from "@/components/section/ServiceFeature";
import banner from "../assets/images/shop-banner.png";

const Shop = () => {
  return (
    <>
      <MainLayout>
        <div className="relative w-full h-[280px] md:h-[380px] overflow-hidden">
          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-2">Shop</h2>
            <div className="flex items-center gap-2 text-sm md:text-base text-gray-200">
              <span>Home</span>
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m9 5 7 7-7 7"
                />
              </svg>
              <span className="text-white font-medium">Shop</span>
            </div>
          </div>

          <img
            src={banner}
            alt="Shop Banner"
            className="w-full h-full object-cover"
          />
        </div>

        <ProductsSection />

        <ServiceFeature />
      </MainLayout>
    </>
  );
};

export default Shop;
