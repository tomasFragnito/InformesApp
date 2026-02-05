import nodemailer from "nodemailer";

export interface MailData {
  to: string;
  reason: string;
  note: string;
  file?: Express.Multer.File; 
}

export const sendEmailService = async ({ to, reason, note, file }: MailData) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const attachments = file
    ? [
        {
          filename: file.originalname,
          path: file.path,
        },
      ]
    : [];

  const info = await transporter.sendMail({
    from: `"InfoApp" <${process.env.MAIL_USER}>`,
    to,
    subject: reason,
    text: note,
    html: `<b>${note}</b>`,
    attachments,
  });

  console.log("Email enviado:", info.messageId);
};
