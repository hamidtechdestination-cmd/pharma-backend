// controllers/saleController.js

import {
  createSaleService,
  getSaleService,
  updateSaleService,
  deleteSaleService,
} from "../services/saleService.js";

export const addSale = async (req, res) => {
  try {
    const sale = await createSaleService(req.body);
    res.status(201).json(sale);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getSales = async (req, res) => {
  try {
    const sales = await getSaleService();
    res.json(sales);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateSale = async (req, res) => {
  try {
    const sale = await updateSaleService(req.params.id, req.body);
    res.json(sale);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteSale = async (req, res) => {
  try {
    const result = await deleteSaleService(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
