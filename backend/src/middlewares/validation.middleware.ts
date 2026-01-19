import { Request, Response, NextFunction } from "express";

export const validateReport = (req:Request, res:Response, next:NextFunction) => {
    const { reason, note, forward } = req.body;
    const file = req.file;

    // Motivo
    if (!reason || reason.trim().length < 3) {
        return res.status(400).json({ error: "Motivo inválido" });
    }

    // Archivo
    if (!file) {
        return res.status(400).json({ error: "Archivo requerido" });
    }

    // MIME real (no extensión)
    const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];
    if (!allowedTypes.includes(file.mimetype)) {
        return res.status(400).json({ error: "Tipo de archivo no permitido" });
    }

    // Nota (opcional)
    if (note && note.length > 500) {
        return res.status(400).json({ error: "Nota demasiado larga" });
    }

    // Email (opcional)
    if (forward && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forward)) {
        return res.status(400).json({ error: "Email inválido" });
    }

    //return res.status(201).json({ ok: true });
    next();
};
