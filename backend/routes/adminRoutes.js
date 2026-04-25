import express from "express";
import { authAdmin } from "../middleware/auth.js";
import {
  addPhoto,
  addCertificate,
  deletePhoto,
  fetchBlog,
  fetchPhoto,
  deleteBlog,
  addBlog,
  changePassword,
} from "../controller/adminController.js";
const adminRoutes = express.Router();

adminRoutes.post("/addPhoto", addPhoto);
adminRoutes.post("/addCertificate", authAdmin, addCertificate);
adminRoutes.post("/addBlog", authAdmin, addBlog);
adminRoutes.delete("/deletePhoto/:id", deletePhoto);
adminRoutes.get("/fetchPhoto", authAdmin, fetchPhoto);
adminRoutes.get("/fetchBlog", authAdmin, fetchBlog);
adminRoutes.delete("/deleteBlog/:id", authAdmin, deleteBlog);
adminRoutes.post("/changePassword", authAdmin, changePassword);

export default adminRoutes;
