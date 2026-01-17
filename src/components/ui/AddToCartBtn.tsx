import { useCartContext } from "@/context/CartContext";

interface AddToCartProps {
  productId: string | number;
}
const AddToCartBtn = ({ productId }: AddToCartProps) => {
  const { addToCart } = useCartContext();
  return (
    <button
      onClick={() => addToCart(productId)}
      className="btn-primary px-4 py-2 font-semibold rounded cursor-pointer"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartBtn;
