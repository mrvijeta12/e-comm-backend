import CartItem from "../models/cartItemModel.js";
import { findUserById } from "../services/userService.js";

//! update cart item
export const updateCartItem = async (userId, cartItemId, cartItemData) => {
  try {
    const item = await CartItem.findById(cartItemId).populate("product");

    if (!item) {
      throw new Error(`cart item not found: ${cartItemId}`);
    }
    const user = await findUserById(item.userId);
    if (!user) {
      throw new Error(`user not found: ${userId}`);
    }
    if (user._id.toString() === userId.toString()) {
      item.quantity = cartItemData.quantity;
      item.price = item.product.price;
      item.discountedPrice = item.product.discountedPrice;
      const updatedCartItems = await item.save();
      // console.log(updatedCartItems);
      return updatedCartItems;
    } else {
      throw new Error("You can not update this cart item");
    }
  } catch (error) {
    console.log(error.message);

    throw new Error(error.message);
  }
};

//! remove cart item
export const removeCartItem = async (userId, cartItemId) => {
  try {
    const cartItem = await CartItem.findById(cartItemId);
    if (!cartItem)
      throw new Error(`Cart item not found with id: ${cartItemId}`);
    const user = await findUserById(userId);
    if (!user) throw new Error(`User not found with id: ${userId}`);
    if (cartItem.userId.toString() === user._id.toString()) {
      const deletedItem = await CartItem.findByIdAndDelete(cartItemId);
      return deletedItem;
    } else {
      throw new Error("You cannot delete this cart item");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

//! find cart item by id
export const findCartItemByIdService = async (cartItemId) => {
  const cartItem = await findCartItemById(cartItemId);

  if (!cartItem) {
    throw new Error(`Cart item not found with id: ${cartItemId}`);
  }

  return cartItem;
};
