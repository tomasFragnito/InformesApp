import { Request, Response } from "express";
import { sendEmailService } from "../services/mail.service";

export const sendMailInternal = async (
  forward: string,
  reason: string,
  note: string,
  file?: Express.Multer.File
) => {
  try {
    if (!forward) throw new Error("Email destinatario requerido");

    // Llamada correcta
    await sendEmailService({ to: forward, reason, note, file: file! });

  } catch (err) {
    console.error("Error al enviar email:", err);
    throw err; // para que se pueda loggear en uploadReport
  }
};
