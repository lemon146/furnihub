import { FaHeart } from "react-icons/fa";
import { IoIosGitCompare } from "react-icons/io";
import { IoShareSocialOutline } from "react-icons/io5";
import { productImages } from "../utils/images";

const Products = () => {
  return (
    <section className="max-w-[1236px] w-full mx-auto mt-14 px-4">
      <h2 className="text-heading">Our Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {productImages.map((item, index) => (
          <div
            key={index}
            className="relative flex flex-col items-start bg-card rounded-lg overflow-hidden group"
          >
            {/* Product Image */}
            <img
              src={item.img}
              alt={item.title}
              className="h-[301px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Overlay (covers whole card on hover) */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col justify-center items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="flex items-center gap-2 btn-primary px-4 py-2 rounded font-semibold hover:bg-grey-200 cursor-pointer">
                Add to Cart
              </button>

              <div className="flex justify-between items-center ">
                <button className="flex items-center gap-2  text-white px-4 py-2 rounded font-semibold hover-text-neutral">
                  <IoShareSocialOutline /> Share
                </button>
                <button className="flex items-center gap-2  text-white px-4 py-2 rounded font-semibold hover-text-neutral">
                  <IoIosGitCompare /> Compare
                </button>
                <button className="flex items-center gap-2  text-white px-4 py-2 rounded font-semibold hover-text-neutral cursor-pointer">
                  <FaHeart /> like
                </button>
              </div>
            </div>

            {/* Product Info */}

            <div className="p-3 sm:p-4 md:p-5 z-10">
              <h2 className="text-grey-1 font-semibold text-[14px] sm:text-[16px] md:text-[20px] lg:text-[24px]">
                {item.title}
              </h2>
              <p className="text-grey-2 font-medium text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] mt-1">
                {item.desc}
              </p>

              <div className="flex items-center gap-2 sm:gap-3 mt-2">
                <p className="text-grey-1 font-semibold text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px]">
                  {item.discount_price}
                </p>
                <p className="text-grey-2 line-through text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px]">
                  {item.original_price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center w-full mt-5 p-4">
        <button
          class="border border-[#B88E2F] 
         text-[#B88E2F] 
         cursor-pointer 
         transition-all
         px-6 py-2 
         sm:px-8 sm:py-3 
         md:px-10 md:py-3.5
         hover:bg-[#B88E2F] hover:text-white"
        >
          See More
        </button>
      </div>
    </section>
  );
};

export default Products;
