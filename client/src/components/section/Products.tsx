import { getProduct } from "@/api/product";
import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DecimalsArrowRight } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { IoShareSocialOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import AddToCartBtn from "../ui/AddToCartBtn";
import Loader from "../ui/Loader";
import WishListBtn from "../ui/WishListBtn";

gsap.registerPlugin(ScrollTrigger);

const Products = () => {
  const navigate = useNavigate();
  const proRef = useRef<HTMLDivElement>(null);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProduct,
  });

  const randomProducts = useMemo(() => {
    if (!data?.products) return [];
    return [...data.products].sort(() => Math.random() - 0.5).slice(0, 8);
  }, [data?.products]);

  useEffect(() => {
    if (!randomProducts.length) return;

    const ctx = gsap.context(() => {
      gsap.from(".card", {
        scrollTrigger: {
          trigger: proRef.current,
          start: "top 85%",
        },
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
      });
    }, proRef);

    return () => ctx.revert();
  }, [randomProducts]);

  if (isPending) return <Loader />;
  if (isError)
    return (
      <div>
        Error: {error instanceof Error ? error.message : "Something went wrong"}
      </div>
    );
  if (!data?.products) return null;

  return (
    <section className="max-w-309 w-full mx-auto mt-14 px-4" ref={proRef}>
      <h2 className="text-heading card">Our Products</h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-6">
        {randomProducts.map((item: Product) => (
          <div
            key={item._id}
            className="relative flex flex-col bg-card rounded-lg overflow-hidden group border border-gray-100 shadow-sm card"
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={item.images[0]?.url}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              <div className="hidden md:flex absolute inset-0 bg-black/50 backdrop-blur-sm flex-col justify-center items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <AddToCartBtn productId={item._id} />
                <div className="flex justify-between items-center gap-3 text-white">
                  <button className="flex items-center gap-1 hover:text-neutral-300">
                    <IoShareSocialOutline /> Share
                  </button>
                  <button
                    onClick={() => navigate(`/product/${item._id}`)}
                    className="flex items-center gap-2 text-white px-4 py-2 rounded font-semibold hover:text-neutral-300"
                  >
                    <DecimalsArrowRight /> Details
                  </button>
                  <WishListBtn
                    product={{
                      id: item._id,
                      title: item.title,
                      image: item.images[0]?.url ?? "",
                      price: item.price,
                      originalPrice: item.originalPrice,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="p-3 md:p-4 flex flex-col grow">
              <h2 className="font-semibold text-sm md:text-lg truncate">
                {item.title}
              </h2>
              <p className="text-xs md:text-sm opacity-75 line-clamp-1">
                {item.short_desc}
              </p>

              <div className="flex items-center gap-2 mt-2">
                <span className="font-bold text-sm md:text-base">
                  ${item.price}
                </span>
                {item.originalPrice && (
                  <span className="line-through opacity-50 text-xs">
                    ${item.originalPrice}
                  </span>
                )}
              </div>

              <div className="flex md:hidden flex-col gap-2 mt-3 pt-3 border-t">
                <AddToCartBtn productId={item._id} />
                <div className="flex justify-between">
                  <button
                    onClick={() => navigate(`/product/${item._id}`)}
                    className="text-[10px] uppercase tracking-wider font-bold flex items-center gap-1"
                  >
                    <DecimalsArrowRight size={12} /> Details
                  </button>
                  <WishListBtn
                    product={{
                      id: item._id,
                      title: item.title,
                      image: item.images[0]?.url ?? "",
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

      <div className="flex justify-center items-center w-full mt-5 p-4">
        <button
          onClick={() => navigate("/shop")}
          className="border border-[#B88E2F] text-[#B88E2F] cursor-pointer transition-all px-6 py-2 sm:px-8 sm:py-3 md:px-10 md:py-3.5 hover:bg-[#B88E2F] hover:text-white"
        >
          See More
        </button>
      </div>
    </section>
  );
};

export default Products;
