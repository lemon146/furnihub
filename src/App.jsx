import Browser from "./components/Browser";
import FuniroFurniture from "./components/FuniroFurniture";
import Hero from "./components/Hero";
import Inspirations from "./components/Inspirations";
import Nav from "./components/Nav";
import Products from "./components/Products";

const App = () => {
  return (
    <>
      <Nav />
      <Hero />
      <Browser />
      <Products />
      <Inspirations />
      <FuniroFurniture />
    </>
  );
};

export default App;
