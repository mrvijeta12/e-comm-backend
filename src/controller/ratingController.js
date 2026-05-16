import { createRating, getAllRating } from "../services/ratingService.js";

//! find product by id
export const createRatingController = async (req, res) => {
  const user = req.user;
  try {
    const rating = await createRating(req.body, user);
    return res.status(201).json({
      status: true,
      message: "Rating created successfully.",
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

export const getAllRatingController = async (req, res) => {
  const productId = req.params.id;
  try {
    const review = await getAllRating(productId);
    return res.status(200).json({
      status: true,
      message: "Rating fetched successfully.",
      review,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
