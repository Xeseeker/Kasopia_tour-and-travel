import express from "express";

import {
  fetchBlog,
  fetchPhoto,
  fetchCertificate,
} from "../controller/userController.js";
const userRoutes = express.Router();

userRoutes.get("/fetchPhoto", fetchPhoto);
userRoutes.get("/fetchBlog", fetchBlog);
userRoutes.get("/fetchCertificate", fetchCertificate);

export default userRoutes;
