import { CategoryType } from "@/types/category";
import api from "./axios";

export const getCategory = async () => {
  const res = await api.get("/category/");
  return res.data;
};

export const createCategory = async (data: CategoryType) => {
  const res = await api.post("/category", data);
  return res;
};
