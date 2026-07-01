import { ReactNode } from "react";

export interface MappedProduct {
  id: string;
  title: string;
  shortDesc: string;
  image: string;
  category: string;
  color: string;
  material: string;
  price: number;
  originalPrice?: number;
}

export type ActiveFilter = {
  category: string[];
  color: string[];
  price: number;
  material: string[];
};

export type ShopFilterContextType = {
  categoryToggle: (category: string, checked: boolean) => void;
  materialToggle: (material: string, checked: boolean) => void;
  colorToggle: (color: string) => void;
  priceToggle: (price: string) => void;
  filterProduct: MappedProduct[];
  activeFilter: ActiveFilter;
  setActiveFilter: React.Dispatch<React.SetStateAction<ActiveFilter>>;
  isPending: boolean;
  isError: boolean;
  error: unknown;
};

export interface ShopFilterProviderProps {
  children: ReactNode;
}
