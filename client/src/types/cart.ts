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
  incrementProduct: (id: string) => void;
  decrementProduct: (id: string) => void;
  subtotal: number;
}

export interface CartContextProviderProps {
  children: ReactNode;
}
