import express from "express";
import { createUser, getAllUsers, updatePassword } from "../controllers/userController.js";
import { authenticate, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// SYSTEM_ADMINISTRATOR routes
router.post("/", authenticate, authorizeRoles("SYSTEM_ADMINISTRATOR"), createUser);
router.get("/", authenticate, authorizeRoles("SYSTEM_ADMINISTRATOR"), getAllUsers);

// Normal user route
router.put("/password", authenticate, updatePassword);

export default router;
