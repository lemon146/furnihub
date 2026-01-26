import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { categories } from "../../utils/products_data";

gsap.registerPlugin(ScrollTrigger);

const Browser = () => {
  const boxRef = useRef(null);

  useGSAP(
    () => {
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
    { scope: boxRef },
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

      <div
        ref={boxRef}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8"
      >
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={cat.path}
            className="category-item group flex flex-col items-center"
          >
            <div className="relative overflow-hidden rounded-xl aspect-[4/5] w-full">
              <img
                src={cat.img}
                alt={cat.name}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
            <p className="mt-4 md:mt-6 font-bold text-base md:text-xl text-[#3A3A3A] group-hover:text-[#B88E2F] transition-colors duration-300">
              {cat.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Browser;
