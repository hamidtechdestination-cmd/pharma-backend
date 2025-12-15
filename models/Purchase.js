// models/Purchase.js
import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    supplierName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    purchasePrice: {
      type: Number,
      required: true,
    },
    totalCost: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Purchase", PurchaseSchema);
