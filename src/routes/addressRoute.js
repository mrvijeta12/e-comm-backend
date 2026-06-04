import { Router } from "express";
import {
  deleteAddressesController,
  getAddressesController,
  getAllAddressesController,
  updateAddressesController,
} from "../controller/addressController.js";
import authMiddelware from "../middleware/authMiddelware.js";

const router = Router();

router.get("/", authMiddelware, getAllAddressesController);
router.get("/:id", authMiddelware, getAddressesController);
router.put("/:id", authMiddelware, updateAddressesController);
router.delete("/:id", authMiddelware, deleteAddressesController);

export default router;
