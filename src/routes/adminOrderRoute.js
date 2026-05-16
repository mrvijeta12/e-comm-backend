import { Router } from "express";
import {
  getAllOrdersController,
  confirmedOrdersController,
  shippedOrdersController,
  cancelledOrdersController,
  deliveredOrdersController,
  deleteOrdersController,
} from "../controller/adminOrderController.js";

import authMiddelware from "../middleware/authMiddelware.js";
import { placedOrderController } from "../controller/orderController.js";

const router = Router();
router.get("/", authMiddelware, getAllOrdersController);
router.post("/:orderId", authMiddelware, placedOrderController);
router.put("/:orderId/confirm", authMiddelware, confirmedOrdersController);
// router.patch("/:orderId/ship", authMiddelware, shippedOrdersController);
router.put("/:orderId/ship", authMiddelware, shippedOrdersController);
router.put("/:orderId/deliver", authMiddelware, deliveredOrdersController);
router.put("/:orderId/cancel", authMiddelware, cancelledOrdersController);
router.delete("/:orderId/delete", authMiddelware, deleteOrdersController);

export default router;
