import { addCartItem, findUserCart } from "../services/cartService.js";

//! find user cart
export const findUserCartController = async (req, res) => {
  const user = req.user;

  try {
    const cart = await findUserCart(user._id);
    // console.log("cart", cart);

    return res.status(200).json({
      status: true,
      message: "User cart fetched successfully.",
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//! add item to cart
export const addItemToCartController = async (req, res) => {
  const user = await req.user;
  try {
    const item = await addCartItem(user._id, req.body);

    return res.status(200).json({
      status: true,
      message: "Item added successfully.",
      item,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
