// src/routes/authRoutes.js
import express from "express";
import { signup, login , logout } from "../controllers/authController.js";

import { authenticate, authorizeRoles } from "../middlewares/authMiddleware.js";


const router = express.Router();

// Route: POST /api/auth/signup
router.post("/signup", signup);

// Route: POST /api/auth/login
router.post("/login", login);
router.post("/logout", authenticate , logout);

// Route: PUT /api/auth/password
// Requires authentication
router.put("/password", authenticate);

export default router;
