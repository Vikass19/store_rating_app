import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";

// Admin can create new users
export const createUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, address, role },
    });

    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(500).json({ message: "Could not create user", error: err.message });
  }
};

// Get all users with optional filters
export const getAllUsers = async (req, res) => {
  try {
    const { name, email, address, role } = req.query;

    const users = await prisma.user.findMany({
      where: {
        name: name ? { contains: name } : undefined,
        email: email ? { contains: email } : undefined,
        address: address ? { contains: address } : undefined,
        role: role ? role : undefined,
      },
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
};

// Update user password
export const updatePassword = async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: { password: hashedPassword },
    });

    res.json({ message: "Password updated", updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Failed to update password", error: err.message });
  }
};
