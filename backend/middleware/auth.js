// import jwt from "jsonwebtoken";
// import db from "../config/db.js";

// export const authAdmin = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res
//         .status(401)
//         .json({ success: false, message: "No token, authorization denied" });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const [rows] = await db.query("SELECT * FROM admin WHERE username = ?", [
//       decoded.username,
//     ]);

//     // Exclude password before returning
//     const user = rows[0];
//     if (user) {
//       delete user.password;
//     }

//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }
//     req.user = user; // Attach the user
//     next();
//   } catch (error) {
//     console.error("Auth error:", error.message);
//     return res
//       .status(401)
//       .json({ success: false, message: "Invalid token or session expired" });
//   }
// };

import jwt from "jsonwebtoken";
import db from "../config/db.js";

export const authAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid or expired token",
      });
    }

    const [rows] = await db.query(
      "SELECT id, username, email FROM admin WHERE username = ?",
      [decoded.username]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Admin not found",
      });
    }

    req.admin = rows[0]; // attach admin safely
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during authentication",
    });
  }
};
