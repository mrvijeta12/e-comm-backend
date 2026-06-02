import razorpay from "../config/razorpayClient.js";
import { findOrderById } from "./orderService.js";

export const createPaymentLink = async (orderId) => {
  try {
    const order = await findOrderById(orderId);
    if (!order) throw new Error(`Order not found with this id ${orderId}`);

    // Sanitize phone number to meet Razorpay's strict 10-digit requirement
    const cleanContact = order.user.mobile
      ? order.user.mobile.replace(/\D/g, "").slice(-10)
      : "9999999999";

    const paymentLinkrequest = {
      amount: Math.round(order.totalDiscountedPrice * 100), // Math.round ensures it's a clean integer
      currency: "INR",
      customer: {
        name: `${order.user.firstname || "Guest"} ${order.user.lastName || ""}`.trim(),
        contact: cleanContact,
        email: order.user.email,
      },
      notify: {
        sms: true,
        email: true,
      },
      reminder_enable: true,
      callback_url: `http://localhost:5173/payment/${orderId}`, // ✅ FIXED: Added colon for port
      callback_method: "get",
    };

    const paymentLink = await razorpay.paymentLink.create(paymentLinkrequest);

    return {
      paymentLinkId: paymentLink.id,
      paymentLinkUrl: paymentLink.short_url,
    };
  } catch (error) {
    console.error("payment create failed:", error.message);
    throw new Error(error.message);
  }
};

export const updatePaymentInfo = async (reqData) => {
  const paymentId = reqData.payment_id;
  const orderId = reqData.order_id;

  if (!paymentId || !orderId) {
    throw new Error("Missing payment_id or order_id in request data");
  }

  try {
    const order = await findOrderById(orderId);
    if (!order) throw new Error(`Order not found with id ${orderId}`);

    const payment = await razorpay.payments.fetch(paymentId);

    // Razorpay statuses: created, authorized, captured, refunded, failed
    if (payment.status === "captured") {
      order.paymentDetails.paymentId = paymentId;
      order.paymentDetails.paymentStatus = "COMPLETED";
      order.orderStatus = "PLACED";

      await order.save();

      return {
        success: true,
        message: "Your order is placed successfully.",
        order,
      };
    } else {
      return {
        success: false,
        message: `Payment not captured. Current status: ${payment.status}`,
      };
    }
  } catch (error) {
    console.error("order verification failed:", error.message);
    throw new Error(error.message);
  }
};
