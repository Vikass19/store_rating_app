import prisma from "../config/prisma.js";

// Admin or store owner can create a store
export const createStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;

    const store = await prisma.store.create({
      data: { name, email, address, ownerId },
    });

    res.status(201).json({ message: "Store created", store });
  } catch (err) {
    res.status(500).json({ message: "Failed to create store", error: err.message });
  }
};
// inside storeController.js
export const getStoreById = async (req, res) => {
  const { id } = req.params;
  const store = await prisma.store.findUnique({ where: { id: Number(id) } });
  if (!store) return res.status(404).json({ message: "Store not found" });
  res.json(store);
};

// Get all stores
export const getAllStores = async (req, res) => {
  try {
    const stores = await prisma.store.findMany({
      include: {
        ratings: true,
        owner: true,
      },
    });

    res.json(stores);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stores", error: err.message });
  }
};

// Submit or update rating
export const submitRating = async (req, res) => {
  try {
    const { storeId, value } = req.body;
    const userId = req.user.id;

    const rating = await prisma.rating.upsert({
      where: { userId_storeId: { userId, storeId } },
      update: { value },
      create: { userId, storeId, value },
    });

    res.json({ message: "Rating submitted", rating });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit rating", error: err.message });
  }
};

// Get ratings for a store
export const getStoreRatings = async (req, res) => {
  try {
    const { storeId } = req.params;

    const ratings = await prisma.rating.findMany({
      where: { storeId: parseInt(storeId) },
      include: { user: true },
    });

    res.json(ratings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch ratings", error: err.message });
  }
};
