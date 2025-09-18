// src/routes/authRoutes.js
import express from "express";
import { signup, login , logout } from "../controllers/authController.js";

import { authenticate, authorizeRoles } from "../middlewares/authMiddleware.js";


const router = express.Router();

// Route: POST /api/auth/signup , login , logout , password
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", authenticate , logout);
router.put("/password", authenticate);

export default router;
