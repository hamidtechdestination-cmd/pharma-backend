import Sale from "../models/Sale.js";
import Purchase from "../models/Purchase.js";
import Return from "../models/Return.js";

/* ------------------ DATE FILTER ------------------ */
const getDateMatch = (from, to) => {
  const match = {};
  if (from || to) {
    match.createdAt = {};
    if (from) match.createdAt.$gte = new Date(from);
    if (to) match.createdAt.$lte = new Date(to);
  }
  return match;
};

/* ------------------ SALES AGGREGATION ------------------ */
const salesAggregation = async (groupBy, match) => {
  return await Sale.aggregate([
    { $match: match },
    {
      $group: {
        _id: groupBy,
        totalSales: { $sum: "$totalAmount" },
      },
    },
  ]);
};

/* ------------------ PURCHASE AGGREGATION ------------------ */
const purchaseAggregation = async (groupBy, match) => {
  return await Purchase.aggregate([
    { $match: match },
    {
      $group: {
        _id: groupBy,
        totalPurchase: { $sum: "$totalCost" },
      },
    },
  ]);
};

/* ------------------ RETURN AGGREGATION ------------------ */
const returnAggregation = async (groupBy, match) => {
  return await Return.aggregate([
    { $match: match },
    {
      $group: {
        _id: groupBy,
        totalReturns: { $sum: "$quantity" },
      },
    },
  ]);
};

/* ------------------ GROUP BY BUILDER ------------------ */
const getGroupBy = (type) => {
  switch (type) {
    case "daily":
      return {
        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
      };

    case "weekly":
      return {
        year: { $year: "$createdAt" },
        week: { $week: "$createdAt" },
      };

    case "monthly":
      return {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" },
      };

    case "yearly":
      return {
        year: { $year: "$createdAt" },
      };

    default:
      throw new Error("Invalid report type");
  }
};

/* ------------------ FINAL REPORT SERVICE ------------------ */
export const generateReportService = async ({ type, from, to }) => {
  const match = getDateMatch(from, to);
  const groupBy = getGroupBy(type);

  const sales = await salesAggregation(groupBy, match);
  const purchases = await purchaseAggregation(groupBy, match);
  const returns = await returnAggregation(groupBy, match);

  const reportMap = {};

  sales.forEach((s) => {
    reportMap[JSON.stringify(s._id)] = {
      period: s._id,
      totalSales: s.totalSales,
      totalPurchase: 0,
      totalReturns: 0,
      profit: 0,
    };
  });

  purchases.forEach((p) => {
    const key = JSON.stringify(p._id);
    if (!reportMap[key]) {
      reportMap[key] = {
        period: p._id,
        totalSales: 0,
        totalPurchase: 0,
        totalReturns: 0,
        profit: 0,
      };
    }
    reportMap[key].totalPurchase = p.totalPurchase;
  });

  returns.forEach((r) => {
    const key = JSON.stringify(r._id);
    if (!reportMap[key]) {
      reportMap[key] = {
        period: r._id,
        totalSales: 0,
        totalPurchase: 0,
        totalReturns: 0,
        profit: 0,
      };
    }
    reportMap[key].totalReturns = r.totalReturns;
  });

  Object.values(reportMap).forEach((r) => {
    r.profit = r.totalSales - r.totalPurchase;
  });

  return Object.values(reportMap);
};
