import {
  CartContextProviderProps,
  CartContextType,
  CartItem,
} from "@/types/cart";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { All_Products } from "../utils/products_data";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [hasLoaded, SetHasLoaded] = useState(false);

  const addToCart = (id: number | string) => {
    const product = All_Products.find((item) => item.id === id);
    if (!product) return toast.error("product not found");
    const check = cartItems.find((item) => item.id === product.id);
    if (check) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === check.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
      SetHasLoaded(true);
    } else {
      setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
      SetHasLoaded(true);
    }
    return toast.success("Product added");
  };
  // remove Cart
  const removeFromCart = (id: number | string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Product removed!");
    SetHasLoaded(true);
  };
  useEffect(() => {
    if (!hasLoaded) return;
    localStorage.setItem("data", JSON.stringify(cartItems));
  }, [cartItems, hasLoaded]);

  useEffect(() => {
    const stored = localStorage.getItem("data");
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  return (
    <CartContext.Provider value={{ addToCart, cartItems, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within CartContextProvider");
  }
  return context;
};
