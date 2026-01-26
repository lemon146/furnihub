import {
  ActiveFilter,
  ShopFilterContextType,
  ShopFilterProviderProps,
} from "@/types/shopfilter";
import { All_Products } from "@/utils/products_data";
import { createContext, useContext, useMemo, useState } from "react";

export const ShopFilterContext = createContext<
  ShopFilterContextType | undefined
>(undefined);

export const ShopFilterProvider = ({ children }: ShopFilterProviderProps) => {
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>({
    category: [] as string[],
    color: [] as string[],
    material: [] as string[],
    price: 0,
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
    if (activeFilter.material.length) {
      data = data.filter(
        (e) => e.material && activeFilter.material.includes(e.material),
      );
    }
    if (activeFilter.price > 0) {
      data = data.filter((e) => e.price && e.price <= activeFilter.price);
    }
    return data;
  }, [
    activeFilter.category,
    activeFilter.color,
    activeFilter.material,
    activeFilter.price,
  ]);
  const priceToggle = (value: string) => {
    const price = Number(value);
    setActiveFilter((prev) => ({
      ...prev,
      price: price,
    }));
  };
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
  const materialToggle = (material: string, checked: boolean) => {
    setActiveFilter((prev) => ({
      ...prev,
      material: checked
        ? [...prev.material, material]
        : prev.material.filter((e) => e !== material),
    }));
  };

  return (
    <ShopFilterContext
      value={{
        categoryToggle,
        filterProduct,
        colorToggle,
        activeFilter,
        setActiveFilter,
        materialToggle,
        priceToggle,
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
