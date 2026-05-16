import { Router } from "express";
import {
  getAllUsersController,
  getUserProfile,
} from "../controller/userController.js";
import authMiddelware from "../middleware/authMiddelware.js";

const router = Router();
router.get("/profile", authMiddelware, getUserProfile);
router.get("/", authMiddelware, getAllUsersController);

export default router;
