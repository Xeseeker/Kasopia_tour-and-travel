import bcrypt from "bcryptjs";
import db from "../config/db.js";
import { v2 as cloudinary } from "cloudinary";

// const addPhoto = async (req, res) => {
//   try {
//     const { title } = req.body;
//     const image = req.files.image;

//     if (!image) {
//       return res.status(400).json({ error: "No image uploaded" });
//     }

//     // Upload to Cloudinary
//     const result = await cloudinary.uploader.upload(image.tempFilePath, {
//       resource_type: "image",
//       folder: "tour_gallery",
//     });

//     const imageUrl = result.secure_url;

//     // Insert into MySQL
//     const sql = "INSERT INTO gallery (title, image_url) VALUES (?, ?)";

//     db.query(sql, [title, imageUrl], (err, data) => {
//       if (err) return res.status(500).json({ error: "DB Error", details: err });

//       return res.status(200).json({
//         success: true,
//         message: "Image uploaded and saved to DB",
//         data: { id: data.insertId, title, imageUrl },
//       });
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Upload failed" });
//   }
// };

const addPhoto = async (req, res) => {
  try {
    const { title } = req.body;

    if (!req.files || !req.files.photo) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const photo = req.files.photo;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(photo.tempFilePath, {
      folder: "tour_gallery",
      resource_type: "image",
    });

    const imageUrl = result.secure_url;

    // Insert into MySQL
    const sql = "INSERT INTO gallery (title, image_url) VALUES (?, ?)";

    db.query(sql, [title, imageUrl], (err, data) => {
      if (err) {
        return res.status(500).json({ error: "DB Error", details: err });
      }

      res.status(201).json({
        success: true,
        message: "Image uploaded successfully",
        data: {
          id: data.insertId,
          title,
          imageUrl,
        },
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Upload failed" });
  }
};

const addCertificate = async (req, res) => {
  try {
    const { title } = req.body;
    const image = req.files.photo;

    if (!image) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(image.tempFilePath, {
      resource_type: "image",
      folder: "tour_certificate",
    });

    const imageUrl = result.secure_url;

    // Insert into MySQL
    const sql = "INSERT INTO certificates (name, image_url) VALUES (?, ?)";

    db.query(sql, [title, imageUrl], (err, data) => {
      if (err) return res.status(500).json({ error: "DB Error", details: err });

      return res.status(200).json({
        success: true,
        message: "Image uploaded and saved to DB",
        data: { id: data.insertId, title, imageUrl },
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Upload failed" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // 1. Get the ONLY user (id = 1)
    const [rows] = await db.query("SELECT * FROM admin WHERE id = 1 LIMIT 1");

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];

    // 2. Compare old password with hash
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // 3. Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // 4. Update password in MySQL
    await db.query("UPDATE admin SET password = ? WHERE id = 1", [
      hashedPassword,
    ]);

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.log("Change password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

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

const deletePhoto = async (req, res) => {
  try {
    const { id } = req.params; // <-- get ID from URL

    if (!id) {
      return res.status(400).json({ message: "Photo ID is required" });
    }

    // 1. Get the photo from DB
    const [rows] = await db.query(
      "SELECT image_url FROM gallery WHERE id = ? LIMIT 1",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Photo not found" });
    }

    const imageUrl = rows[0].image_url;

    // 2. Extract Cloudinary public ID
    const publicId = imageUrl.split("/").slice(-1)[0].split(".")[0];

    // 3. Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // 4. Delete from MySQL
    await db.query("DELETE FROM gallery WHERE id = ?", [id]);

    res.json({ success: true, message: "Photo deleted successfully" });
  } catch (error) {
    console.error("Delete photo error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// const addBlog = async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     const image = req.files.image;

//     if (!image) {
//       return res.status(400).json({ error: "No image uploaded" });
//     }

//     // Upload to Cloudinary
//     const result = await cloudinary.uploader.upload(image.tempFilePath, {
//       resource_type: "image",
//       folder: "tour_blog",
//     });

//     const imageUrl = result.secure_url;

//     // Insert into MySQL
//     const sql = "INSERT INTO blog (title,description, image_url) VALUES (?, ?)";

//     db.query(sql, [title, description, imageUrl], (err, data) => {
//       if (err) return res.status(500).json({ error: "DB Error", details: err });

//       return res.status(200).json({
//         success: true,
//         message: "Image uploaded and saved to DB",
//         data: { id: data.insertId, title, imageUrl },
//       });
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Upload failed" });
//   }
// };

const addBlog = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.files || !req.files.photo) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const image = req.files.photo;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(image.tempFilePath, {
      resource_type: "image",
      folder: "tour_blog",
    });

    const imageUrl = result.secure_url;

    // Insert into MySQL
    const sql =
      "INSERT INTO blog (title, description, image_url) VALUES (?, ?, ?)";

    db.query(sql, [title, description, imageUrl], (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "DB Error", details: err });
      }

      return res.status(200).json({
        success: true,
        message: "Blog uploaded successfully",
        data: {
          id: data.insertId,
          title,
          description,
          imageUrl,
        },
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Upload failed" });
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

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params; // <-- get ID from URL

    if (!id) {
      return res.status(400).json({ message: "blog ID is required" });
    }

    // 1. Get the photo from DB
    const [rows] = await db.query(
      "SELECT image_url FROM blog WHERE id = ? LIMIT 1",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Photo not found" });
    }

    const imageUrl = rows[0].image_url;

    // 2. Extract Cloudinary public ID
    const publicId = imageUrl.split("/").slice(-1)[0].split(".")[0];

    // 3. Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // 4. Delete from MySQL
    await db.query("DELETE FROM blog WHERE id = ?", [id]);

    res.json({ success: true, message: "blog deleted successfully" });
  } catch (error) {
    console.error("Delete blog error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const editPhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    
    if (!id) return res.status(400).json({ message: "Photo ID required" });

    let imageUrl = null;

    if (req.files && req.files.photo) {
      const photo = req.files.photo;
      const result = await cloudinary.uploader.upload(photo.tempFilePath, {
        folder: "tour_gallery",
        resource_type: "image",
      });
      imageUrl = result.secure_url;
    }

    // Get current image_url if not updating image, so we can return it
    if (imageUrl) {
      await db.query("UPDATE gallery SET title = ?, image_url = ? WHERE id = ?", [title, imageUrl, id]);
    } else {
      await db.query("UPDATE gallery SET title = ? WHERE id = ?", [title, id]);
    }

    res.json({ success: true, message: "Photo updated successfully", imageUrl });
  } catch (error) {
    console.error("Edit photo error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const editBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    
    if (!id) return res.status(400).json({ message: "Blog ID required" });

    let imageUrl = null;

    if (req.files && req.files.photo) {
      const photo = req.files.photo;
      const result = await cloudinary.uploader.upload(photo.tempFilePath, {
        folder: "tour_blog",
        resource_type: "image",
      });
      imageUrl = result.secure_url;
    }

    if (imageUrl) {
      await db.query("UPDATE blog SET title = ?, description = ?, image_url = ? WHERE id = ?", [title, description, imageUrl, id]);
    } else {
      await db.query("UPDATE blog SET title = ?, description = ? WHERE id = ?", [title, description, id]);
    }

    res.json({ success: true, message: "Blog updated successfully", imageUrl });
  } catch (error) {
    console.error("Edit blog error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export {
  addCertificate,
  addPhoto,
  deletePhoto,
  fetchPhoto,
  addBlog,
  fetchBlog,
  deleteBlog,
  changePassword,
  editPhoto,
  editBlog,
};
