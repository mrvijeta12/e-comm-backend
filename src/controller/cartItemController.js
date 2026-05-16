import {
  findCartItemByIdService,
  removeCartItem,
  updateCartItem,
} from "../services/cartItemService.js";

export const updatedCartItemController = async (req, res) => {
  const user = req.user;
  const cartItemId = req.params.id;
  // console.log("cartitemid", cartItemId);

  try {
    const updatedItem = await updateCartItem(user._id, cartItemId, req.body);
    // console.log("updatedItem", updatedItem);

    return res.status(200).json({
      status: true,
      message: "Item updated successfully.",
      updatedItem,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//! remove cart item

export const removeCartItemController = async (req, res) => {
  const user = req.user;
  const cartItemId = req.params.id;

  try {
    const removedItem = await removeCartItem(user._id, cartItemId);
    // console.log("removed", removeCartItem);

    return res.status(200).json({
      status: true,
      message: "Item removed successfully.",
      removedItem,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//! find cart item by id

export const findCartItemByIdController = async (req, res) => {
  const cartItemId = req.params.id;
  try {
    const item = await findCartItemByIdService(cartItemId);
    return res.status(200).json({
      status: true,
      message: "Item fetched successfully.",
      item,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
