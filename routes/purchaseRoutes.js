// routes/purchaseRoutes.js
import express from "express";
import {
  addPurchase,
  getPurchases,
  updatePurchase,
  deletePurchase,
} from "../controllers/purchaseController.js";

import { validatePurchase } from "../middlewares/purchaseValidator.js";

const router = express.Router();

router.post("/", validatePurchase, addPurchase);
router.get("/", getPurchases);
router.put("/:id", validatePurchase, updatePurchase);
router.delete("/:id", deletePurchase);

export default router;
