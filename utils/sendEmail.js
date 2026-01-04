import nodemailer from 'nodemailer';

export const sendEmail = async ({ email, subject, text }) => {
  
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"BidXpress" <shamim401897@gmail.com>`,
      to: email,
      subject,
      text,
    });

  } catch (error) {
    console.error("Failed to send email:", error);
  }
};
