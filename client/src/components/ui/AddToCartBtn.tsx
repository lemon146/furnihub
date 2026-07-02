import { useCartContext } from "@/context/CartContext";
import { CartItem } from "@/types/cart";
import toast from "react-hot-toast";

interface AddToCartProps {
  product: Omit<CartItem, "quantity">;
}

const AddToCartBtn = ({ product }: AddToCartProps) => {
  const { addToCart, cartItems } = useCartContext();

  const isAdded = cartItems.some((item) => item.id === product.id);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        if (isAdded) {
          toast("Already in your cart", {
            icon: "🛒",
            duration: 2000,
            style: {
              borderRadius: "4px",
              background: "#333",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "500",
            },
          });
        } else {
          addToCart(product);
        }
      }}
      className={`
        btn-primary px-4 py-2 font-semibold rounded cursor-pointer
        transition-all duration-300 active:scale-95
        w-full md:w-auto text-sm md:text-base
        ${isAdded ? "opacity-80" : "opacity-100"}
      `}
    >
      {isAdded ? "Item Added" : "Add to Cart"}
    </button>
  );
};

export default AddToCartBtn;
