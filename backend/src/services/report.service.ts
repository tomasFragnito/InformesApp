import fs from "fs";
import path from "path";
import { createReportWithFile, getReportById, getFileById, findReportsWithFilesPaginated, deleteReportById } from "../repositories/report.repository";

export const saveReport = async (file: Express.Multer.File, data: any) => {
  if (!file) {
    throw new Error("Archivo requerido");
  }

  return await createReportWithFile(data, file);
};

export const getReport = async (id: number) => {
  if (isNaN(id)) {
    throw new Error("dont ID");
  }

  const report = await getReportById(id);

  return report;
};


export const getFileId = async (id: number) => {
  const file = await getFileById(id);
  if (!file) return null;

  return {
    id: file.id,
    originalName: file.filename,
    mimetype: file.mimetype,
    size: file.size,
    absolutePath: path.resolve(file.path)
  };
};

export const getFileForDownload = async (id: number) => {
  if (!id || isNaN(id)) {
    throw new Error("ID inválido");
  }

  const file = await getFileById(id);

  if (!file) {
    throw new Error("Archivo no encontrado en base de datos");
  }

  const absolutePath = path.resolve(file.path);

  if (!fs.existsSync(absolutePath)) {
    throw new Error("Archivo no existe en disco");
  }

  return {
    absolutePath,
    filename: file.filename,
    mimetype: file.mimetype,
    size: file.size,
  };
};

export const getReportsWithFilesPaginated = async (page: number) => {
  try{
    const limit = Number(process.env.LIMIT_PAGES);
    const offset = (page - 1) * limit;

    const { rows, count } = await findReportsWithFilesPaginated(limit, offset);

    const totalPages = Math.max(1, Math.ceil(count / limit)); //garantiza que siempre sea 1 pagina aunque no hayan reportes en la bd

    return {
      data: rows,
      page,
      limit,
      total: count,
      totalPages,
    };
  }
  catch(error){
    console.error("error de paginacion:"+error);
    throw error;
  }
};

export const deleteReportService = async (data: any) => {
  if (!data) {
    throw new Error("id requerido");
  }

  return await deleteReportById(data);
};