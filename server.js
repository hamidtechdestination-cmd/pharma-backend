import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import purchaseRoutes from "./routes/purchaseRoutes.js";
import saleRoutes from "./routes/saleRoutes.js";
import returnRoutes from "./routes/returnRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // allow cookies / auth headers
  })
);
app.use(express.json());

// Product routes
app.use("/api/products", productRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/sale", saleRoutes);
app.use("/api/returns", returnRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/reports", reportRoutes);
// Error middleware
app.use(notFound);
app.use(errorHandler);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
