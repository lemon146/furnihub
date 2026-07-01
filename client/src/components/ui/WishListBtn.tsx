import { useWishListContext } from "@/context/WishlistContext";
import { WishlistItem } from "@/types/wishlist";
import { HeartOff } from "lucide-react";
import { FaHeart } from "react-icons/fa";

type WishlistProps = { product: WishlistItem };

const WishListBtn = ({ product }: WishlistProps) => {
  const { toggleFavorite, isWishlisted } = useWishListContext();
  const liked = isWishlisted(product.id);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(product);
      }}
      className={`
    flex items-center gap-2 transition-all duration-300 ease-in-out
    p-2 rounded-full border border-gray-200
    md:border-none md:bg-transparent md:p-0 md:shadow-none
    text-gray-600 md:text-white hover:text-[#B88E2F] md:hover:text-neutral-300
  `}
      aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
    >
      <div className="relative flex items-center justify-center">
        {liked ? (
          <FaHeart
            className="text-green-500 scale-110 transition-transform duration-300"
            size={18}
          />
        ) : (
          <HeartOff
            className="transition-transform duration-300 group-hover:scale-110"
            strokeWidth={1.5}
            size={18}
          />
        )}
      </div>
      <span className="hidden md:inline text-sm font-semibold">
        {liked ? "Liked" : "Like"}
      </span>
    </button>
  );
};

export default WishListBtn;
