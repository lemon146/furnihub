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

  const totalRating = product.averageRating * product.numReviews;

  const newNumReviews = product.numReviews + 1;

  const newAvgRating = (totalRating + rating) / newNumReviews;

  //  Update product
  product.numReviews = newNumReviews;
  product.averageRating = Number(newAvgRating.toFixed(1));

  await product.save();

  return res.status(201).json({
    success: true,
    message: "Review created successfully!",
    review: newReview,
  });
});

const updateReviews = asyncHandler(async (req, res) => {
  const reviewsId = req.params.id;
  const { comment, rating } = req.body;
  const user_id = req.user._id;

  const review = await Review.findById(reviewsId);
  if (!review) throw new ApiError(404, "Review not found!");

  // old rating
  const oldRating = review.rating;

  // update review fields
  if (comment) review.comment = comment;
  if (rating !== undefined) review.rating = rating;
  await review.save();

  // update product average
  const product = await Product.findById(review.product);
  if (!product) throw new ApiError(404, "Product not found");

  const totalRating = product.averageRating * product.numReviews;
  const newRating = rating !== undefined ? rating : oldRating;
  const newTotalRating = totalRating - oldRating + newRating;

  product.averageRating = newTotalRating / product.numReviews;

  await product.save();

  res.status(200).json({
    success: true,
    message: "Review updated successfully",
    review,
  });
});

const deleteReviews = asyncHandler(async (req, res) => {
  const review_id = req.params.id;
  const user_id = req.user._id;

  // check review exist
  const review = await Review.findById(review_id);

  if (!review) {
    throw new ApiError(404, "Review not found!");
  }

  // check ownership
  if (
    review.user.toString() !== user_id.toString() &&
    req.user.role !== "ADMIN"
  ) {
    throw new ApiError(403, "You are not allowed to delete this review");
  }
  await review.deleteOne();

  // update avg rating and total reviews in product collection
  const product = await Product.findById(review.product);
  if (!product) {
    throw new ApiError(404, "Product is not found");
  }
  const totalRating = product.numReviews * product.averageRating;

  // subtract deleted review rating
  const newTotalRating = totalRating - review.rating;

  const newNumReviews = product.numReviews - 1;

  const newAvgRating = newNumReviews > 0 ? newTotalRating / newNumReviews : 0;

  product.averageRating = newAvgRating;
  product.numReviews = newNumReviews;
  await product.save();
  return res.status(200).json({
    success: true,
    message: "Delete review successfully!",
  });
});

const getReviews = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const reviews = await Review.find({ product: productId })
    .populate("user", "fullName")
    .populate("product", "title")
    .sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    message: "Reviews fetched successfully",
    reviews,
  });
});

export { createReviews, deleteReviews, getReviews, updateReviews };
