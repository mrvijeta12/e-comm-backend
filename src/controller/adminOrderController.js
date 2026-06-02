//! get all orders

import {
  cancelOrder,
  confirmedOrder,
  deleteOrder,
  deliverOrder,
  getAllOrders,
  outForDeliveryOrder,
  shipOrder,
} from "../services/orderService.js";

export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await getAllOrders();
    return res.status(200).json({
      status: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//! confirmed orders
export const confirmedOrdersController = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await confirmedOrder(orderId);
    return res.status(200).json({
      status: true,
      message: "Order confirmed.",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//! shipped orders
export const shippedOrdersController = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await shipOrder(orderId);
    return res.status(200).json({
      status: true,
      message: "Order shipped.",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
//! out for  delivering orders
export const outForDeliveryOrdersController = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await outForDeliveryOrder(orderId);
    return res.status(200).json({
      status: true,
      message: "Order out for delivery.",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
//! delivered orders
export const deliveredOrdersController = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await deliverOrder(orderId);
    return res.status(200).json({
      status: true,
      message: "Order delivered.",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//! cancelled orders
export const cancelledOrdersController = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await cancelOrder(orderId);
    return res.status(200).json({
      status: true,
      message: "Order cancelled.",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//! delete orders
export const deleteOrdersController = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await deleteOrder(orderId);
    return res.status(200).json({
      status: true,
      message: "Order deleted.",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
