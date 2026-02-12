import express from "express"; 
import fs from "fs";
import path from "path";
import "./models";
import sequelize from "./config/db";
import cors from "cors";
import reportRoutes from "./routes/report.route";

//const DNS = process.env.DNS;

sequelize.sync({ alter: true });

const app = express();
app.use(express.json())

/*
app.use(cors({
  origin: "https://fragapp.duckdns.org",
  methods: ["POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
*/

app.use(cors());

app.use("/api", reportRoutes);

const uploadDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use((req, _res, next) => {
  console.log(req.method, req.path);
  next();
});

export default app;