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

// import express from "express";
// import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
// import { verifyToken } from "../middleware/auth.js";

// const router = express.Router();

// /* READ */
// router.get("/", verifyToken, getFeedPosts);
// router.get("/:userId/posts", verifyToken, getUserPosts);

// /* UPDATE */
// router.patch("/:id/like", verifyToken, likePost);

// export default router;
