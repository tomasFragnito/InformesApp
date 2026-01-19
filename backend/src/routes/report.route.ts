import { Router } from "express";
import { upload } from "../middlewares/upload.middleware";
import { validateReport } from "../middlewares/validation.middleware";
import { uploadReport } from "../controllers/report.controller";

const router = Router()

router.post("/", upload.single("file"), validateReport , uploadReport );

export default router;