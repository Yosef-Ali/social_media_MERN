import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { verifyToken } from "./middleware/auth.js";

/* Function Generation */

// Get the filename of the current module
const __filename = fileURLToPath(import.meta.url);

// Get the directory name of the current module
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Parse request bodies as JSON
app.use(express.json());

// Set security headers
app.use(helmet());

// Set cross-origin resource sharing policy
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Log requests to console
app.use(morgan("common"));

// Parse request bodies for JSON and URLs
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Enable CORS for all routes
app.use(cors());

// Serve static assets from public/assets folder
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */

// Configure Multer disk storage engine
const storage = multer.diskStorage({
  // Destination folder for uploaded files
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },

  // Keep original file name
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Initialize Multer upload middleware with disk storage engine
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
