import { findProductById } from "./productService.js";
import Rating from "../models/ratingModel.js";

//! create review
export const createRating = async (reqData, user) => {
  const product = await findProductById(reqData.productId);
  if (!product) {
    throw new Error(`Product not found with the id: ${reqData.productId}`);
  }
  const rating = new Rating({
    user: user._id,
    product: product._id,
    rating: reqData.rating,
    createdAt: new Date(),
  });
  const savedRating = await rating.save();
  //   product.rating.push(savedRating._id);
  //   await product.save();
  return savedRating;
};

//! get all review

export const getAllRating = async (productId) => {
  const product = await findProductById(productId);
  if (!product) {
    throw new Error(`Product not found with the id: ${productId}`);
  }
  return await Rating.find({ product: productId });
};
