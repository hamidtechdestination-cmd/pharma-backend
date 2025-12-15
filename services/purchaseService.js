// // services/purchaseService.js
// import Purchase from "../models/Purchase.js";
// import Product from "../models/Product.js";

// // ADD PURCHASE
// export const addPurchaseService = async (data) => {
//   const { productId, quantity, purchasePrice, supplierName } = data;

//   const product = await Product.findById(productId);
//   if (!product) throw new Error("Product not found");

//   const totalCost = quantity * purchasePrice;

//   const purchase = await Purchase.create({
//     productId,
//     supplierName,
//     quantity,
//     purchasePrice,
//     totalCost,
//   });

//   product.stock += quantity;
//   await product.save();

//   return purchase;
// };

// // GET ALL PURCHASES
// export const getAllPurchasesService = async () => {
//   return await Purchase.find().populate("productId", "name price stock");
// };

// // UPDATE PURCHASE
// export const updatePurchaseService = async (id, newData) => {
//   const oldPurchase = await Purchase.findById(id);
//   if (!oldPurchase) throw new Error("Purchase not found");

//   const product = await Product.findById(oldPurchase.productId);
//   if (!product) throw new Error("Product not found");

//   const oldQty = oldPurchase.quantity;
//   const newQty = newData.quantity;

//   if (newQty > oldQty) {
//     product.stock += newQty - oldQty;
//   } else if (newQty < oldQty) {
//     product.stock -= oldQty - newQty;
//   }

//   await product.save();

//   newData.totalCost = newQty * newData.purchasePrice;

//   return await Purchase.findByIdAndUpdate(id, newData, { new: true });
// };

// // DELETE PURCHASE
// export const deletePurchaseService = async (id) => {
//   const purchase = await Purchase.findById(id);
//   if (!purchase) throw new Error("Purchase not found");

//   const product = await Product.findById(purchase.productId);
//   if (!product) throw new Error("Product not found");

//   product.stock -= purchase.quantity;
//   await product.save();

//   await Purchase.findByIdAndDelete(id);

//   return { message: "Purchase deleted and stock adjusted" };
// };




import Purchase from "../models/Purchase.js";
import Product from "../models/Product.js";

/**
 * =========================
 * ADD PURCHASE
 * =========================
 */
export const addPurchaseService = async (data) => {
  const { productId, quantity, purchasePrice, supplierName } = data;

  const totalCost = quantity * purchasePrice;

  // 1️⃣ Create purchase
  const purchase = await Purchase.create({
    productId,
    supplierName,
    quantity,
    purchasePrice,
    totalCost,
  });

  // 2️⃣ Increase stock safely
  await Product.findByIdAndUpdate(
    productId,
    { $inc: { stock: quantity } },
    { new: true }
  );

  return purchase;
};

/**
 * =========================
 * GET ALL PURCHASES
 * =========================
 */
export const getAllPurchasesService = async () => {
  return await Purchase.find().populate("productId", "name price stock");
};

/**
 * =========================
 * UPDATE PURCHASE
 * =========================
 */
export const updatePurchaseService = async (id, newData) => {
  const oldPurchase = await Purchase.findById(id);
  if (!oldPurchase) throw new Error("Purchase not found");

  const oldQty = oldPurchase.quantity;
  const newQty = newData.quantity;

  // 🔁 Difference calculate karo
  const diff = newQty - oldQty;

  // 1️⃣ Update stock using $inc
  if (diff !== 0) {
    await Product.findByIdAndUpdate(
      oldPurchase.productId,
      { $inc: { stock: diff } }
    );
  }

  // 2️⃣ Update total cost
  newData.totalCost = newQty * newData.purchasePrice;

  // 3️⃣ Update purchase record
  return await Purchase.findByIdAndUpdate(id, newData, { new: true });
};

/**
 * =========================
 * DELETE PURCHASE
 * =========================
 */
export const deletePurchaseService = async (id) => {
  const purchase = await Purchase.findById(id);
  if (!purchase) throw new Error("Purchase not found");

  // 1️⃣ Decrease stock safely
  await Product.findByIdAndUpdate(
    purchase.productId,
    { $inc: { stock: -purchase.quantity } }
  );

  // 2️⃣ Delete purchase
  await Purchase.findByIdAndDelete(id);

  return { message: "Purchase deleted and stock adjusted" };
};
