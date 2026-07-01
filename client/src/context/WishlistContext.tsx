import { WishlistItem } from "@/types/wishlist";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

interface WishListContextType {
  savedProducts: WishlistItem[];
  toggleFavorite: (product: WishlistItem) => void;
  isWishlisted: (id: string) => boolean;
}

export const WishListContext = createContext<WishListContextType | undefined>(
  undefined,
);

type WishListContextProviderType = { children: ReactNode };

export const WishListContextProvider = ({
  children,
}: WishListContextProviderType) => {
  const [savedProducts, setSavedProducts] = useState<WishlistItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const toggleFavorite = (product: WishlistItem) => {
    if (!product?.id) {
      toast.error("Product not found!");
      return;
    }

    const exists = savedProducts.some((item) => item.id === product.id);

    setSavedProducts((prev) =>
      exists
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product],
    );

    if (exists) {
      toast.success("Removed from wishlist");
    } else {
      toast.success("Added to wishlist");
    }
  };

  const isWishlisted = (id: string) =>
    savedProducts.some((item) => item.id === id);

  useEffect(() => {
    if (isLoaded)
      localStorage.setItem("wishlist", JSON.stringify(savedProducts));
  }, [savedProducts, isLoaded]);

  useEffect(() => {
    const storeItem = localStorage.getItem("wishlist");
    if (storeItem) setSavedProducts(JSON.parse(storeItem));
    setIsLoaded(true);
  }, []);

  return (
    <WishListContext.Provider
      value={{ savedProducts, toggleFavorite, isWishlisted }}
    >
      {children}
    </WishListContext.Provider>
  );
};

export const useWishListContext = () => {
  const context = useContext(WishListContext);
  if (!context)
    throw new Error("useWishListContext must be used within a Provider");
  return context;
};
