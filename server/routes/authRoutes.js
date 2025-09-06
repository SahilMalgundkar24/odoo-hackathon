import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { buyerSchema, sellerSchema } from "../models/userModel.js";

const router = express.Router();

const Buyer = mongoose.model("Buyer", buyerSchema);
const Seller = mongoose.model("Seller", sellerSchema);

// Register endpoint
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, userType } = req.body;

    if (!username || !email || !password || !userType) {
      return res.status(400).json({
        message: "Username, email, password and user type are required",
      });
    }

    // Validate username length
    if (username.length < 3 || username.length > 30) {
      return res
        .status(400)
        .json({ message: "Username must be between 3 and 30 characters" });
    }

    // Choose collection based on user type
    const UserModel = userType === "buyer" ? Buyer : Seller;

    // Check if username already exists
    const existingUserByUsername = await UserModel.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Check if email already exists
    const existingUserByEmail = await UserModel.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new UserModel({
      username: username.trim(),
      email,
      password: hashedPassword,
      type: userType,
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id, userType },
      process.env.JWT_SECRET || "your_jwt_secret_key",
      { expiresIn: "30d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      userType,
      username: user.username,
      success: true,
    });
  } catch (error) {
    console.error("Registration error:", error);

    // Handle MongoDB validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        message: "Validation error",
        errors: errors,
        success: false,
      });
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        message: `${field} already exists`,
        success: false,
      });
    }

    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    if (!email || !password || !userType) {
      return res.status(400).json({
        message: "Email, password and user type are required",
        success: false,
      });
    }

    // Choose collection based on user type
    const UserModel = userType === "buyer" ? Buyer : Seller;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    const token = jwt.sign(
      { userId: user._id, userType },
      process.env.JWT_SECRET || "your_jwt_secret_key",
      { expiresIn: "30d" }
    );

    res.status(200).json({
      message: "User logged in successfully",
      token,
      userType,
      username: user.username,
      success: true,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
});

export default router;
