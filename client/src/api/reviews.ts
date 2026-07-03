import api from "./axios";

// Get all reviews of a product
export const getReviews = async (productId: string) => {
  const res = await api.get(`reviews/${productId}`);
  return res.data;
};

// Create a review
export const createReview = async (
  productId: string,
  data: {
    rating: number;
    comment?: string;
  },
) => {
  const res = await api.post(`reviews/${productId}`, data);
  return res.data;
};

// Update a review
export const updateReview = async (
  reviewId: string,
  data: {
    rating?: number;
    comment?: string;
  },
) => {
  const res = await api.patch(`reviews/${reviewId}`, data);
  return res.data;
};

// Delete a review
export const deleteReview = async (reviewId: string) => {
  const res = await api.delete(`reviews/${reviewId}`);
  return res.data;
};

// Add reply (Admin)
export const replyReview = async (reviewId: string, message: string) => {
  const res = await api.post(`reviews/${reviewId}/reply`, {
    message,
  });

  return res.data;
};

// Update reply (Admin)
export const updateReplyReview = async (reviewId: string, message: string) => {
  const res = await api.patch(`reviews/${reviewId}/reply`, {
    message,
  });

  return res.data;
};

// Delete reply (Admin)
export const deleteReplyReview = async (reviewId: string) => {
  const res = await api.delete(`reviews/${reviewId}/reply`);
  return res.data;
};
