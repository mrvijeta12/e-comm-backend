import { findProductById } from "./productService.js";
import Review from "../models/reviewModel.js";

//! create review
export const createReview = async (reqData, user) => {
  const product = await findProductById(reqData.productId);
  if (!product) {
    throw new Error(`Product not found with the id: ${reqData.productId}`);
  }
  const review = new Review({
    user: user._id,
    product: product._id,
    review: reqData.review,
    createdAt: new Date(),
  });
  const savedReview = await review.save();
  product.reviews.push(savedReview._id);

  await product.save();
  return savedReview;
};

//! get all review

export const getAllReviews = async (productId) => {
  const product = await findProductById(productId);
  if (!product) {
    throw new Error(`Product not found with the id: ${productId}`);
  }
  return await Review.find({ product: productId }).populate("user");
};
