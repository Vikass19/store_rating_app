import express from "express";
import { authenticate, authorizeRoles } from "../middlewares/authMiddleware.js";
import { createStore, getAllStores, submitRating, getStoreRatings } from "../controllers/storeController.js";

const router = express.Router();

// Public: View stores
router.get("/", authenticate, getAllStores);
router.get("/:storeId/ratings", authenticate, getStoreRatings);

// Store creation (admin or store owner)
router.post("/", authenticate, authorizeRoles("ADMIN", "STORE_OWNER"), createStore);

// Ratings submission (normal users)
router.post("/rating", authenticate, authorizeRoles("USER"), submitRating);

export default router;
