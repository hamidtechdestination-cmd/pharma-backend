import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { validateProduct } from "../middlewares/productValidator.js";

const router = express.Router();

router.post("/", validateProduct, createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", validateProduct, updateProduct);
router.delete("/:id", deleteProduct);

export default router;
