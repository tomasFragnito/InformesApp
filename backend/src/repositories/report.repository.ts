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
