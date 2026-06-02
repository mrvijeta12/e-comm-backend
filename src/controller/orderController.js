import {
  cancelOrder,
  confirmedOrder,
  createOrder,
  deleteOrder,
  deliverOrder,
  findOrderById,
  getAllOrders,
  placeOrder,
  shipOrder,
  userOrderHistory,
} from "../services/orderService.js";

//! create order
export const createOrderController = async (req, res) => {
  const user = req.user;
  try {
    const order = await createOrder(user, req.body);
    // console.log("order", order);
    return res.status(201).json({
      status: true,
      message: "Order created successfully.",
      order: order._id,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
//! place order

export const placedOrderController = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await placeOrder(orderId);
    return res.status(200).json({
      status: true,
      message: "Order placed successfully.",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//! confirm order

export const confirmedOrderController = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await confirmedOrder(orderId);
    return res.status(200).json({
      status: true,
      message: "Order confirmed successfully.",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//! shipped order

export const shippedOrderController = async (req, res) => {
  // console.log("CONTROLLER HIT");
  const orderId = req.params.orderId;
  try {
    const order = await shipOrder(orderId);
    return res.status(200).json({
      status: true,
      message: "Order shipped successfully.",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//! delivered order

export const deliveredOrderController = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await deliverOrder(orderId);
    return res.status(200).json({
      status: true,
      message: "Order deliverd successfully.",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//! cancelled order

export const cancelledOrderController = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await cancelOrder(orderId);
    return res.status(200).json({
      status: true,
      message: "Order cancelled successfully.",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//! find  order by id

export const findOrderByIdController = async (req, res) => {
  const orderId = req.params.orderId;
  // console.log("find order by id api hitted");

  try {
    const order = await findOrderById(orderId);
    // console.log(order);

    return res.status(200).json({
      status: true,
      message: "Order fetched successfully.",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//! user order history

export const userOrderHistoryController = async (req, res) => {
  // console.log("user order history api hitted");

  const user = req.user;
  try {
    const orders = await userOrderHistory(user._id);
    return res.status(200).json({
      status: true,
      message: "Order history fetched successfully.",
      orders,
      totalOrder: orders.length,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//! get all orders

export const getAllOrderController = async (req, res) => {
  try {
    const orders = await getAllOrders();
    return res.status(200).json({
      status: true,
      message: "Orders fetched successfully.",
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//! delete  orders

export const deleteOrderController = async (req, res) => {
  try {
    const order = await deleteOrder();
    return res.status(200).json({
      status: true,
      message: "Orders deleted successfully.",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
