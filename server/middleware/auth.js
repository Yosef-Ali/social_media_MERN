// Import jsonwebtoken
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    // Get token from Authorization header
    let token = req.header("Authorization");

    // If no token, return access denied error
    if (!token) {
      return res.status(403).send("Access Denied");
    }

    // Remove Bearer prefix from token
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    // Verify and decode token using secret
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Assign decoded user to request object
    req.user = verified;

    // Call next middleware
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
