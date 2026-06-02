import Address from "../models/addressModel.js";
import OrderItem from "../models/orderItems.js";
import Order from "../models/orderModel.js";
import { findUserCart } from "./cartService.js";

//! create order
export const createOrder = async (user, shipAddress) => {
  // get shipping address (id is come from frontend and check at backend)
  let address;
  if (shipAddress._id) {
    const existAddress = await Address.findById(shipAddress._id);
    // console.log(existAddress);

    address = existAddress;
  } else {
    address = new Address(shipAddress);
    address.user = user;
    await address.save();
    user.address.push(address);
    await user.save();
  }

  // convert cart items into order items
  const cart = await findUserCart(user._id);
  const orderItems = [];
  for (let item of cart.cartItems) {
    const orderItem = new OrderItem({
      price: item.price,
      product: item.product,
      quantity: item.quantity,
      size: item.size,
      userId: item.userId,
      discountedPrice: item.discountedPrice,
    });

    const createdOrderItems = await orderItem.save();
    orderItems.push(createdOrderItems);
  }

  // convert order items to final order
  const order = new Order({
    user,
    orderItems,
    totalPrice: cart.totalPrice,
    totalDiscountedPrice: cart.totalDiscountedPrice,
    discount: cart.discount,
    totalItems: cart.totalItems,
    shippingAddress: address,
  });
  const savedOrder = await order.save();
  return savedOrder;
};

//! place order

export const placeOrder = async (orderId) => {
  const order = await findOrderById(orderId);
  if (!order) throw new Error("Order not found");
  order.orderStatus = "PLACED";
  order.paymentDetails.paymentStatus = "COMPLETED";
  return await order.save();
};

//! confirmed order

export const confirmedOrder = async (orderId) => {
  const order = await findOrderById(orderId);
  if (!order) throw new Error("Order not found");
  order.orderStatus = "CONFIRMED";
  return await order.save();
};
//! Ship order
export const shipOrder = async (orderId) => {
  // console.log("hitted");

  const order = await findOrderById(orderId);
  if (!order) throw new Error("Order not found");
  order.orderStatus = "SHIPPED";
  return await order.save();
};
//! Delivered order
export const deliverOrder = async (orderId) => {
  const order = await findOrderById(orderId);
  if (!order) throw new Error("Order not found");
  order.orderStatus = "DELIVERED";
  return await order.save();
};
//! Cancelled order
export const cancelOrder = async (orderId) => {
  const order = await findOrderById(orderId);
  if (!order) throw new Error("Order not found");
  order.orderStatus = "CANCELLED";
  return await order.save();
};
//! out for  delivery
export const outForDeliveryOrder = async (orderId) => {
  const order = await findOrderById(orderId);
  if (!order) throw new Error("Order not found");
  order.orderStatus = "OUT_FOR_DELIVERY";
  return await order.save();
};

//! find order by id

export const findOrderById = async (orderId) => {
  // console.log("order id service hitted");

  const order = await Order.findById(orderId)
    .populate("user")
    .populate({ path: "orderItems", populate: { path: "product" } })
    .populate("shippingAddress");
  if (!order) {
    throw new Error(`Order not found with id: ${orderId}`);
  }

  // console.log("service order", order);
  return order;
};

//! user order  history
export const userOrderHistory = async (userId) => {
  try {
    const order = await Order.find({
      user: userId,
      // orderStatus: "PLACED",
    })
      .populate({ path: "orderItems", populate: { path: "product" } })
      .populate("shippingAddress")
      .lean();

    return order;
  } catch (error) {
    throw new Error(error.message);
  }
};

//! get all order
export const getAllOrders = async () => {
  const order = await Order.find()
    .populate({ path: "orderItems", populate: { path: "product" } })
    .populate("shippingAddress")
    .lean();
  return order;
};

//! delete order

export const deleteOrder = async (orderId) => {
  const order = await findOrderById(orderId);
  if (!order) {
    throw new Error`Order is not found with id ${order}`();
  }
  await Order.findByIdAndDelete(order);
};
