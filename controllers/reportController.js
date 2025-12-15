import { generateReportService } from "../services/reportService.js";

export const getReports = async (req, res) => {
  try {
    const { type, from, to } = req.query;

    if (!type) {
      return res.status(400).json({ message: "Report type is required" });
    }

    const report = await generateReportService({ type, from, to });

    res.status(200).json({
      success: true,
      type,
      count: report.length,
      data: report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
