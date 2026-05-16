import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";

//! create product
export const createProduct = async (reqData) => {
  if (!reqData.topLevelCategory) {
    throw new Error("topLevelCategory is missing");
  }
  if (!reqData.secondLevelCategory) {
    throw new Error("secondLevelCategory is missing");
  }
  if (!reqData.thirdLevelCategory) {
    throw new Error("thirdLevelCategory is missing");
  }
  let topLevel = await Category.findOne({ name: reqData.topLevelCategory });
  if (!topLevel) {
    topLevel = new Category({
      name: reqData.topLevelCategory,
      level: 1,
    });
    await topLevel.save();
  }
  let secondlevel = await Category.findOne({
    name: reqData.secondLevelCategory,
    parentCategory: topLevel._id,
  });
  if (!secondlevel) {
    secondlevel = new Category({
      name: reqData.secondLevelCategory,
      parentCategory: topLevel._id,
      level: 2,
    });
    await secondlevel.save();
  }
  let thirdlevel = await Category.findOne({
    name: reqData.thirdLevelCategory,
    parentCategory: secondlevel._id,
  });
  if (!thirdlevel) {
    thirdlevel = new Category({
      name: reqData.thirdLevelCategory,
      parentCategory: secondlevel._id,
      level: 3,
    });
    await thirdlevel.save();
  }
  // change to reqData
  const product = new Product({
    title: reqData.title,
    color: reqData.color,
    description: reqData.description,
    discountedPrice: reqData.discountedPrice,
    discountedPercent:
      reqData.discountedPercent ??
      (reqData.price > 0
        ? Math.round(
            ((reqData.price - reqData.discountedPrice) / reqData.price) * 100,
          )
        : 0),
    imageUrl: reqData.imageUrl,
    price: reqData.price,
    sizes: reqData.sizes,
    quantity: reqData.quantity,
    category: thirdlevel._id,
  });
  // console.log(product);

  return await product.save();
};

//! delete product
export const deleteProduct = async (productId) => {
  const product = await findProductById(productId);
  if (!product)
    throw new Error(`Product does not found with this id : ${productId}`);
  await Product.findByIdAndDelete(productId);
  return "Product deleted successfully";
};

//! update product
export const updateProduct = async (productId, reqData) => {
  return await Product.findByIdAndUpdate(productId, reqData);
};

//! find product by id

export const findProductById = async (productId) => {
  const product = await Product.findById(productId).populate("category").exec();
  if (!product) {
    throw new Error(`Product not found with id : ${productId}`);
  }
  return product;
};

//! get all products based on the filter, sort and pagination
export const getAllProducts = async (reqQuery) => {
  let {
    category,
    color,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    sort,
    stock,
    pageNumber = 1,
    pageSize = 10,
  } = reqQuery;

  const page = Math.max(1, Number(pageNumber));
  const size = Math.max(1, Number(pageSize));

  const filter = {};

  // Category
  if (category) {
    const existCategory = await Category.findOne({ name: category });
    if (!existCategory) {
      return { content: [], currentPage: 1, totalPages: 0 };
    }
    filter.category = existCategory._id;
  }

  // Color
  if (color) {
    const colors = color.split(",").map((c) => c.trim());
    filter.color = { $in: colors.map((c) => new RegExp(c, "i")) };
  }

  // Sizes
  if (sizes) {
    const sizeArr = sizes.split(",");
    filter["sizes.name"] = { $in: sizeArr }; // sizes.name is in the model of product
  }

  // Price

  // if (minPrice || maxPrice) {
  //   filter.discountedPrice = {};
  //   if (minPrice) filter.discountedPrice.$gte = Number(minPrice);
  //   if (maxPrice) filter.discountedPrice.$lte = Number(maxPrice);
  // }

  // ✅ Price (FIXED properly)
  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.$expr = {
      $and: [
        {
          $gte: [
            { $ifNull: ["$discountedPrice", "$price"] },
            Number(minPrice ?? 0),
          ],
        },
        {
          $lte: [
            { $ifNull: ["$discountedPrice", "$price"] },
            Number(maxPrice ?? Infinity),
          ],
        },
      ],
    };
  }

  // Discount
  if (minDiscount !== undefined) {
    filter.discountedPercent = { $gte: Number(minDiscount) };
  }

  // Stock
  if (stock === "in_stock") {
    filter.quantity = { $gt: 0 };
  } else if (stock === "out_of_stock") {
    filter.quantity = 0;
  }

  // Sorting
  let sortOption = {};
  if (sort === "price_high") sortOption.discountedPrice = -1;
  else if (sort === "price_low") sortOption.discountedPrice = 1;

  // Pagination
  const skip = (pageNumber - 1) * pageSize;

  const [products, totalProducts] = await Promise.all([
    Product.find(filter)
      .populate("category")
      .sort(sortOption)
      .skip(skip)
      .limit(pageSize)
      .exec(),

    Product.countDocuments(filter),
  ]);
  // console.log("product shirts:", products);

  return {
    content: products,
    currentPage: Number(pageNumber),
    totalPages: Math.ceil(totalProducts / pageSize),
  };
};

//! create multiple products
export const createMultipleProducts = async (products) => {
  for (let product of products) {
    try {
      await createProduct(product);
    } catch (err) {
      console.log(err.message);
    }
  }
};
