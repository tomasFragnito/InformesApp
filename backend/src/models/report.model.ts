import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

export class Report extends Model {
    declare id: number;
    declare reason: string;
    declare note?: string;
    declare forward?: string;
    declare created_at?: Date;
}

Report.init({
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        note: {
            type: DataTypes.TEXT,
        },
        forward: {
            type: DataTypes.STRING,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, 
    {
        sequelize,
        tableName: "reports",
        modelName: "Report",
        timestamps: false,
    }
);
