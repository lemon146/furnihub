import { useCartContext } from "@/context/CartContext";
import { useWishListContext } from "@/context/WishlistContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DecimalsArrowRight, HeartOff, ShoppingCart } from "lucide-react";
import { useEffect, useRef } from "react";
import { FaHeart } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { All_Products } from "../../utils/products_data";
import AddToCartBtn from "../ui/AddToCartBtn";
import WishListBtn from "../ui/WishListBtn";
import ProductNotFound from "./ProductNotFound";
gsap.registerPlugin(ScrollTrigger);

const Product_details = () => {
  const { toggleFavorite, savedProducts } = useWishListContext();
  const { addToCart, cartItems } = useCartContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const proRef = useRef(null);
  // is product exist on cart
  const isProductInCart = cartItems.some((item) => item.id === Number(id));
  // is product exist on Wishlist
  const isProductInWishList = savedProducts.some(
    (item) => item.id === Number(id),
  );

  // Find product
  const product = All_Products.find((p) => p.id === Number(id));

  // Handle invalid product
  if (!product) return <ProductNotFound />;

  // Related products
  const relatedProducts = All_Products.filter(
    (p) => p.category === product.category && p.id !== product.id,
  ).slice(0, 4);

  // GSAP animation
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".card", {
        scrollTrigger: {
          trigger: proRef.current,
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
    <>
      <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
              <img
                className="w-full "
                src={product.image}
                alt={product.title}
              />
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                {product.title}
              </h1>
              <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                  ${product.price}
                </p>

                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i <
                          Math.round(
                            (product?.reviews?.length ?? 0) > 0
                              ? (product?.reviews ?? []).reduce(
                                  (acc, r) => acc + r.rating,
                                  0,
                                ) / (product?.reviews?.length ?? 0)
                              : 0,
                          )
                            ? "text-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                    {(product?.reviews ?? []).length > 0
                      ? (
                          product!.reviews!.reduce(
                            (acc, r) => acc + r.rating,
                            0,
                          ) / product!.reviews!.length
                        ).toFixed(1)
                      : "No rating"}
                  </p>

                  <a
                    href="#"
                    className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                  >
                    {product?.reviews?.length || 0} Review
                    {(product?.reviews?.length ?? 0 > 1) ? "s" : ""}
                  </a>
                </div>
              </div>

              <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                <button
                  type="button"
                  onClick={() => toggleFavorite(product.id)}
                  className={`
    flex items-center gap-2 py-2.5 px-5 text-sm font-medium
    rounded-lg border transition-all duration-300
    focus:outline-none focus:ring-4
    ${
      isProductInWishList
        ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100 focus:ring-red-100"
        : "bg-white text-gray-500 border-gray-200 hover:bg-gray-100 focus:ring-gray-100"
    }
    dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300
  `}
                >
                  {isProductInWishList ? (
                    <HeartOff strokeWidth={1.25} />
                  ) : (
                    <FaHeart className="text-red-500" />
                  )}

                  {isProductInWishList
                    ? "Remove from favorites"
                    : "Add to favorites"}
                </button>

                <button
                  type="button"
                  onClick={() => addToCart(product.id)}
                  disabled={isProductInCart}
                  className={`
    mt-4 sm:mt-0 flex items-center gap-2 justify-center
    rounded-lg px-5 py-2.5 text-sm font-medium transition-all
    focus:outline-none focus:ring-4
    ${
      isProductInCart
        ? "bg-green-600 text-white cursor-not-allowed opacity-70"
        : "bg-primary text-white hover:bg-primary-800 focus:ring-primary-300"
    }
  `}
                >
                  <ShoppingCart strokeWidth={0.75} />
                  {isProductInCart ? "Item added" : "Add to cart"}
                </button>
              </div>

              <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

              <p className="mb-6 text-gray-500 dark:text-gray-400">
                {product.description}.
              </p>
              <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

              <ul className="text-gray-500 dark:text-gray-400 space-y-2">
                <li>
                  <strong>Material:</strong> {product.additionalInfo?.material}
                </li>
                <li>
                  <strong>Color:</strong> {product.additionalInfo?.color}
                </li>
                <li>
                  <strong>Weight:</strong> {product.additionalInfo?.weight}
                </li>
                <li>
                  <strong>Dimensions:</strong>{" "}
                  {product.additionalInfo?.dimensions}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Customer Reviews ({product?.reviews?.length || 0})
          </h2>

          {(product?.reviews?.length ?? 0) > 0 ? (
            <div
              className={`space-y-6 ${
                (product?.reviews?.length ?? 0) > 2
                  ? "max-h-[220px] overflow-y-auto pr-2"
                  : ""
              }`}
            >
              {product?.reviews?.map((review, index) => (
                <div
                  key={index}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {review.user}
                    </h3>
                    <span className="text-yellow-400 text-sm">
                      {"⭐".repeat(review.rating)}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No reviews yet. Be the first to review this product!
            </p>
          )}
        </div>
      </section>

      <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

      <section
        className="max-w-[1236px] w-full mx-auto mt-14 px-4"
        ref={proRef}
      >
        <h2 className="text-heading">Related Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {relatedProducts.map((item, index) => (
            <div
              key={index}
              className="relative flex flex-col items-start bg-card rounded-lg overflow-hidden group card "
            >
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.description}
                className="h-[301px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Overlay (covers whole card on hover) */}
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col justify-center items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <AddToCartBtn productId={item.id} />

                <div className="flex justify-between items-center ">
                  <button className="flex items-center gap-2  text-white px-4 py-2 rounded font-semibold hover-text-neutral">
                    <IoShareSocialOutline />
                    Share
                  </button>
                  <button
                    onClick={() => navigate(`/product/${item.id}`)}
                    className="flex items-center gap-2 text-white px-4 py-2 rounded font-semibold hover-text-neutral"
                  >
                    <DecimalsArrowRight />
                    Details
                  </button>

                  <WishListBtn productId={item.id} />
                </div>
              </div>

              {/* Product Info */}

              <div className="p-3 sm:p-4 md:p-5 z-10">
                <h2 className="text-grey-1 font-semibold text-[14px] sm:text-[16px] md:text-[20px] lg:text-[24px]">
                  {item.title}
                </h2>
                <p className="text-grey-2 font-medium text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] mt-1">
                  {item.shortDesc}
                </p>

                <div className="flex items-center gap-2 sm:gap-3 mt-2">
                  <p className="text-grey-1 font-semibold text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px]">
                    {item.price}$
                  </p>
                  <p className="text-grey-2 line-through text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px]">
                    {item.originalPrice}$
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center w-full mt-5 p-4">
          <button
            onClick={() => navigate("/shop")}
            className="border border-[#B88E2F] 
               text-[#B88E2F] 
               cursor-pointer 
               transition-all
               px-6 py-2 
               sm:px-8 sm:py-3 
               md:px-10 md:py-3.5
               hover:bg-[#B88E2F] hover:text-white"
          >
            See More
          </button>
        </div>
      </section>
    </>
  );
};

export default Product_details;
