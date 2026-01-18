import { useWishListContext } from "@/context/WishlistContext";
import { HeartOff } from "lucide-react";
import { FaHeart } from "react-icons/fa";

type WishlistProps = {
  productId: number | string;
};
const WishListBtn = ({ productId }: WishlistProps) => {
  const { toggleFavorite, savedProducts } = useWishListContext();
  const islike = savedProducts.find((item) => item.id == productId);
  return (
    <button
      onClick={() => {
        toggleFavorite(productId);
      }}
      className={`flex items-center gap-1 text-white  hover-text-neutral`}
    >
      {islike ? <HeartOff strokeWidth={0.75} /> : <FaHeart />}
      {islike ? "unlike" : "Like"}
    </button>
  );
};

export default WishListBtn;
