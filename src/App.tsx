import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Product_detail from "./pages/Product_detail";
import Shop from "./pages/Shop";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:id" element={<Product_detail />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
