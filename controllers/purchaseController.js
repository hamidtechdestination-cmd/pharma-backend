// controllers/purchaseController.js
import {
  addPurchaseService,
  getAllPurchasesService,
  updatePurchaseService,
  deletePurchaseService,
} from "../services/purchaseService.js";

export const addPurchase = async (req, res) => {
  try {
    const result = await addPurchaseService(req.body);
    res.status(201).json({ success: true, purchase: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getPurchases = async (req, res) => {
  try {
    const purchases = await getAllPurchasesService();
    res.status(200).json({ success: true, purchases });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updatePurchase = async (req, res) => {
  try {
    const updated = await updatePurchaseService(req.params.id, req.body);
    res.status(200).json({ success: true, updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deletePurchase = async (req, res) => {
  try {
    const result = await deletePurchaseService(req.params.id);
    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
