// middlewares/purchaseValidator.js

export const validatePurchase = (req, res, next) => {
  const { productId, supplierName, quantity, purchasePrice } = req.body;

  if (!productId) return res.status(400).json({ message: "Product ID missing" });
  if (!supplierName) return res.status(400).json({ message: "Supplier name required" });
  if (!quantity || quantity <= 0)
    return res.status(400).json({ message: "Quantity must be greater than 0" });
  if (!purchasePrice || purchasePrice <= 0)
    return res.status(400).json({ message: "Purchase price must be greater than 0" });

  next();
};
