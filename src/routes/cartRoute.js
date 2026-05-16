import { Router } from "express";
import authMiddelware from "../middleware/authMiddelware.js";
import {
  findUserCartController,
  addItemToCartController,
} from "../controller/cartController.js";

const router = Router();
router.get("/", authMiddelware, findUserCartController);
router.post("/add", authMiddelware, addItemToCartController);

export default router;
