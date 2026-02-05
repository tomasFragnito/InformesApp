import { Request, Response } from "express";
import { getFileForDownload, getReportsWithFilesPaginated } from "../services/report.service";

export const getReportsPaginated = async (req: Request, res: Response) => {
  const pageRaw = req.query.page;
  const page = Number(req.query.page) || 1;

  if (!pageRaw || isNaN(page) || page < 1) {
    return res.status(400).json({ message: "Página inválida" });
  }

  const result = await getReportsWithFilesPaginated(page);
  res.status(200).json(result);
};
