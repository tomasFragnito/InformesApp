import { Express } from "express";
import { createReportWithFile } from "../repositories/report.repository";

export const saveReport = async (file: Express.Multer.File, data: any) => {
    if (!file) {
        throw new Error("Archivo requerido");
    }

    return await createReportWithFile(data, file);
};
