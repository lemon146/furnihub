import { ReactNode } from "react";

export interface CartItem {
  id: string | number;
  name?: string;
  price?: number;
  quantity: number;
  // optional: image, description, etc.
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (id: string | number) => void;
  //   removeFromCart: (id: string | number) => void;
  //   incrementQuantity: (id: string | number) => void;
  //   decrementQuantity: (id: string | number) => void;
  //   clearCart: () => void;
  //   getCartTotal: () => number;
  //   getCartCount: () => number;
  //   isInCart: (id: string | number) => boolean;
}
export interface CartContextProviderProps {
  children: ReactNode;
}

export interface CartItem {
  id: string | number;
  name?: string;
  price?: number;
  quantity: number;
  // optional: other fields
}
