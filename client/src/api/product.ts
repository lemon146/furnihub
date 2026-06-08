import { ProductType } from "@/schema/product.schema.";
import api from "./axios";

export const getProduct = async () => {
  const res = await api.get("product/");
  return res.data;
};

export const createProduct = async (data: ProductType) => {
  const res = await api.post("product/", data);
};
