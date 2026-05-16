import { Router } from "express";
import authMiddelware from "../middleware/authMiddelware.js";
import {
  updatedCartItemController,
  removeCartItemController,
} from "../controller/cartItemController.js";

const router = Router();
router.put("/update/:id", authMiddelware, updatedCartItemController);
router.delete("/delete/:id", authMiddelware, removeCartItemController);

export default router;
