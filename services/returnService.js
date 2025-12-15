import Return from "../models/Return.js";
import Product from "../models/Product.js";

// ➕ Add Return
export const createReturn = async (data) => {
  const product = await Product.findById(data.product);
  if (!product) throw new Error("Product not found");

  // Stock increase
  product.stock += data.quantity;
  await product.save();

  return await Return.create(data);
};

// 📄 Get All Returns
export const getAllReturns = async () => {
  return await Return.find().populate("product", "name stock");
};

// ✏️ Update Return
export const updateReturn = async (id, newData) => {
  const oldReturn = await Return.findById(id);
  if (!oldReturn) throw new Error("Return not found");

  const product = await Product.findById(oldReturn.product);

  // Revert old stock
  product.stock -= oldReturn.quantity;

  // Apply new stock
  product.stock += newData.quantity;

  await product.save();

  return await Return.findByIdAndUpdate(id, newData, { new: true });
};

// ❌ Delete Return
export const deleteReturn = async (id) => {
  const ret = await Return.findById(id);
  if (!ret) throw new Error("Return not found");

  const product = await Product.findById(ret.product);

  // Revert stock
  product.stock -= ret.quantity;
  await product.save();

  await ret.deleteOne();
};
