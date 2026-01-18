import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

export class File extends Model {
    declare id: number;
    declare filename: string;
    declare path: string;
    declare mimetype: string;
    declare size: number;
}

File.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mimetype: {
        type: DataTypes.STRING,
    },
    size: {
        type: DataTypes.INTEGER,
    },
}, {
    sequelize,
    modelName: "File",
    timestamps: false
});
