import express from "express"; 
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

app.use(cors({
  origin: ["http://127.0.0.1:5500"], 
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
}));

app.use("/api", reportRoutes);

app.use((req, _res, next) => {
  console.log(req.method, req.path);
  next();
});

export default app;