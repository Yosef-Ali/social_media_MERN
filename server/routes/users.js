// Import Express
import express from "express";

// Import user controllers
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";

// Import auth middleware
import { verifyToken } from "../middleware/auth.js";

// Create router
const router = express.Router();

/* READ */

// Get user - Require token
router.get("/:id", verifyToken, getUser);

// Get user friends - Require token
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */

// Add or remove friend - Require token
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

// Export router
export default router;
