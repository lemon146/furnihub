import { useCartContext } from "@/context/CartContext";

interface AddToCartProps {
  productId: string | number;
}

const AddToCartBtn = ({ productId }: AddToCartProps) => {
  const { addToCart, cartItems } = useCartContext();

  // Checking if item is already in cart
  const isAdded = cartItems.find((item) => item.id === productId);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        addToCart(productId);
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
