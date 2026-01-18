import { Router } from "express";
import { upload } from "../middlewares/upload.middleware";
import { uploadReport } from "../controllers/report.controller";

const router = Router()

router.post("/", upload.single("file"), uploadReport );

export default router;