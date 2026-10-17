import api from "./axios";

export const getAllUsers = async () => {
  const res = await api.get("users/");
  return res.data;
};
export const deleteCustomer = async (id: string) => {
  const res = await api.delete(`users/${id}`);
  return res.data;
};
