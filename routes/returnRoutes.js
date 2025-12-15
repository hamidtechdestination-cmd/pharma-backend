import express from "express";
import {
  addReturn,
  getReturns,
  editReturn,
  removeReturn,
} from "../controllers/returnController.js";

const router = express.Router();

router.post("/", addReturn);
router.get("/", getReturns);
router.put("/:id", editReturn);
router.delete("/:id", removeReturn);

export default router;
