import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "../config/prisma.js";
import { isTokenBlacklisted } from "../controllers/authController.js";

dotenv.config();

/**
 * Verify JWT and attach user to req.user
 * Reject if token is missing, invalid, or blacklisted
 */
export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    // Check if token was logged out
    if (isTokenBlacklisted(token)) {
      return res.status(401).json({ message: "Token revoked, please login again" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

/**
 * Restrict route to specific roles
 */
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};
