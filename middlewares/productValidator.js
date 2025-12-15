export const validateProduct = (req, res, next) => {
  const { name, category, price } = req.body;

  if (!name || !category || price == null) {
    return res.status(400).json({ message: "Name, category, and price are required" });
  }

  if (price < 0) {
    return res.status(400).json({ message: "Price cannot be negative" });
  }

  next();
};
