import { Router } from "express";
import authMiddelware from "../middleware/authMiddelware.js";
import {
  createOrderController,
  findOrderByIdController,
  userOrderHistoryController,
} from "../controller/orderController.js";

const router = Router();
router.post("/", authMiddelware, createOrderController);
router.get("/user", authMiddelware, userOrderHistoryController);
router.get("/:orderId", authMiddelware, findOrderByIdController);

export default router;
