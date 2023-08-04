// Import Express
import express from "express";

// Import post controllers
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";

// Import auth middleware
import { verifyToken } from "../middleware/auth.js";

// Initialize router
const router = express.Router();

/* READ */

// Get feed posts - Require auth token
router.get("/", verifyToken, getFeedPosts);

// Get user posts - Require auth token
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */

// Like post - Require auth token
router.patch("/:id/like", verifyToken, likePost);

// Export router
export default router;
