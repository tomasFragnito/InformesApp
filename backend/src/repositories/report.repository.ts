import { Report, File, ReportFile } from "../models";

export const createReportWithFile = async ( data: any, file: Express.Multer.File) => {
  try {
    const report = await Report.create({
      reason: data.reason,
      note: data.note,
      forward: data.forward,
    });

    const savedFile = await File.create({
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype,
      size: file.size,
    });

    await ReportFile.create({
      reportId: report.id,
      fileId: savedFile.id,
    });

    return report;
  } 
  catch (err) {
    console.error("ERROR SQL:", err);
    throw err;
  }
};

export const getReportById = async ( id: number) => {
  try {
    const report = await Report.findByPk(id);

    return report;
  } 
  catch (err) {
    console.error("ERROR SQL:", err);
    throw err;
  }
};

export const getFileById  = async (id: number) => {

  try {
    return await File.findByPk(id, {
      attributes: ["id", "filename", "size", "path"]
    });
  } 
  catch (err) {
    console.error("ERROR SQL:", err);
    throw err;
  }

};

export const findReportsWithFilesPaginated = async (limit: number, offset: number) => {
    return await Report.findAndCountAll({
      limit,
      offset,
      order: [["id", "ASC"]],
      include: [
        {
          model: File,
          attributes: ["id", "filename", "size", "mimetype"],
          through: { attributes: [] }
        }
      ]
  });
};

//se obtiene la instancia y luego se borra, esto para armar un registro de borrado
export const deleteReportById = async ( id: number) => {
  try {
    const report = await Report.findByPk(id);

    if (!report) {
      throw new Error("Report not found");
    }

    await ReportFile.destroy({
      where: { reportId: id }
    });

    await report.destroy();

    return true;
  } 
  catch (err) {
    console.error("ERROR SQL:", err);
    throw err;
  }
};
