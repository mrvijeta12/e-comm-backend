import {
  createPaymentLink,
  updatePaymentInfo,
} from "../services/paymentservice.js";

export const createPaymentLinkController = async (req, res) => {
  // console.log("hitted");

  const id = req.params.id;
  // console.log(id);

  try {
    const paymentLink = await createPaymentLink(id);
    return res.status(200).json({
      status: true,
      message: "payment link created successfully",
      paymentLink,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const updatedPaymentInfoController = async (req, res) => {
  const id = req.params.id;
  try {
    await updatePaymentInfo(req.query);
    return res.status(200).json({
      status: true,
      message: "payment info updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
