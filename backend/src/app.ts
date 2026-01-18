import express from "express"; 
import "./models";
import sequelize from "./config/db";
import cors from "cors";
import reportRoutes from "./routes/report.route";

sequelize.sync({ alter: true });

const app = express();
app.use(express.json())

app.use(cors());
app.use("/reports", reportRoutes);

app.use((req, _res, next) => {
  console.log(req.method, req.path);
  next();
});

export default app;