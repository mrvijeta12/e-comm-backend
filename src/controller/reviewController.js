import { createReview, getAllReviews } from "../services/reviewService.js";

//! find product by id
export const createReviewController = async (req, res) => {
  const user = req.user;
  try {
    const review = await createReview(user, req.body);
    return res.status(201).json({
      status: true,
      message: "Review created successfully.",
      review,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//! get all review

export const getAllReviewController = async (req, res) => {
  const productId = req.params.id;
  try {
    const review = await getAllReviews(productId);
    return res.status(200).json({
      status: true,
      message: "Review fetched successfully.",
      review,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
