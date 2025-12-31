"use client";

import { gsap } from "gsap";
import { DecimalsArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { All_Products } from "../../utils/products_data";
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
    startIndex + ITEMS_PER_PAGE
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
      }
    );
  }, [displayedProducts]);

  return (
    <section className="max-w-[1236px] w-full mx-auto mt-14 px-4">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {displayedProducts.length > 0 ? (
          displayedProducts.map((item, index) => (
            <div
              ref={addToRefs}
              key={index}
              className="relative flex flex-col items-start bg-card rounded-lg overflow-hidden group"
            >
              <img
                src={item.image}
                alt={item.description}
                className="h-[301px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Hover Actions */}
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col justify-center items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="btn-primary px-4 py-2 font-semibold rounded cursor-pointer">
                  Add to Cart
                </button>

                <div className="flex justify-between items-center gap-3 text-white">
                  <button className="flex items-center gap-1 hover-text-neutral">
                    <IoShareSocialOutline /> Share
                  </button>

                  <button
                    onClick={() => navigate(`/product/${item.id}`)}
                    className="flex items-center gap-2 text-white px-4 py-2 rounded font-semibold hover-text-neutral"
                  >
                    <DecimalsArrowRight />
                    Details
                  </button>

                  <button className="flex items-center gap-1 hover-text-neutral">
                    <FaHeart /> Like
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h2 className="font-semibold text-lg">{item.title}</h2>
                <p className="text-sm opacity-75">{item.shortDesc}</p>

                <div className="flex gap-2 mt-2 text-sm">
                  <span className="font-semibold">{item.price}$</span>
                  <span className="line-through opacity-60">
                    {item.originalPrice}$
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-4">No products found.</p>
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
