import axios from "axios";
import { useEffect } from "react";
import Footers from "../components/Footers";
import Nav from "../components/Nav";
const Product_detail = () => {
  const api = "https://fakestoreapi.com/products";

  const getData = async () => {
    try {
      const res = await axios.get(api);
      console.log(res.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Nav />
      <div className="bg-2 px-4 py-4">
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm md:text-base text-gray-400 max-w-6xl mx-auto">
          <span className="hover:text-black cursor-pointer">Home</span>

          <svg
            className="w-3 h-3 sm:w-4 sm:h-4"
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

          <span className="hover:text-black cursor-pointer font-medium">
            Shop
          </span>

          <svg
            className="w-3 h-3 sm:w-4 sm:h-4"
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

          <span className="text-black font-semibold">Product Details</span>
        </div>
      </div>

      <Footers />
    </>
  );
};

export default Product_detail;
