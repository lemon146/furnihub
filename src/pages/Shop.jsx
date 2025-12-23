import { BadgeCheck, Headset, Trophy, TruckElectric } from "lucide-react";
import banner from "../assets/images/shop-banner.png";
import Footers from "../components/Footers";
import Nav from "../components/Nav";
import Products from "../components/Products";
const Shop = () => {
  return (
    <>
      <Nav />
      <div className="relative w-full h-[280px] md:h-[380px] overflow-hidden">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
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

        {/* Background Image */}
        <img
          src={banner}
          alt="Shop Banner"
          className="w-full h-full object-cover"
        />
      </div>
      <Products />
      <div className="mt-10 bg-1 w-full px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Item */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left">
            <Trophy size={36} strokeWidth={0.5} />
            <div>
              <h6 className="font-semibold">High Quality</h6>
              <p className="text-sm font-medium text-gray-700">
                Crafted from top materials
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left">
            <BadgeCheck size={36} strokeWidth={0.5} />
            <div>
              <h6 className="font-semibold">Warranty Protection</h6>
              <p className="text-sm font-medium text-gray-700">
                Crafted from top materials
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left">
            <TruckElectric size={36} strokeWidth={0.5} />
            <div>
              <h6 className="font-semibold">Free Shipping</h6>
              <p className="text-sm font-medium text-gray-700">
                Crafted from top materials
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left">
            <Headset size={36} strokeWidth={0.5} />
            <div>
              <h6 className="font-semibold">24 / 7 Support</h6>
              <p className="text-sm font-medium text-gray-700">
                Crafted from top materials
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footers />

      {/* <PaginationDemo /> */}
    </>
  );
};

export default Shop;
