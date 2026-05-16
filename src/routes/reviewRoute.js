import { Router } from "express";
import authMiddelware from "../middleware/authMiddelware.js";
import {
  createReviewController,
  getAllReviewController,
} from "../controller/reviewController.js";

const router = Router();
router.get("/product/:productId", authMiddelware, getAllReviewController);
router.post("/create", authMiddelware, createReviewController);

export default router;
