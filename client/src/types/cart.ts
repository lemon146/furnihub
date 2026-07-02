// types/cart.ts
import { ReactNode } from "react";

export interface CartItem {
  id: string;
  title: string;
  image: string;
  price: number;
  originalPrice?: number | undefined;
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
}

export interface CartContextProviderProps {
  children: ReactNode;
}
