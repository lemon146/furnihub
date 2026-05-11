import { CategoryType } from "@/schema/category.schema";
import api from "./axios";

export const getCategory = async () => {
  const res = await api.get("/category/");
  return res.data;
};

export const createCategory = async (data: FormData) => {
  const res = await api.post("/category/create", data);
  return res;
};
