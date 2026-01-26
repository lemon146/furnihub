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
    return toast.success("Added to cart successfully!", {
      icon: "✨",
      style: {
        borderRadius: "8px",
        background: "#B88E2F",
        color: "#fff",
      },
    });
  };
  // remove Cart
  const removeFromCart = (id: number | string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Product removed from cart", {
      icon: "🗑️",
      duration: 3000,
      position: "top-center",
      style: {
        background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(239, 68, 68, 0.2)",
        color: "#3A3A3A",

        padding: "16px 24px",
        borderRadius: "12px",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",

        fontSize: "14px",
        fontWeight: "600",
        letterSpacing: "0.01em",
      },
    });
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
