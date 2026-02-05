import path from "path";
import { Request, Response } from "express";
import { getFileId } from "../services/report.service";

export const getFileLink = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const DNS = process.env.DNS;

  const file = await getFileId(id);
  if (!file) return res.sendStatus(404);

  res.json({
    id: file.id,
    filename: file.originalName,
    size: file.size,
    downloadUrl: DNS+"/api/files/download/"+file.id
  });
};

export const downloadFile = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const file = await getFileId(id);
  if (!file) return res.sendStatus(404);

  res.setHeader("Content-Type", file.mimetype || "application/octet-stream"); // "application/octet-stream" es -> “Esto es un archivo binario, no sé de qué tipo”
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${encodeURIComponent(file.originalName)}"`,
  );

  return res.sendFile(path.resolve(file.absolutePath));
};