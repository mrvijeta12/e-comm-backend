import { Router } from "express";
import {
  getAllUsersController,
  getUserAddressesController,
  getUserProfile,
} from "../controller/userController.js";
import authMiddelware from "../middleware/authMiddelware.js";

const router = Router();
router.get("/profile", authMiddelware, getUserProfile);
router.get("/", authMiddelware, getAllUsersController);
router.get("/:id/addresses", authMiddelware, getUserAddressesController);

export default router;
