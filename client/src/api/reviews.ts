import api from "./axios";

export const getReviews = async (productId: string) => {
  const res = await api.get(`reviews/${productId}`);
  return res.data;
};
