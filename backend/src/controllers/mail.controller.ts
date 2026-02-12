import { Request, Response } from "express";
import { sendEmailService } from "../services/mail.service";

export const sendMailInternal = async (
  email: string | undefined,
  reason: string,
  note: string,
  file?: Express.Multer.File
) => {
  if (!email || email.trim() === "") {
    return;
  }

  try {
    await sendEmailService({
      to: email,
      reason,
      note,
      file: file!
    });
  } catch (err) {
    console.error("Error al enviar email:", err);
  }
};
