import * as statsService from "../services/statsService.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalSales = await statsService.getTotalSales();
    const totalPurchase = await statsService.getTotalPurchases();
    const totalReturns = await statsService.getTotalReturns();
    const profit = await statsService.getProfit();

    res.json({
      totalSales,
      totalPurchase,
      totalReturns,
      profit,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load dashboard stats",
      error: error.message,
    });
  }
};

// Optional
export const getTopProducts = async (req, res) => {
  try {
    const products = await statsService.getTopSellingProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
