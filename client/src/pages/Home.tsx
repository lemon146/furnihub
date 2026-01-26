import MainLayout from "@/components/layout/MainLayout";
import Browser from "@/components/section/Browser";
import FuniroFurnitureCarousel from "@/components/section/FuniroFurniture";
import Hero from "@/components/section/Hero";
import Inspirations from "@/components/section/Inspirations";
import Products from "@/components/section/Products";
import { FC } from "react";

const Home: FC = () => {
  return (
    <>
      <MainLayout>
        <Hero />
        <Browser />
        <Products />
        <Inspirations />
        <FuniroFurnitureCarousel />
      </MainLayout>
    </>
  );
};

export default Home;
