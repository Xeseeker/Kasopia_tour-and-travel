import {
  createTestimonial,
  deleteTestimonialById,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonialById,
} from "../models/testimonialModel.js";
import { v2 as cloudinary } from "cloudinary";

const getUploadedPhoto = (req) => {
  const photo = req.files?.photo || req.files?.image;
  return Array.isArray(photo) ? photo[0] : photo;
};

const uploadTestimonialPhoto = async (photo) => {
  if (!photo) {
    return "";
  }

  if (!photo.mimetype?.startsWith("image/")) {
    const error = new Error("Please upload a valid image file");
    error.statusCode = 400;
    throw error;
  }

  const result = await cloudinary.uploader.upload(photo.tempFilePath, {
    folder: "tour_testimonials",
    resource_type: "image",
  });

  return result.secure_url;
};

const validateTestimonialPayload = (body) => {
  const name = body.name?.trim();
  const message = body.message?.trim();
  const location = body.location?.trim() || "";
  const image = body.image?.trim() || "";
  const rawRating = body.rating;

  if (!name || !message) {
    return {
      isValid: false,
      error: "Name and message are required",
    };
  }

  let rating = null;

  if (rawRating !== undefined && rawRating !== null && rawRating !== "") {
    rating = Number(rawRating);

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return {
        isValid: false,
        error: "Rating must be an integer between 1 and 5",
      };
    }
  }

  return {
    isValid: true,
    values: {
      name,
      message,
      location,
      image,
      rating,
    },
  };
};

const fetchTestimonials = async (_req, res) => {
  try {
    const testimonials = await getAllTestimonials();

    return res.status(200).json({
      success: true,
      testimonials,
    });
  } catch (error) {
    console.error("Fetch testimonials error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch testimonials",
    });
  }
};

const addTestimonial = async (req, res) => {
  try {
    const validation = validateTestimonialPayload(req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.error,
      });
    }

    const uploadedImage = await uploadTestimonialPhoto(getUploadedPhoto(req));
    if (uploadedImage) {
      validation.values.image = uploadedImage;
    }

    const testimonial = await createTestimonial(validation.values);

    return res.status(201).json({
      success: true,
      message: "Testimonial created successfully",
      testimonial,
    });
  } catch (error) {
    console.error("Create testimonial error:", error);
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode ? error.message : "Failed to create testimonial",
    });
  }
};

const updateTestimonial = async (req, res) => {
  try {
    const testimonialId = Number(req.params.id);

    if (!Number.isInteger(testimonialId) || testimonialId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid testimonial id",
      });
    }

    const validation = validateTestimonialPayload(req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.error,
      });
    }

    const uploadedImage = await uploadTestimonialPhoto(getUploadedPhoto(req));
    if (uploadedImage) {
      validation.values.image = uploadedImage;
    }

    const updated = await updateTestimonialById(testimonialId, validation.values);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    const testimonial = await getTestimonialById(testimonialId);

    return res.status(200).json({
      success: true,
      message: "Testimonial updated successfully",
      testimonial,
    });
  } catch (error) {
    console.error("Update testimonial error:", error);
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode ? error.message : "Failed to update testimonial",
    });
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    const testimonialId = Number(req.params.id);

    if (!Number.isInteger(testimonialId) || testimonialId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid testimonial id",
      });
    }

    const deleted = await deleteTestimonialById(testimonialId);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    console.error("Delete testimonial error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete testimonial",
    });
  }
};

export {
  addTestimonial,
  deleteTestimonial,
  fetchTestimonials,
  updateTestimonial,
};
