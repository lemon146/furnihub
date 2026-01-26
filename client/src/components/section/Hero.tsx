import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import banner from "../../assets/images/home-banner.png";
gsap.registerPlugin(ScrollTrigger);
const Hero = () => {
  const boxRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".item", {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero relative w-full h-[70vh] md:h-[812px] overflow-hidden">
      <img src={banner} alt="banner" className="w-full h-full object-cover" />

      <div
        className="
      absolute 
      bottom-4 left-1/2 -translate-x-1/2 
      w-[90%] max-w-[812px]
      bg-2 shadow-lg rounded-xl
      
      lg:bottom-10 lg:right-10 lg:left-auto lg:translate-x-0
      lg:w-[420px]
    "
      >
        <div
          className="p-6 md:p-10 flex flex-col justify-center items-start"
          ref={boxRef}
        >
          <p className="font-semibold text-grey-1 text-sm md:text-base item">
            New Arrival
          </p>

          <h2 className="text-2xl md:text-4xl font-extrabold text-primary leading-tight item">
            Discover Our <br className="hidden md:block item" /> New Collection
          </h2>

          <p className="text-xs md:text-sm font-semibold text-grey-2 mt-2 mb-4 leading-relaxed item">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </p>

          <button className="btn btn-primary ">BUY NOW</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
