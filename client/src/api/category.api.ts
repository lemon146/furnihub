import api from "./axios";

export const getCategory = async () => {
  const res = await api.get("/category/");
  return res.data;
};

export const createCategory = async (data: FormData) => {
  const res = await api.post("/category/create", data);
  return res;
};

export const updateCategory = (id: string, formData: FormData) =>
  api.put(`/category/update/${id}`, formData);

export const deleteCategory = (id: string) => {
  const res = api.delete(`/category/delete/${id}`);
  return res;
};
