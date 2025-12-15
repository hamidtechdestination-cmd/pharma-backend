import * as returnService from "../services/returnService.js";

// ➕ Add Return
export const addReturn = async (req, res) => {
  try {
    const result = await returnService.createReturn(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 📄 Get Returns
export const getReturns = async (req, res) => {
  try {
    const result = await returnService.getAllReturns();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✏️ Update Return
export const editReturn = async (req, res) => {
  try {
    const result = await returnService.updateReturn(
      req.params.id,
      req.body
    );
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ❌ Delete Return
export const removeReturn = async (req, res) => {
  try {
    await returnService.deleteReturn(req.params.id);
    res.json({ message: "Return deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
