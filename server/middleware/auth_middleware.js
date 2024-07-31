const jwt = require("jsonwebtoken");
const User = require("../models/user_models");

const authMiddleware = async (req, res, next) => {
  // Get the token from Authorization header
  const token = req.header("Authorization");

  if (!token) {
    // If no token is provided, respond with 401 Unauthorized
    return res.status(401).json({ message: "Unauthorized. Token not provided" });
  }

  // Remove the "Bearer " prefix
  const jwtToken = token.replace("Bearer ", "").trim();

  try {
    // Verify the token
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    // Fetch user data
    const userData = await User.findOne({ email: decoded.email }).select("-password");

    if (!userData) {
      return res.status(401).json({ message: "Unauthorized. User not found" });
    }

    // Attach user data and token to the request object
    req.token = jwtToken;
    req.user = userData;
    req.userID = userData._id;

    // Move on to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
};

module.exports = authMiddleware;
