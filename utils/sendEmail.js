import nodemailer from 'nodemailer';

export const sendEmail = async ({ email, subject, text }) => {
  
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Bidly Team" <${process.env.SMTP_USERNAME}>`,
      to: email,
      subject,
      text,
    });

  } catch (error) {
    console.error("Failed to send email:", error);
  }
};
