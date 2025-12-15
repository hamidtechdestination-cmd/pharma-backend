import Sale from "../models/Sale.js";
import Purchase from "../models/Purchase.js";
import Return from "../models/Return.js";

// Total Sales Amount
export const getTotalSales = async () => {
  const result = await Sale.aggregate([
    {
      $group: {
        _id: null,
        totalSales: { $sum: "$totalAmount" }, // FIXED
      },
    },
  ]);
  return result[0]?.totalSales || 0;
};

// Total Purchase Amount
export const getTotalPurchases = async () => {
  const result = await Purchase.aggregate([
    {
      $group: {
        _id: null,
        totalPurchase: { $sum: "$totalCost" }, // FIXED
      },
    },
  ]);
  return result[0]?.totalPurchase || 0;
};

// Total Returns
export const getTotalReturns = async () => {
  const result = await Return.aggregate([
    {
      $group: {
        _id: null,
        totalReturns: { $sum: "$quantity" },
      },
    },
  ]);
  return result[0]?.totalReturns || 0;
};

// Profit
export const getProfit = async () => {
  const totalSales = await getTotalSales();
  const totalPurchase = await getTotalPurchases();
  return totalSales - totalPurchase;
};

// Optional: Top Selling Products
export const getTopSellingProducts = async () => {
  return await Sale.aggregate([
    {
      $group: {
        _id: "$productId",
        totalQty: { $sum: "$quantity" },
      },
    },
    { $sort: { totalQty: -1 } },
    { $limit: 5 },
  ]);
};
