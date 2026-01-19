import multer from "multer";
import path from "path";

const LOCATION = process.env.LOCATION;

if (!LOCATION) {
  throw new Error("LOCATION no esta definida en el .env");
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, LOCATION); //vincualcion con el server
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, filename);
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 200000,
  },
  fileFilter: (_req, file, cb) => {
    const allowed = [
        "image/jpeg",
        "image/png",
        "application/pdf",
        "application/msword", // .doc
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
        "application/vnd.ms-excel", // .xls
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" // .xlsx
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Tipo de archivo no permitido"));
    }
  },
});