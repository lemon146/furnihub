"use client";

import { gsap } from "gsap";
import { DecimalsArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { IoShareSocialOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { All_Products } from "../../utils/products_data";
import AddToCartBtn from "../ui/AddToCartBtn";
import WishListBtn from "../ui/WishListBtn";
import PaginationDemo from "./Pagination";

const ITEMS_PER_PAGE = 8;

export default function ProductsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Filter by Category
  const filteredProducts =
    selectedCategory === "All"
      ? All_Products
      : All_Products.filter((item) => item.category === selectedCategory);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const categories = ["All", "chairs", "tables", "sofas", "beds"];

  // GSAP ref
  const productsRef = useRef<HTMLElement[]>([]);

  // Clear ref on each render
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
        stagger: 0.1,
        ease: "power3.out",
      },
    );
  }, [displayedProducts]);

  return (
    <section className="max-w-309 w-full mx-auto mt-14 px-4">
      <h2 className="text-heading font-semibold">Our Products</h2>

      {/* Category Buttons */}
      <div className="flex gap-4 mt-4 justify-center flex-wrap" ref={addToRefs}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded border ${
              selectedCategory === cat
                ? "bg-[#B88E2F] text-white"
                : "text-[#B88E2F] border-[#B88E2F]"
            } transition-all`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-6">
        {displayedProducts.length > 0 ? (
          displayedProducts.map((item, index) => (
            <div
              ref={addToRefs}
              key={index}
              className="relative flex flex-col bg-card rounded-lg overflow-hidden group border border-gray-100 shadow-sm"
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.description}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Desktop Hover Actions (Hidden on Mobile) */}
                <div className="hidden md:flex absolute inset-0 bg-black/50 backdrop-blur-sm flex-col justify-center items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <AddToCartBtn productId={item.id} />
                  <div className="flex justify-between items-center gap-3 text-white">
                    <button className="flex items-center gap-1 hover:text-neutral-300">
                      <IoShareSocialOutline /> Share
                    </button>
                    <button
                      onClick={() => navigate(`/product/${item.id}`)}
                      className="flex items-center gap-2 text-white px-4 py-2 rounded font-semibold hover:text-neutral-300"
                    >
                      <DecimalsArrowRight /> Details
                    </button>
                    <WishListBtn productId={item.id} />
                  </div>
                </div>
              </div>

              {/* Product Info */}
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

                {/* Mobile actions (Visible only on mobile/tablet) */}
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
          ))
        ) : (
          <p className="text-center col-span-full py-10">No products found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center flex-wrap mt-6">
        <PaginationDemo
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </section>
  );
}
