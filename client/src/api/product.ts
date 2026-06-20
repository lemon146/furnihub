import { ProductType } from "@/schema/product.schema.";
import api from "./axios";

export const getProduct = async () => {
  const res = await api.get("product/");
  return res.data;
};

export const createProduct = async (data: ProductType) => {
  const res = await api.post("product/", data);
  return res;
};

export const deleteProduct = async (id: string) => {
  const res = await api.delete(`product/${id}`);
  return res.data;
};
