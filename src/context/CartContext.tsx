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
    } else {
      setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
    }
    return toast.success("Product added");
  };
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(cartItems));
  }, [setCartItems, cartItems]);

  return (
    <CartContext.Provider value={{ addToCart, cartItems }}>
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
