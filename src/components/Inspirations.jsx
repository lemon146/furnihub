import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import img1 from "../assets/images/inspirations/img1.png";
import { Products_demo } from "../utils/products_data";

export default function Inspirations() {
  const slides = ["/room2.jpg", "/room3.jpg", "/room4.jpg"];
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="w-full bg-[#FDF7EE] py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-center">
        {/* Left Section */}
        <div className="flex flex-col gap-4 lg:col-span-1">
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#3A3A3A] leading-tight">
            50+ Beautiful rooms inspiration
          </h2>
          <p className="text-[#616161] text-sm md:text-base max-w-sm">
            Our designer already made a lot of beautiful prototype of rooms that
            inspire you
          </p>
          <button className="bg-[#B88E2F] text-white px-6 py-3 w-fit hover:bg-[#9c7926] transition-all">
            Explore More
          </button>
        </div>

        {/* Middle Static Card */}
        <div className="overflow-hidden  shadow-md lg:col-span-1 relative">
          <img
            src={img1}
            alt="room inspiration"
            className="w-full h-[450px] object-cover"
          />
          <div className="absolute bottom-4 left-4 flex items-end ">
            {/* Text Box */}
            <div className="bg-white/30 backdrop-blur-sm p-4 md:p-7  shadow flex flex-col gap-1">
              <p className="text-xs md:text-sm text-gray-600">01 — Bed Room</p>
              <h3 className="text-base md:text-lg font-semibold text-gray-800">
                Inner Peace
              </h3>
            </div>

            {/* Arrow Button */}
            <button className="bg-[#B88E2F] backdrop-blur-sm hover:bg-[#9c7926] text-white p-3 md:p-4  transition-all  bg-opacity-90 cursor-pointer">
              ➜
            </button>
          </div>
        </div>

        {/* Carousel Card */}
        <div className="lg:col-span-1 w-full flex flex-col items-start gap-3 h-130">
          <div className="relative w-full overflow-hidden  shadow-md">
            <div
              className="whitespace-nowrap transition-all duration-500"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {Products_demo.map((items, i) => (
                <img
                  key={i}
                  src={items.img}
                  className="inline-block w-full h-[450px] object-cover"
                />
              ))}
            </div>

            {/* Arrow */}
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-white text-[#B88E2F] p-3 border border-[#B88E2F] rounded-full hover:bg-[#533f0f] transition-all"
            >
              <FaArrowRight size={15} />
            </button>
          </div>

          {/* Dots */}
          <div className="flex items-center gap-3 mt-2">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`flex items-center justify-center rounded-full
        ${
          i === index
            ? "w-4 h-4 border border-[#B88E2F]"
            : "w-2.5 h-2.5 bg-gray-300"
        }
      `}
              >
                {i === index && (
                  <div className="w-2 h-2 bg-[#B88E2F] rounded-full"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
