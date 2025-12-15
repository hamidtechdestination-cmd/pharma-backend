// routes/saleRoutes.js

import express from "express";
import {
  addSale,
  getSales,
  updateSale,
  deleteSale,
} from "../controllers/saleController.js";

import { validateSale } from "../middlewares/saleValidator.js";

const router = express.Router();

router.post("/", validateSale, addSale);
router.get("/", getSales);
router.put("/:id", validateSale, updateSale);
router.delete("/:id", deleteSale);

export default router;
