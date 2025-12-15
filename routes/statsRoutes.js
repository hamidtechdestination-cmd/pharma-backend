import express from "express";
import {
  getDashboardStats,
  getTopProducts,
} from "../controllers/statsController.js";

const router = express.Router();

router.get("/dashboard", getDashboardStats);
router.get("/top-products", getTopProducts); // optional

export default router;
