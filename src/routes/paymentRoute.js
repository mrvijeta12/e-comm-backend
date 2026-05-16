import express from "express";
import authMiddelware from "../middleware/authMiddelware.js";

import {
  createPaymentLinkController,
  updatedPaymentInfoController,
} from "../controller/paymentController.js";

const router = express.Router();

router.post("/:id", authMiddelware, createPaymentLinkController);
router.get("/", authMiddelware, updatedPaymentInfoController);

export default router;
