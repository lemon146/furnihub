"use client";

import { gsap } from "gsap";
import { DecimalsArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { IoShareSocialOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { All_Products } from "../../utils/products_data";
import AddToCartBtn from "../ui/AddToCartBtn";
import WishListBtn from "../ui/WishListBtn";
import PaginationDemo from "./Pagination";

export default function ProductsSection() {
  const navigate = useNavigate();
  const productsRef = useRef<HTMLElement[]>([]);
  productsRef.current = [];

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !productsRef.current.includes(el)) {
      productsRef.current.push(el);
    }
  };

  useEffect(() => {
    gsap.fromTo(
      productsRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
      },
    );
  }, []);

  return (
    <section className="max-w-309 w-full mx-auto mt-14 px-4">
      <h2 className="text-heading font-semibold">Our Products</h2>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <details className="relative">
          <summary className="list-none cursor-pointer px-4 py-2 border rounded text-sm font-medium text-[#B88E2F] border-[#B88E2F] flex items-center gap-2">
            Category
          </summary>
          <div className="absolute z-20 mt-2 w-48 rounded-lg border bg-white shadow-lg p-3 space-y-2">
            {["Chairs", "Tables", "Sofas", "Beds"].map((item) => (
              <label key={item} className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-[#B88E2F]" />
                {item}
              </label>
            ))}
          </div>
        </details>

        <details className="relative">
          <summary className="list-none cursor-pointer px-4 py-2 border rounded text-sm font-medium text-[#B88E2F] border-[#B88E2F] flex items-center gap-2">
            Price
          </summary>
          <div className="absolute z-20 mt-2 w-56 rounded-lg border bg-white shadow-lg p-4 space-y-3">
            <input
              type="range"
              min="0"
              max="2000"
              className="w-full accent-[#B88E2F]"
            />
            <div className="flex justify-between text-xs opacity-70">
              <span>$0</span>
              <span>$2000</span>
            </div>
          </div>
        </details>

        <details className="relative">
          <summary className="list-none cursor-pointer px-4 py-2 border rounded text-sm font-medium text-[#B88E2F] border-[#B88E2F] flex items-center gap-2">
            Material
          </summary>
          <div className="absolute z-20 mt-2 w-48 rounded-lg border bg-white shadow-lg p-3 space-y-2">
            {["Wood", "Metal", "Fabric", "Leather"].map((item) => (
              <label key={item} className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-[#B88E2F]" />
                {item}
              </label>
            ))}
          </div>
        </details>

        <details className="relative">
          <summary className="list-none cursor-pointer px-4 py-2 border rounded text-sm font-medium text-[#B88E2F] border-[#B88E2F] flex items-center gap-2">
            Color
          </summary>
          <div className="absolute z-20 mt-2 w-44 rounded-lg border bg-white shadow-lg p-3 flex gap-3 flex-wrap">
            {["#000000", "#8B4513", "#C2B280", "#FFFFFF"].map((color) => (
              <button
                key={color}
                className="w-7 h-7 rounded-full border"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </details>

        <button className="ml-auto px-4 py-2 bg-[#B88E2F] text-white rounded text-sm font-medium hover:opacity-90 transition">
          Apply
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-6">
        {All_Products.map((item, index) => (
          <div
            ref={addToRefs}
            key={index}
            className="relative flex flex-col bg-card rounded-lg overflow-hidden group border border-gray-100 shadow-sm"
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={item.image}
                alt={item.description}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              <div className="hidden md:flex absolute inset-0 bg-black/50 backdrop-blur-sm flex-col justify-center items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <AddToCartBtn productId={item.id} />
                <div className="flex items-center gap-3 text-white">
                  <button className="flex items-center gap-1 hover:text-neutral-300">
                    <IoShareSocialOutline /> Share
                  </button>
                  <button
                    onClick={() => navigate(`/product/${item.id}`)}
                    className="flex items-center gap-2 px-4 py-2 rounded font-semibold hover:text-neutral-300"
                  >
                    <DecimalsArrowRight /> Details
                  </button>
                  <WishListBtn productId={item.id} />
                </div>
              </div>
            </div>

            <div className="p-3 md:p-4 flex flex-col grow">
              <h2 className="font-semibold text-sm md:text-lg truncate">
                {item.title}
              </h2>
              <p className="text-xs md:text-sm opacity-75 line-clamp-1">
                {item.shortDesc}
              </p>

              <div className="flex items-center gap-2 mt-2">
                <span className="font-bold text-sm md:text-base">
                  ${item.price}
                </span>
                {item.originalPrice && (
                  <span className="line-through opacity-50 text-xs">
                    ${item.originalPrice}
                  </span>
                )}
              </div>

              <div className="flex md:hidden flex-col gap-2 mt-3 pt-3 border-t">
                <AddToCartBtn productId={item.id} />
                <div className="flex justify-between">
                  <button
                    onClick={() => navigate(`/product/${item.id}`)}
                    className="text-[10px] uppercase tracking-wider font-bold flex items-center gap-1"
                  >
                    <DecimalsArrowRight size={12} /> Details
                  </button>
                  <WishListBtn productId={item.id} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center flex-wrap mt-6">
        {" "}
        <PaginationDemo
          totalPages={10}
          currentPage={2}
          // setCurrentPage={10}
        />
      </div>
    </section>
  );
}
