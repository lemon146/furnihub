import { Product } from "@/types";
import { All_Products } from "@/utils/products_data";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

interface WishListContextType {
  savedProducts: Product[];
  toggleFavorite: (id: number | string) => void;
}
export const WishListContext = createContext<WishListContextType | undefined>(
  undefined,
);

type WishListContextProivderType = {
  children: ReactNode;
};
export const WishListContextProvider = ({
  children,
}: WishListContextProivderType) => {
  const [savedProducts, setSavedProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const toggleFavorite = (id: number | string) => {
    const product = All_Products.find((item) => item.id === id);

    if (!product) {
      toast.error("Product not found!");
      return;
    }
    setSavedProducts((prev) => {
      const exists = prev.some((item) => item.id === product.id);

      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }

      return [...prev, product];
    });
  };
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("wishlist", JSON.stringify(savedProducts));
    }
  }, [savedProducts, isLoaded]);
  useEffect(() => {
    const storeItem = localStorage.getItem("wishlist");
    if (storeItem) {
      setSavedProducts(JSON.parse(storeItem));
    }
    setIsLoaded(true);
  }, []);

  return (
    <WishListContext.Provider value={{ savedProducts, toggleFavorite }}>
      {children}
    </WishListContext.Provider>
  );
};
// custom hooks

export const useWishListContext = () => {
  const context = useContext(WishListContext);
  if (!context)
    throw new Error("useWishListContext must be used within a Provider");
  return context;
};
