"use client";

import { useShopFilter } from "@/context/ShopFilterContext";
import {
  allColors,
  CATEGORY_FILTER,
  MATERIAL_FILTER,
} from "@/utils/products_data";
import { gsap } from "gsap";
import { ChevronDown, DecimalsArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { IoShareSocialOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import AddToCartBtn from "../ui/AddToCartBtn";
import WishListBtn from "../ui/WishListBtn";
import PaginationDemo from "./Pagination";

export default function ProductsSection() {
  const navigate = useNavigate();
  const {
    categoryToggle,
    filterProduct,
    colorToggle,
    activeFilter,
    setActiveFilter,
    materialToggle,
    priceToggle,
    isPending,
    isError,
    error,
  } = useShopFilter();
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
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" },
    );
  }, [filterProduct]);

  return (
    <section className="max-w-309 w-full mx-auto mt-14 px-4">
      <h2 className="text-heading font-semibold">Our Products</h2>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <details className="relative group">
          <summary className="filter-btn">
            Category
            <ChevronDown className="ml-auto h-4 w-4 transition group-open:rotate-180" />
          </summary>
          <div className="filter-panel w-52">
            {CATEGORY_FILTER.items.map((item) => (
              <label key={item} className="filter-item">
                <input
                  type="checkbox"
                  className="accent-[#B88E2F]"
                  onChange={(e) => categoryToggle(item, e.target.checked)}
                />
                {item}
              </label>
            ))}
          </div>
        </details>

        <details className="relative group">
          <summary className="filter-btn">
            Material
            <ChevronDown className="ml-auto h-4 w-4 transition group-open:rotate-180" />
          </summary>
          <div className="filter-panel w-60">
            {MATERIAL_FILTER.items.map((item) => (
              <label key={item} className="filter-item">
                <input
                  type="checkbox"
                  className="accent-[#B88E2F]"
                  onChange={(e) => materialToggle(item, e.target.checked)}
                />
                {item}
              </label>
            ))}
          </div>
        </details>

        <details className="relative group">
          <summary className="list-none cursor-pointer px-4 py-2 border rounded-lg text-sm font-medium text-[#B88E2F] border-[#B88E2F] flex items-center gap-2 bg-white/80 backdrop-blur hover:bg-[#B88E2F]/10 transition-all duration-300">
            Price
            <svg
              className="ml-auto h-4 w-4 transition-transform duration-300 group-open:rotate-180"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                clipRule="evenodd"
              />
            </svg>
          </summary>
          <div className="absolute z-30 mt-3 w-64 rounded-xl border bg-white/95 backdrop-blur shadow-2xl p-4 space-y-4 opacity-0 scale-95 translate-y-2 pointer-events-none group-open:opacity-100 group-open:scale-100 group-open:translate-y-0 group-open:pointer-events-auto transition-all duration-300 ease-out">
            <input
              type="range"
              min="0"
              max="2000"
              className="w-full accent-[#B88E2F]"
              onChange={(e) => priceToggle(e.target.value)}
              value={activeFilter.price}
            />
            <div className="flex justify-between text-xs opacity-70">
              <span>${activeFilter.price}</span>
              <span>$2000</span>
            </div>
          </div>
        </details>

        <details className="relative group">
          <summary className="list-none cursor-pointer px-4 py-2 border rounded-lg text-sm font-medium text-[#B88E2F] border-[#B88E2F] flex items-center gap-2 bg-white/80 backdrop-blur hover:bg-[#B88E2F]/10 transition-all duration-300">
            Color
            <svg
              className="ml-auto h-4 w-4 transition-transform duration-300 group-open:rotate-180"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                clipRule="evenodd"
              />
            </svg>
          </summary>
          <div className="absolute z-30 mt-3 w-48 rounded-xl border bg-white/95 backdrop-blur shadow-2xl p-4 flex gap-3 flex-wrap opacity-0 scale-95 translate-y-2 pointer-events-none group-open:opacity-100 group-open:scale-100 group-open:translate-y-0 group-open:pointer-events-auto transition-all duration-300 ease-out">
            {allColors.map(({ name, hex }) => {
              const isActive = activeFilter.color.includes(name);
              return (
                <button
                  key={name}
                  onClick={() => colorToggle(name)}
                  className={`w-8 h-8 rounded-full border transition ${
                    isActive
                      ? "ring-2 ring-[#B88E2F] scale-110"
                      : "hover:scale-110 hover:ring-2 hover:ring-[#B88E2F]/50"
                  }`}
                  style={{ backgroundColor: hex }}
                  aria-pressed={isActive}
                />
              );
            })}
          </div>
        </details>

        <button className="ml-auto px-6 py-2 bg-[#B88E2F] text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:opacity-90 transition">
          Apply
        </button>
      </div>

      <div className="mt-6">
        {isPending ? (
          <div className="flex justify-center items-center py-20 text-gray-500">
            Loading products...
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-2">
            <p className="text-red-600 font-medium">Failed to load products</p>
            <p className="text-sm text-gray-500">
              {error instanceof Error ? error.message : "Something went wrong"}
            </p>
          </div>
        ) : filterProduct.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filterProduct.map((item) => (
              <div
                ref={addToRefs}
                key={item.id}
                className="relative flex flex-col bg-card rounded-lg overflow-hidden group border border-gray-100 shadow-sm"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
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
        ) : (
          <div className="flex flex-col items-center justify-center mt-16 text-center space-y-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
              alt="No products found"
              className="w-32 h-32 opacity-40"
            />
            <h2 className="text-xl md:text-2xl font-bold text-gray-700">
              No products match your filters
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
              Try changing your category or color selection.
            </p>
            <button
              onClick={() =>
                setActiveFilter({
                  category: [],
                  color: [],
                  material: [],
                  price: 0,
                })
              }
              className="mt-2 px-6 py-2 bg-[#B88E2F] text-white rounded-lg hover:opacity-90 transition"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-center flex-wrap mt-6">
        <PaginationDemo totalPages={3} currentPage={2} />
      </div>
    </section>
  );
}
