import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { categories } from "../utils/products_data";

gsap.registerPlugin(ScrollTrigger);
const Browser = () => {
  const boxRef = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".category-item", {
        scrollTrigger: {
          trigger: boxRef.current,
          start: "top 85%",
        },
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="p-10 relative">
      <h2 className="text-heading category-item">Browse The Range</h2>
      <p className="text-center mt-2 mb-6 text-grey-1 category-item">
        Explore our wide range of modern furniture collections.
      </p>

      <div
        ref={boxRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center mt-12"
      >
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={cat.path}
            className="flex flex-col items-center group cursor-pointer category-item"
          >
            <img
              src={cat.img}
              alt={cat.name}
              className="rounded-md group-hover:scale-105 transition duration-300"
            />
            <p className="mt-5 font-semibold text-[20px] text-grey-1">
              {cat.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Browser;
