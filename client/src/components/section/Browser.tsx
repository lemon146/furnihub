import { getCategory } from "@/api/category.api";
import { useGSAP } from "@gsap/react";
import { useQuery } from "@tanstack/react-query";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

interface Category {
  _id: string;
  title: string;
  image: { url: string; public_id: string };
}

const Browser = () => {
  const boxRef = useRef<HTMLDivElement>(null);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategory,
  });

  useGSAP(
    () => {
      if (!data?.categories?.length) return;

      gsap.from(".category-item", {
        scrollTrigger: {
          trigger: boxRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: boxRef, dependencies: [data] },
  );

  return (
    <section className="max-w-7xl mx-auto py-12 md:py-20 px-4">
      <div className="text-center mb-10 md:mb-16">
        <h2 className="text-2xl md:text-4xl lg:text-[40px] font-bold text-[#3A3A3A] tracking-tight">
          Browse The Range
        </h2>
        <p className="text-sm md:text-lg text-[#666666] mt-3 max-w-2xl mx-auto leading-relaxed">
          Explore our wide range of modern furniture collections, curated for
          your comfort.
        </p>
      </div>

      {isPending ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-full aspect-4/5 rounded-xl bg-gray-200 animate-pulse" />
              <div className="mt-4 h-5 w-24 rounded bg-gray-200 animate-pulse" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="text-center text-red-600 py-10">
          Error:{" "}
          {error instanceof Error ? error.message : "Something went wrong"}
        </div>
      ) : !data?.categories?.length ? (
        <div className="text-center text-gray-500 py-10">
          No categories found.
        </div>
      ) : (
        <div
          ref={boxRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8"
        >
          {data.categories.map((cat: Category) => (
            <Link
              key={cat._id}
              to={cat._id}
              className="category-item group flex flex-col items-center"
            >
              <div className="relative overflow-hidden rounded-xl aspect-4/5 w-full">
                <img
                  src={cat.image?.url || "/placeholder.png"}
                  alt={cat.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <p className="mt-4 md:mt-6 font-bold text-base md:text-xl text-[#3A3A3A] group-hover:text-[#B88E2F] transition-colors duration-300">
                {cat.title}
              </p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default Browser;
