// models/Sale.js
import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    salePrice: {
      type: Number,
      required: true,
      min: 1,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    customerName: {
      type: String,
      require:true

    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Sale", saleSchema);
