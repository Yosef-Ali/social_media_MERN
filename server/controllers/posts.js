import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    // Get userId, description, picture from request body
    const { userId, description, picturePath } = req.body;

    // Find author user object
    const user = await User.findById(userId);

    // Create new post with author details
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {}, // empty likes map
      comments: [], // empty likes map
    });

    // Save post to DB
    await newPost.save();

    // Fetch all posts
    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */

// Get feed posts
export const getFeedPosts = async (req, res) => {
  try {
    // Fetch all posts from DB
    const posts = await Post.find();

    // Send response with posts array
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Get user posts
export const getUserPosts = async (req, res) => {
  try {
    // Get userId from request parameters
    const { userId } = req.params;

    // Fetch posts with matching userId
    const posts = await Post.find({ userId });

    // Send response with user posts
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */

// Like or unlike post
export const likePost = async (req, res) => {
  try {
    // Get post id and user id from request
    const { id } = req.params;
    const { userId } = req.body;

    // Find post
    const post = await Post.findById(id);

    // Check if user has already liked post
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      // Unlike post - remove user like
      post.likes.delete(userId);
    } else {
      // Like post - add user like
      post.likes.set(userId, true);
    }

    // Update post with modified likes Map
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    // Send response with updated post
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
