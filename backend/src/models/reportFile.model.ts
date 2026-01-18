import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

export class ReportFile extends Model {
  declare reportId: number;
  declare fileId: number;
}

ReportFile.init(
  {
    reportId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "Reports",
        key: "id",
      },
    },
    fileId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "Files",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "ReportFile",
    tableName: "report_files",
    timestamps: true,
    createdAt: false,
    updatedAt: "updatedAt"
  }
);
