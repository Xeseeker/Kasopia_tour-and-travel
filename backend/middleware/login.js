import express from "express";
import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    let query = `SELECT * FROM admin WHERE username = ?`;

    const [rows] = await db.query(query, [username]);

    if (rows.length > 0) {
      const user = rows[0];
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign(
          { username: user.username },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        console.log(user);
        return res.status(200).json({
          success: true,
          message: "Login successful",
          user,
          token: token,
        });
      }
    }
    return res
      .status(401)
      .json({ success: false, message: "Invalid username or password" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" + error });
  }
});

export default router;
