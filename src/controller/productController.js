import {
  createMultipleProducts,
  createProduct,
  deleteProduct,
  findProductById,
  getAllProducts,
  updateProduct,
} from "../services/productService.js";

//! create product
export const createProductController = async (req, res) => {
  try {
    const product = await createProduct(req.body);

    return res.status(201).json({
      status: true,
      message: "Product created successfully.",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//! delete product
export const deleteProductController = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await deleteProduct(productId);
    return res.status(200).json({
      status: true,
      message: "Product deleted successfully.",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//! update product
export const updateProductController = async (req, res) => {
  const productId = req.params.id;
  try {
    const updatedProduct = await updateProduct(productId, req.body);
    return res.status(200).json({
      status: true,
      message: "Product updated successfully.",
      updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//! get all product
export const getAllProductController = async (req, res) => {
  // console.log("hitting");

  try {
    const products = await getAllProducts(req.query);
    // console.log("prod:", products);

    return res.status(200).json({
      status: true,
      message: "Product fetched successfully.",
      products,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//! create multiple products
export const createMultipleProductController = async (req, res) => {
  try {
    const products = await createMultipleProducts(req.body);
    return res.status(200).json({
      status: true,
      message: "Product created successfully.",
      products,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//! find product by id

export const findProductByIdController = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await findProductById(productId);
    return res.status(200).json({
      status: true,
      message: "Product fetched successfully.",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
