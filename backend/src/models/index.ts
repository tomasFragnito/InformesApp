import { Report } from "./report.model";
import { File } from "./file.model";
import { ReportFile } from "./reportFile.model";

Report.belongsToMany(File, {
    through: ReportFile,
    foreignKey: "reportId",
});

File.belongsToMany(Report, {
    through: ReportFile,
    foreignKey: "fileId",
});

export { Report, File, ReportFile };
