const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const verifyToken = async (request, Response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const error = new Error("Unauthorized: No token provided");
    error.statusCode = 401;
    return next(error);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      const error = new Error("Unauthorized: User not found");
      error.statusCode = 401;
      return next(error);
    }

    request.user = user;
    next();
  } catch (err) {
    err.statusCode = 401;
    next(err);
  }
};

module.exports = verifyToken;
