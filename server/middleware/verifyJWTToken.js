import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Middleware configuration
export const verifyToken = async (req, res, next) => {
  const token = req.cookie.jwt;
  if (!token) {
    return res.status(400).send({ msg: "Unauthorized" });
  }
  // Verify token in the cookie
  jwt.verify(token, process.env.JWT_KEY, async (err, result) => {
    if (err) {
      return res.status(403).send({ msg: "Token not valid or expired" });
    }
    req.id = result.id;
    next();
  });
};
