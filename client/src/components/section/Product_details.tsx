import { getOneProductById, getProduct } from "@/api/product";
import { getReviews } from "@/api/reviews";
import { useCartContext } from "@/context/CartContext";
import { useWishListContext } from "@/context/WishlistContext";
import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, HeartOff, ShoppingCart, Star } from "lucide-react";
import { useEffect, useRef } from "react";
import { FaHeart } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import AddToCartBtn from "../ui/AddToCartBtn";
import Loader from "../ui/Loader";
import WishListBtn from "../ui/WishListBtn";
import ProductNotFound from "./ProductNotFound";

gsap.registerPlugin(ScrollTrigger);

const Product_details = () => {
  const { toggleFavorite, savedProducts } = useWishListContext();
  const { addToCart, cartItems } = useCartContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const proRef = useRef(null);
  const container = useRef(null);

  const {
    data: productRes,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getOneProductById(id as string),
    enabled: !!id,
  });

  const { data: allProductsRes } = useQuery({
    queryKey: ["products"],
    queryFn: getProduct,
  });

  const { data: reviewsRes } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => getReviews(id as string),
    enabled: !!id,
  });

  const product: Product | undefined = productRes?.data?.product;
  const reviews = reviewsRes?.reviews ?? [];

  const isProductInCart = cartItems.some((item) => item.id === id);
  const isProductInWishList = savedProducts.some((item) => item.id === id);

  const relatedProducts: Product[] =
    allProductsRes?.products?.filter(
      (p: Product) =>
        p.category?._id === product?.category?._id && p._id !== product?._id,
    ) ?? [];
  useEffect(() => {
    if (!product) return;
    const ctx = gsap.context(() => {
      gsap.from(".anim-item", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.from(".card", {
        scrollTrigger: { trigger: proRef.current, start: "top 85%" },
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
      });
    }, container);
    return () => ctx.revert();
  }, [product]);

  if (isPending) return <Loader />;
  if (isError || !product) return <ProductNotFound />;

  return (
    <>
      <section
        ref={container}
        className="py-12 bg-white md:py-20 antialiased overflow-hidden"
      >
        <div className="max-w-7xl px-4 mx-auto">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-20">
            <div className="anim-item shrink-0 max-w-md lg:max-w-lg mx-auto bg-[#F9F1E7] rounded-2xl p-6 sm:p-10">
              <img
                className="w-full h-auto object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500"
                src={product.images?.[0]?.url}
                alt={product.title}
              />
            </div>

            <div className="mt-8 lg:mt-0 flex flex-col justify-center">
              <h1 className="anim-item text-3xl font-bold text-[#3A3A3A] sm:text-4xl lg:text-5xl">
                {product.title}
              </h1>

              <div className="anim-item mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
                <p className="text-3xl font-semibold text-[#B88E2F]">
                  ${product.price}
                </p>
                <div className="hidden sm:block h-6 w-[1px] bg-gray-300 mx-2" />
                <div className="flex items-center gap-3">
                  <div className="flex items-center text-yellow-400">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        size={18}
                        fill={
                          i < Math.round(product.averageRating)
                            ? "currentColor"
                            : "none"
                        }
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-[#9F9F9F]">
                    {product.numReviews} Customer Review
                    {product.numReviews !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              <div className="anim-item mt-10 flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => addToCart(product._id)}
                  disabled={isProductInCart}
                  className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-bold text-sm transition-all active:scale-95 border-2 ${
                    isProductInCart
                      ? "bg-green-600 border-green-600 text-white cursor-default"
                      : "bg-transparent border-[#B88E2F] text-[#B88E2F] hover:bg-[#B88E2F] hover:text-white"
                  }`}
                >
                  <ShoppingCart size={20} />
                  {isProductInCart ? "In Your Cart" : "Add To Cart"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    toggleFavorite({
                      id: product._id,
                      title: product.title,
                      image: product.images?.[0]?.url ?? "",
                      price: product.price,
                      originalPrice: product.originalPrice,
                    })
                  }
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-gray-300 hover:bg-red-50 transition-colors"
                >
                  {isProductInWishList ? (
                    <HeartOff size={20} className="text-red-500" />
                  ) : (
                    <FaHeart size={20} className="text-gray-400" />
                  )}
                  <span className="text-sm font-semibold">
                    {isProductInWishList ? "Unsave" : "Wishlist"}
                  </span>
                </button>
              </div>

              <hr className="anim-item my-10 border-gray-100" />

              <p className="anim-item text-[#9F9F9F] leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="anim-item space-y-4 pt-4 border-t border-gray-100">
                {[
                  {
                    label: "Material",
                    value: product.additionalInfo?.material,
                  },
                  { label: "Color", value: product.additionalInfo?.color },
                  { label: "Weight", value: product.additionalInfo?.weight },
                  {
                    label: "Dimensions",
                    value: product.additionalInfo?.dimension,
                  },
                ].map((info, idx) => (
                  <div key={idx} className="flex text-sm">
                    <span className="w-32 text-[#9F9F9F]">{info.label}</span>
                    <span className="text-[#3A3A3A]">
                      : {info.value || "N/A"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Customer Reviews ({product.numReviews ?? 0})
          </h2>

          {reviews.length > 0 ? (
            <div
              className={`space-y-6 ${reviews.length > 2 ? "max-h-96 overflow-y-auto pr-2" : ""}`}
            >
              {reviews.map((review: any) => (
                <div
                  key={review._id}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {review.user?.fullName ?? "Anonymous"}
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

      <section className="max-w-7xl w-full mx-auto mt-14 px-4" ref={proRef}>
        <h2 className="text-2xl md:text-heading font-bold text-center md:text-left">
          Related Products
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 mt-6">
          {relatedProducts.slice(0, 4).map((item) => (
            <div
              key={item._id}
              className="card relative flex flex-col bg-card rounded-lg overflow-hidden group border border-gray-100 shadow-sm"
            >
              <div className="relative aspect-4/5 overflow-hidden">
                <img
                  src={item.images?.[0]?.url}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="hidden md:flex absolute inset-0 bg-black/50 backdrop-blur-sm flex-col justify-center items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <AddToCartBtn productId={item._id} />
                  <div className="flex justify-between items-center text-white">
                    <button className="flex items-center gap-2 px-2 py-2 rounded font-semibold hover:text-neutral-300">
                      <IoShareSocialOutline /> Share
                    </button>
                    <button
                      onClick={() => navigate(`/product/${item._id}`)}
                      className="flex items-center gap-2 px-2 py-2 rounded font-semibold hover:text-neutral-300"
                    >
                      <ArrowRight /> Details
                    </button>
                    <WishListBtn
                      product={{
                        id: item._id,
                        title: item.title,
                        image: item.images?.[0]?.url ?? "",
                        price: item.price,
                        originalPrice: item.originalPrice,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="p-3 flex flex-col grow">
                <h2 className="text-grey-1 font-semibold text-sm md:text-lg truncate">
                  {item.title}
                </h2>
                <p className="text-grey-2 font-medium text-xs md:text-sm mt-1 line-clamp-1">
                  {item.short_desc}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-grey-1 font-bold text-sm md:text-base">
                    ${item.price}
                  </p>
                  {item.originalPrice && (
                    <p className="text-grey-2 line-through text-xs opacity-60">
                      ${item.originalPrice}
                    </p>
                  )}
                </div>
                <div className="flex md:hidden flex-col gap-2 mt-3 pt-3 border-t">
                  <AddToCartBtn productId={item._id} />
                  <div className="flex justify-between">
                    <button
                      onClick={() => navigate(`/product/${item._id}`)}
                      className="text-[10px] uppercase tracking-wider font-bold flex items-center gap-1"
                    >
                      <ArrowRight size={12} /> Details
                    </button>
                    <WishListBtn
                      product={{
                        id: item._id,
                        title: item.title,
                        image: item.images?.[0]?.url ?? "",
                        price: item.price,
                        originalPrice: item.originalPrice,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center w-full mt-10">
          <button
            onClick={() => navigate("/shop")}
            className="border border-[#B88E2F] text-[#B88E2F] px-10 py-3 font-semibold transition-all hover:bg-[#B88E2F] hover:text-white"
          >
            See More
          </button>
        </div>
      </section>
    </>
  );
};

export default Product_details;
