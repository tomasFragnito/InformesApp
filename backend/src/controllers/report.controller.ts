import { Request, Response } from "express";
import { saveReport, getReport, getFileId, deleteReportService } from "../services/report.service";
import { sendMailInternal } from "./mail.controller";

export const uploadReport = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Archivo requerido" });
    }

    const report = await saveReport(req.file, req.body);

    if(report){
      try {
        await sendMailInternal(req.body.forward, req.body.reason, req.body.note, req.file);
      } catch(err) {
        console.error("No se pudo enviar el email:", err);
      }
    }

    res.status(201).json(report);

  } catch (err) {
    console.error("Error al subir reporte:", err);
    res.status(500).json({ error: "Error al subir reporte" });
  }
}

export const returnReport = async (req: Request, res: Response) => {

  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  const report = await getReport(id);
  if (!report) return res.sendStatus(404);

  res.json(report);
};

export const deleteReport = async (req: Request, res: Response) => {

  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  const report = await deleteReportService(id);
  if (!report) return res.sendStatus(404);

  res.json(report);
};


