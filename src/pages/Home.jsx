import Browser from "../components/Browser";
import Footers from "../components/Footers";
import FuniroFurnitureCarousel from "../components/FuniroFurniture";
import Hero from "../components/Hero";
import Inspirations from "../components/Inspirations";
import Nav from "../components/Nav";
import Products from "../components/Products";

const Home = () => {
  return (
    <>
      <Nav />
      <Hero />
      <Browser />
      <Products />
      <Inspirations />
      <FuniroFurnitureCarousel />
      <Footers />
    </>
  );
};

export default Home;
