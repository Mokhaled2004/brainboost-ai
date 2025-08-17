const jwt = require("jsonwebtoken");
const User = require("../models/User");

//Middlewaqre to protect routes
const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1]; // Extract the token from the header
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
      req.user = await User.findById(decoded.id).select("-password"); // Find the user and exclude password
      next(); // Proceed to the next middleware or route handler
    } else {
      res.status(401).json({ message: "Not authorized, no token" }); // If no token is provided
    }
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" }); // If token verification fails
  }
};

module.exports = { protect };
