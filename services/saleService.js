// services/saleService.js

import Sale from "../models/Sale.js";
import Product from "../models/Product.js";

export const createSaleService = async (data) => {
  const { productId, quantity, salePrice } = data;

  // Check product
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  // Stock check
  if (product.stock < quantity) {
    throw new Error("Not enough stock");
  }

  const totalAmount = quantity * salePrice;

  // Create Sale
  const sale = await Sale.create({
    ...data,
    totalAmount,
  });

  // stock reduce
  product.stock -= quantity;
  await product.save();

  return sale;
};

export const getSaleService = async () => {
  return await Sale.find().populate("productId", "name price stock");
};

export const updateSaleService = async (id, data) => {
  const sale = await Sale.findById(id);
  if (!sale) throw new Error("Sale not found");

  const product = await Product.findById(sale.productId);

  // Restore old stock
  product.stock += sale.quantity;

  // Apply new sale values
  const { productId, quantity, salePrice } = data;

  if (productId !== sale.productId.toString()) {
    throw new Error("Product change is not allowed");
  }

  if (product.stock < quantity) {
    throw new Error("Not enough stock");
  }

  product.stock -= quantity;
  await product.save();

  data.totalAmount = salePrice * quantity;

  const updatedSale = await Sale.findByIdAndUpdate(id, data, { new: true });

  return updatedSale;
};

export const deleteSaleService = async (id) => {
  const sale = await Sale.findById(id);
  if (!sale) throw new Error("Sale not found");

  const product = await Product.findById(sale.productId);

  // Return stock back
  product.stock += sale.quantity;
  await product.save();

  await sale.deleteOne();

  return { message: "Sale deleted successfully" };
};
