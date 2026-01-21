import {
  ActiveFilter,
  ShopFilterContextType,
  ShopFilterProviderProps,
} from "@/types/shopfilter";
import { All_Products } from "@/utils/products_data";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const ShopFilterContext = createContext<
  ShopFilterContextType | undefined
>(undefined);

export const ShopFilterProvider = ({ children }: ShopFilterProviderProps) => {
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>({
    category: [] as string[],
    color: [] as string[],
  });

  const filterProduct = useMemo(() => {
    let data = All_Products;
    if (activeFilter.category.length) {
      data = data.filter(
        (p) => p.category && activeFilter.category.includes(p.category),
      );
    }
    if (activeFilter.color.length) {
      data = data.filter(
        (c) => c.color && activeFilter.color.includes(c.color),
      );
    }
    return data;
  }, [activeFilter.category, activeFilter.color]);
  const categoryToggle = (category: string, checked: boolean) => {
    setActiveFilter((prev) => ({
      ...prev,
      category: checked
        ? [...prev.category, category.toLowerCase()]
        : prev.category.filter((e) => e !== category.toLowerCase()),
    }));
  };
  const colorToggle = (color: string) => {
    setActiveFilter((prev) => ({
      ...prev,
      color: prev.color.includes(color)
        ? prev.color.filter((c) => c !== color)
        : [...prev.color, color],
    }));
  };
  useEffect(() => {
    console.log("Active filter:", activeFilter.color);
    console.log("Filtered products:", filterProduct);
  }, [activeFilter, activeFilter.color]);

  return (
    <ShopFilterContext
      value={{
        categoryToggle,
        filterProduct,
        colorToggle,
        activeFilter,
        setActiveFilter,
      }}
    >
      {children}
    </ShopFilterContext>
  );
};

export const useShopFilter = () => {
  const context = useContext(ShopFilterContext);
  if (!context) {
    throw new Error("useShopFilter must be used within ShopFilterProvider");
  }
  return context;
};
