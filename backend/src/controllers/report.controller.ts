import { Request, Response } from "express";
import { saveReport } from "../services/report.service";

export const uploadReport = async (req: Request, res: Response) => {

    if (!req.file) {
      return res.status(400).json({ message: "Archivo requerido" });
    }

    const report = await saveReport(req.file, req.body);
    res.status(201).json(report);
};

export const returnReport = async (req: Request, res: Response) => {


    res.status(201);
};

