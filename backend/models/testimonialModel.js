import db from "../config/db.js";

const normalizeTestimonial = (testimonial = {}) => {
  const name = testimonial.name?.trim();
  const message = testimonial.message?.trim();
  const location = testimonial.location?.trim() || null;
  const image = testimonial.image?.trim() || null;
  const ratingValue =
    testimonial.rating === "" || testimonial.rating === undefined || testimonial.rating === null
      ? null
      : Number(testimonial.rating);

  return {
    name,
    message,
    location,
    image,
    rating: Number.isInteger(ratingValue) ? ratingValue : ratingValue,
  };
};

const getAllTestimonials = async () => {
  const [rows] = await db.query(
    `SELECT id, name, message, location, rating, image, createdAt
     FROM testimonials
     ORDER BY createdAt DESC, id DESC`
  );

  return rows;
};

const getTestimonialById = async (id) => {
  const [rows] = await db.query(
    `SELECT id, name, message, location, rating, image, createdAt
     FROM testimonials
     WHERE id = ?
     LIMIT 1`,
    [id]
  );

  return rows[0] || null;
};

const createTestimonial = async (testimonial) => {
  const { name, message, location, rating, image } = normalizeTestimonial(testimonial);

  const [result] = await db.query(
    `INSERT INTO testimonials (name, message, location, rating, image)
     VALUES (?, ?, ?, ?, ?)`,
    [name, message, location, rating, image]
  );

  return getTestimonialById(result.insertId);
};

const updateTestimonialById = async (id, testimonial) => {
  const { name, message, location, rating, image } = normalizeTestimonial(testimonial);

  const [result] = await db.query(
    `UPDATE testimonials
     SET name = ?, message = ?, location = ?, rating = ?, image = ?
     WHERE id = ?`,
    [name, message, location, rating, image, id]
  );

  return result.affectedRows > 0;
};

const deleteTestimonialById = async (id) => {
  const [result] = await db.query("DELETE FROM testimonials WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

export {
  createTestimonial,
  deleteTestimonialById,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonialById,
};
