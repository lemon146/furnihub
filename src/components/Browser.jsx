import img3 from "../assets/images/categories/img3.png";
import img2 from "../assets/images/categories/img4.png";
import img1 from "../assets/images/categories/img5.png";
const Browser = () => {
  return (
    <section className="p-10">
      <h2
        className="font-poppins font-bold 
             text-[24px] sm:text-[28px] md:text-[32px] 
             leading-[100%] tracking-[0px] text-center"
      >
        Browse The Range
      </h2>

      <p
        className="font-poppins font-normal 
             text-[16px] sm:text-[18px] md:text-[20px] 
             leading-[100%] tracking-[0px] text-center mt-2 mb-4 text-grey-1"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center mt-8">
        <div className="list flex items-center flex-col justify-center">
          <img src={img1} alt="img1.png" />
          <p className="text-center font-semibold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] leading-[100%] mt-5 text-grey-1">
            Dining
          </p>
        </div>
        <div className="list">
          <img src={img2} alt="img1.png" />
          <p className="text-center font-semibold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] leading-[100%] mt-5 text-grey-1">
            Bedroom
          </p>
        </div>
        <div className="list">
          <img src={img3} alt="img1.png" />
          <p className="text-center font-semibold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] leading-[100%] mt-5 text-grey-1">
            Living
          </p>
        </div>
      </div>
    </section>
  );
};

export default Browser;
