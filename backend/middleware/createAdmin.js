import express from "express";
import db from "../config/db.js";
import bcrypt from "bcryptjs";
import validator from "validator";

const router = express.Router();

const saltRounds = 10;

router.post("/", async (req, res) => {
  const { username, password, email } = req.body;
  try {
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await db.query(
      `INSERT INTO admin ( username, email, password)
       VALUES (?, ?, ?)`,
      [username, email, hashedPassword]
    );

    res
      .status(201)
      .json({ success: true, message: "Admin registered successfully." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

export default router;
