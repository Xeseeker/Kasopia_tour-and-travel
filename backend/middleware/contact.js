import nodemailer from "nodemailer";
import express from "express";

const router = express.Router();

// EMAIL_USER = "kasopiaethiopiatour@gmail.com";
const EMAIL_PASS = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/", async (req, res) => {
  const { name, email, message, travelMonth, groupSize, interest } = req.body;

  // ✅ Fix: missing logical OR operators
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await transporter.sendMail({
      // ✅ Fix: template string syntax
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: "New Contact Message",
      html: `
        <h3>New message from website</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Number of person:</strong> ${groupSize}</p>
        <p><strong>Month:</strong> ${travelMonth}</p>
        <p><strong>Interested trip:</strong> ${interest}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;
