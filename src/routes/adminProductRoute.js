import { Router } from "express";
import authMiddelware from "../middleware/authMiddelware.js";
import {
  createMultipleProductController,
  createProductController,
  deleteProductController,
  updateProductController,
} from "../controller/productController.js";

const router = Router();
router.post("/", authMiddelware, createProductController);
router.post("/created", authMiddelware, createMultipleProductController);
router.put("/update/:id", authMiddelware, updateProductController);
router.delete("/delete/:id", authMiddelware, deleteProductController);

export default router;
