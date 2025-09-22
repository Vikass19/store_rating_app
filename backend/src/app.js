import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import storeRoutes from "./routes/storeRoutes.js";
import ratingRoutes from "./routes/ratingRoutes.js";
import userRoutes from "./routes/userRoutes.js"

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ===== Health check or default route =====
app.get("/", (req, res) => {
  res.json({ message: "Backend is running " });
});

// Correct route prefixes – add the leading "/"
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/auth/users", userRoutes);
app.use("/api/v1/stores", storeRoutes);
app.use("/api/v1/ratings", ratingRoutes);

export default app;
