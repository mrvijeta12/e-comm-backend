import Cart from "../models/cartModel.js";
import CartItem from "../models/cartItemModel.js";
import Product from "../models/productModel.js";

export const createCart = async (user, session) => {
  // console.log("hit");
  // console.log(user);

  try {
    const cart = new Cart({
      user: user,
      cartItems: [],
    });
    const createdCart = await cart.save({ session });
    // console.log(createCart);

    return createdCart;
  } catch (error) {
    throw new Error(error.message);
  }
};

//! find user cart

export const findUserCart = async (userId) => {
  try {
    // getting a user cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) throw new Error("Cart not found");
    // getting all items in the cart
    let cartItems = await CartItem.find({ cart: cart._id }).populate("product");
    cart.cartItems = cartItems;
    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItems = 0;
    for (let item of cart.cartItems) {
      totalPrice += item.price * item.quantity;
      totalDiscountedPrice += item.discountedPrice * item.quantity;
      totalItems += item.quantity;
    }
    cart.totalPrice = totalPrice;
    cart.totalDiscountedPrice = totalDiscountedPrice;
    cart.totalItems = totalItems;
    cart.discount = totalPrice - totalDiscountedPrice;

    // console.log(cart);

    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

//! add item to cart

export const addCartItem = async (userId, req) => {
  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new Error("Cart not found");
    const product = await Product.findById(req.productId);
    if (!product) throw new Error("Product not found");

    const isPresent = await CartItem.findOne({
      cart: cart._id,
      product: product._id,
      userId,
      size: req.size,
    });
    if (isPresent) {
      isPresent.quantity += 1;
      await isPresent.save();
      return isPresent; // ✅ RETURN something
    } else {
      const newItem = new CartItem({
        userId,
        product: product._id,
        cart: cart._id,
        quantity: 1,
        size: req.size,
        price: product.price,
        discountedPrice: product.discountedPrice,
      });
      const newCartItem = await newItem.save();
      // cartItems is in the cart model
      cart.cartItems.push(newCartItem);
      await cart.save();
      // console.log("new cart item ", newCartItem);
      return newCartItem;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
