import img1 from "../../assets/images/products/img1.png";
import img2 from "../../assets/images/products/img2.png";
import img3 from "../../assets/images/products/img3.png";
import img4 from "../../assets/images/products/img4.png";
import img5 from "../../assets/images/products/img5.png";
import img6 from "../../assets/images/products/img6.png";
import img7 from "../../assets/images/products/img7.png";
import img8 from "../../assets/images/products/img8.png";
const FuniroFurnitureCarousel = () => {
  return (
    <div className=" bg-gray-50 mt-6">
      <h1 className="text-heading mb-8">
        Share your setup with{" "}
        <span className="text-yellow-600">#FuniroFurniture</span>
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:max-w-6xl mx-auto">
        {[
          [img1, img2, img3, img2],
          [img4, img5, img6, img3],
          [img7, img8, img2, img1],
          [img3, img6, img5, img4], // optional 4th column if needed
        ].map((column, colIndex) => (
          <div className="grid gap-4" key={colIndex}>
            {column.map((src, index) => {
              const randomHeight = Math.floor(
                Math.random() * (220 - 120) + 120
              ); // random 120–220px

              return (
                <img
                  key={index}
                  src={src}
                  alt=""
                  style={{ height: randomHeight }}
                  className="w-full object-cover rounded-base"
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FuniroFurnitureCarousel;
