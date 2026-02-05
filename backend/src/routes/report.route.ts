import { Router } from "express";
import { upload } from "../middlewares/upload.middleware";
import { validateReport } from "../middlewares/validation.middleware";
import { uploadReport, returnReport, deleteReport } from "../controllers/report.controller";
import { getFileLink, downloadFile } from "../controllers/download.controller";
import { getReportsPaginated } from "../controllers/paginated.controller";

const router = Router()

router.post("/reports", upload.single("file"), validateReport , uploadReport );

router.get("/reports/pag", getReportsPaginated);
router.get("/reports/:id", returnReport);

router.get("/files/:id", getFileLink );
router.get("/files/download/:id", downloadFile);

router.delete("/reports/:id", deleteReport);

export default router;