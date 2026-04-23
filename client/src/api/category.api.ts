import api from "./axios";

export const getCategory = async () => {
  const res = await api.get("/category/");
  return res.data;
};
