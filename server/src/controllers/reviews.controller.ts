import { asyncHandler } from "../middlewares/asyncHandler";
import { Product } from "../models/product.models";
import { Review } from "../models/reviews.model";
import { ApiError } from "../utils/apiError";

const createReviews = asyncHandler(async (req, res) => {
  const product_id = req.params.id;
  const user_id = req.user._id;

  const { comment } = req.body;
  const rating = Number(req.body.rating);

  if (!req.body.rating || isNaN(rating)) {
    throw new ApiError(400, "Valid rating is required");
  }

  if (rating < 1 || rating > 5) {
    throw new ApiError(400, "Rating must be between 1 and 5");
  }
  // Validate product id
  if (!product_id) {
    throw new ApiError(400, "Product id is required");
  }

  //  Check product exists
  const product = await Product.findById(product_id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // Prevent duplicate review
  const existingReview = await Review.findOne({
    product: product_id,
    user: user_id,
  });

  if (existingReview) {
    throw new ApiError(
      409,
      "You already reviewed this product. Please update instead.",
    );
  }

  // Create review
  const newReview = await Review.create({
    product: product_id,
    user: user_id,
    rating,
    comment,
  });

  // calculate product rating and reviews

  const totalRating = product.rating * product.numReviews;

  const newNumReviews = product.numReviews + 1;

  const newAvgRating = (totalRating + rating) / newNumReviews;

  //  Update product
  product.numReviews = newNumReviews;
  product.rating = Number(newAvgRating.toFixed(1));

  await product.save();

  return res.status(201).json({
    success: true,
    message: "Review created successfully!",
    review: newReview,
  });
});

export { createReviews };
