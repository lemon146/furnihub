import { Product } from "@/types";
import { ReactNode } from "react";

export type ShopFilterContextType = {
  categoryToggle: (category: string, checked: boolean) => void;
  materialToggle: (material: string, checked: boolean) => void;
  colorToggle: (color: string) => void;
  priceToggle: (price: string) => void;
  filterProduct: Product[];
  activeFilter: ActiveFilter;
  setActiveFilter: React.Dispatch<React.SetStateAction<ActiveFilter>>;
};

export interface ShopFilterProviderProps {
  children: ReactNode;
}

export type ActiveFilter = {
  category: string[];
  color: string[];
  price: number;
  material: string[];
};
