import { Router } from "express";
import authMiddelware from "../middleware/authMiddelware.js";
import {
  findProductByIdController,
  getAllProductController,
} from "../controller/productController.js";

const router = Router();
// router.get("/", authMiddelware, getAllProductController);
// router.get("/id/:id", authMiddelware, findProductByIdController);
router.get("/", getAllProductController);
router.get("/id/:id", findProductByIdController);

export default router;
