import express from "express";
import { createUser, getAllUsers, updatePassword } from "../controllers/userController.js";
import { authenticate, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin routes
router.post("/", authenticate, authorizeRoles("ADMIN"), createUser);
router.get("/", authenticate, authorizeRoles("ADMIN"), getAllUsers);

// Normal user route
router.put("/password", authenticate, updatePassword);

export default router;
