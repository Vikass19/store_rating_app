// src/routes/ratingRoutes.js
import express from "express";
import {
  getAllStores,
  getStoreById,
  submitRating
} from "../controllers/storeController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route: GET /api/stores
// Get all stores (with search & filter options in query)
router.get("/", authenticate, getAllStores);

// Route: GET /api/stores/:id
// Get a single store by ID
router.get("/:id", authenticate, getStoreById);

// Route: POST /api/stores/:id/rate
// Submit a rating for a store
router.post("/:id/rate", authenticate, submitRating);

// Route: PUT /api/stores/:id/rate
// Update a previously submitted rating
router.put("/:id/rate", authenticate);

export default router;
