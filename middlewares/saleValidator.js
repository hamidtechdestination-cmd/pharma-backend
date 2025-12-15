// middlewares/saleValidator.js

export const validateSale = (req, res, next) => {
  const { productId, quantity, salePrice, customerName } = req.body;

  if (!productId || !quantity || !salePrice || !customerName) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (quantity <= 0 || salePrice <= 0) {
    return res
      .status(400)
      .json({ message: "Quantity and Sale Price must be greater than zero" });
  }

  next();
};
