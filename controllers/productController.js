import productService from "../services/productService.js";

// Create Product
export const createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// Get All Products
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// Get Single Product
export const getProductById = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// Update Product (❌ stock blocked)
export const updateProduct = async (req, res, next) => {
  try {
    // 🔒 EXTRA SAFETY
    delete req.body.stock;

    const updated = await productService.updateProduct(
      req.params.id,
      req.body
    );

    if (!updated)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

// Delete Product
export const deleteProduct = async (req, res, next) => {
  try {
    const deleted = await productService.deleteProduct(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};
