import { createTransport } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 *
 * @param {string} to - Recipient's email address
 * @param {string} otp - Unique OTP to be sent
 */
const sendMail = async (to, otp) => {
  const info = await transporter.sendMail({
    from: `"Artificial Intelligence Hub" <${process.env.EMAIL_USER}>`,
    to,
    subject: "OTP verification",
    text: "Please use the following OTP to verify your email",
    html: `
    <html>
      <div>
        <p>Please use the following OTP to verify your email.</p>
        <h1>${otp}</h1>
        <p>OTP is valid for 5 minutes</p>
        <p>Do not share this OTP with anyone</p>
      </div>
    </html>
    `,
  });
};

export { sendMail };
