import { useWishListContext } from "@/context/WishlistContext";
import { FaHeart } from "react-icons/fa";

type WishlistProps = {
  productId: number | string;
};
const WishListBtn = ({ productId }: WishlistProps) => {
  const { toggleFavorite } = useWishListContext();
  return (
    <button
      onClick={() => {
        toggleFavorite(productId);
        console.log(productId);
      }}
      className="flex items-center gap-1 hover-text-neutral"
    >
      <FaHeart /> Like
    </button>
  );
};

export default WishListBtn;
