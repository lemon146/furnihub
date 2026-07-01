import { getProduct } from "@/api/product";
import { Product } from "@/types/product";
import {
  ActiveFilter,
  MappedProduct,
  ShopFilterContextType,
  ShopFilterProviderProps,
} from "@/types/shopfilter";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useMemo, useState } from "react";

export const ShopFilterContext = createContext<
  ShopFilterContextType | undefined
>(undefined);

function mapProduct(p: Product): MappedProduct {
  return {
    id: p._id,
    title: p.title,
    shortDesc: p.short_desc,
    image: p.images?.[0]?.url ?? "",
    category: p.category?.title?.toLowerCase() ?? "",
    color: p.additionalInfo?.color ?? "",
    material: p.additionalInfo?.material ?? "",
    price: p.price,
    originalPrice: p.originalPrice,
  };
}

export const ShopFilterProvider = ({ children }: ShopFilterProviderProps) => {
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>({
    category: [] as string[],
    color: [] as string[],
    material: [] as string[],
    price: 0,
  });

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProduct,
  });

  const allProducts = useMemo(() => {
    if (!data?.products) return [];
    return data.products.map(mapProduct);
  }, [data]);

  const filterProduct = useMemo(() => {
    let result = allProducts;
    if (activeFilter.category.length) {
      result = result.filter((p: { category: string }) =>
        activeFilter.category.includes(p.category),
      );
    }
    if (activeFilter.color.length) {
      result = result.filter((p: { color: string }) =>
        activeFilter.color.includes(p.color),
      );
    }
    if (activeFilter.material.length) {
      result = result.filter((p: { material: string }) =>
        activeFilter.material.includes(p.material),
      );
    }
    if (activeFilter.price > 0) {
      result = result.filter(
        (p: { price: number }) => p.price <= activeFilter.price,
      );
    }
    return result;
  }, [allProducts, activeFilter]);

  const priceToggle = (value: string) => {
    setActiveFilter((prev) => ({ ...prev, price: Number(value) }));
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
        isPending,
        isError,
        error,
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
