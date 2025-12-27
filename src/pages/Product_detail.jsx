import { useEffect } from "react";
import Footers from "../components/Footers";
import Nav from "../components/Nav";
import Product_details from "../components/Product_details";
const Product_detail = () => {
  useEffect(() => {}, []);

  return (
    <>
      <Nav />
      <Product_details />

      <Footers />
    </>
  );
};

export default Product_detail;
