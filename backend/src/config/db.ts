import { Sequelize } from "sequelize";

const sequelize = new Sequelize(String(process.env.DB_SQL),
    {
        dialect: "mysql",
        logging: false
    }
);

export default sequelize;
