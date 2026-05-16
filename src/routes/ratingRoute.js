import { Router } from "express";
import authMiddelware from "../middleware/authMiddelware.js";
import {
  createRatingController,
  getAllRatingController,
} from "../controller/ratingController.js";

const router = Router();
router.get("/product/:productId", authMiddelware, getAllRatingController);
router.post("/create", authMiddelware, createRatingController);

export default router;
