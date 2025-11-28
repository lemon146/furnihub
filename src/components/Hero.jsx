import banner from "../assets/images/home-banner.png";
const Hero = () => {
  return (
    <section className="hero relative w-full h-auto">
      <img src={banner} alt="banner" className="w-full h-screen object-cover" />

      <div
        className="
      absolute 
      bottom-4 left-1/2 -translate-x-1/2 
      w-[90%] 
      bg-2 
      lg:bottom-8 lg:right-10 lg:left-auto lg:translate-x-0 
      lg:w-1/3
    "
      >
        <div className="p-6 md:p-10 flex items-start justify-center flex-col">
          <p className="font-semibold text-grey-1 text-sm md:text-base">
            New Arrival
          </p>

          <h2 className="text-2xl md:text-4xl font-extrabold text-primary">
            Discover Our <br className="hidden md:block" /> New Collection
          </h2>

          <p className="text-xs md:text-sm font-semibold text-grey-2 mt-2 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </p>

          <button className="btn btn-primary">BUY NOW</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
