import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

export class Report extends Model {
    declare id: number;
    declare date: string;
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
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
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
        }
    }, 
    {
        sequelize,
        modelName: "Report",
        timestamps: false
    }
);
