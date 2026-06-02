import mongoose, { syncIndexes } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountedPrice: {
      type: Number,
    },
    discountedPercent: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    brand: {
      type: String,
      trim: true,
    },
    color: {
      type: String,
      trim: true,
    },

    sizes: [
      {
        name: { type: String },
        quantity: { type: Number },
      },
    ],

    imageUrl: {
      type: String,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reviews",
      },
    ],
    numRatings: {
      type: Number,
      default: 0,
    },
    topLevelCategory: {
      type: String,
    },

    secondLevelCategory: {
      type: String,
    },

    thirdLevelCategory: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
