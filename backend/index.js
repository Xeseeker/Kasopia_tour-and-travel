import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import loginUser from "./middleware/login.js";
import createAdmin from "./middleware/createAdmin.js";
import connectCloudinary from "./config/cloudinary.js";
import fileUpload from "express-fileupload";
import contact from "./middleware/contact.js";
const app = express();

connectCloudinary();

// app.use(cors());
app.use(
  cors({
    origin: ["https://kasopiatour.com", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
//Limit Request Size (DDoS Protection)
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));

//app.use(express.json());

// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//   })
// );

app.use(helmet());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    abortOnLimit: true,
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // requests per IP
});

app.use(limiter);

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
});

app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/login", loginLimiter, loginUser);
app.use("/api/createAdmin", createAdmin);
app.use("/api/contact", contact);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
