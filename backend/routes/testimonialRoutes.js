import express from "express";
import { authAdmin } from "../middleware/auth.js";
import {
  addTestimonial,
  deleteTestimonial,
  fetchTestimonials,
  updateTestimonial,
} from "../controllers/testimonialController.js";

const testimonialRoutes = express.Router();

testimonialRoutes.get("/", fetchTestimonials);
testimonialRoutes.post("/", authAdmin, addTestimonial);
testimonialRoutes.put("/:id", authAdmin, updateTestimonial);
testimonialRoutes.delete("/:id", authAdmin, deleteTestimonial);

export default testimonialRoutes;
