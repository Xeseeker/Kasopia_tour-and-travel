import db from "../config/db.js";
import { v2 as cloudinary } from "cloudinary";

const fetchPhoto = async (req, res) => {
  try {
    // Fetch all photos from DB
    const [rows] = await db.query(
      "SELECT id, title, image_url FROM gallery ORDER BY id DESC"
    );

    res.json({
      success: true,
      photos: rows,
    });
  } catch (error) {
    console.error("Fetch photo error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const fetchBlog = async (req, res) => {
  try {
    // Fetch all photos from DB
    const [rows] = await db.query(
      "SELECT id, title,description, image_url FROM blog ORDER BY id DESC"
    );

    res.json({
      success: true,
      photos: rows,
    });
  } catch (error) {
    console.error("Fetch blog error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const fetchCertificate = async (req, res) => {
  try {
    // Fetch all photos from DB
    const [rows] = await db.query(
      "SELECT id, name, image_url FROM certificates ORDER BY id DESC"
    );

    res.json({
      success: true,
      photos: rows,
    });
  } catch (error) {
    console.error("Fetch certificate error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export { fetchBlog, fetchCertificate, fetchPhoto };
