import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  level: {
    type: Number,
    required: true,
  },
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
