import mongoose, { syncIndexes } from "mongoose";
const ratingSchema = new mongoose.Schema(
  {
    review: {
      type: String,

      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true },
);

const Review = mongoose.model("Review", ratingSchema);

export default Review;
