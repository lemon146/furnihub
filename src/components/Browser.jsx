import { Link } from "react-router-dom";
import { categories } from "../utils/products_data";
const Browser = () => {
  return (
    <section className="p-10 relative">
      <h2 className="text-heading">Browse The Range</h2>

      <p
        className="font-poppins font-normal
    text-[16px] sm:text-[18px] md:text-[20px]
    text-center mt-2 mb-6 text-grey-1"
      >
        Explore our wide range of modern furniture collections.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center mt-8">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={cat.path}
            className="flex flex-col items-center group cursor-pointer"
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
