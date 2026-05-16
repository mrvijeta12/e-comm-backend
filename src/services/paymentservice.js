import razorpay from "../config/razorpayClient.js";
import { findOrderById } from "./orderService.js";

export const createPaymentLink = async (orderId) => {
  try {
    const order = await findOrderById(orderId);
    if (!order) throw new Error(`Order not found with this id ${orderId}`);
    const paymentLinkrequest = {
      amount: order.totalDiscountedPrice * 100,
      currency: "INR",
      customer: {
        // name: `${order.user.firstname} ${order.user.lastName}`,
        // contact: order.user.mobile,
        // email: order.user.email,
        name: "Test User",
        contact: "9999999999", // ✅ must be Indian format
        email: "test@example.com",
      },
      notify: {
        sms: true,
        email: true,
      },
      reminder_enable: true,
      callback_url: `http://localhost/5173/payment/${orderId}`,
      callback_method: "get",
    };

    const paymentLink = await razorpay.paymentLink.create(paymentLinkrequest);
    const paymentLinkId = paymentLink.id;
    const paymentLinkUrl = paymentLink.short_url;

    const resData = {
      paymentLinkId,
      paymentLinkUrl,
    };

    return resData;
  } catch (error) {
    console.log("payment create failed", error.message);
    throw new Error(error.message);
  }
};

export const updatePaymentInfo = async (reqData) => {
  const paymentId = reqData.payment_id;
  const orderId = reqData.order_id;

  try {
    const order = await findOrderById(orderId);
    const payment = await razorpay.payments.fetch(paymentId);

    if (payment.status === "captured") {
      order.paymentDetails.paymentId = paymentId;
      order.paymentDetails.paymentStatus = "COMPLETED";
      order.orderStatus = "PLACED";

      await order.save();

      return {
        success: true,
        message: "Your order is placed.",
        order,
      };
    } else {
      return {
        success: false,
        message: "Payment not captured.",
      };
    }
  } catch (error) {
    console.log("order placed failed", error.message);
    throw new Error(error.message);
  }
};
