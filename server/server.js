import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import multer from "multer";
import cors from "cors";
import { buyerSchema, sellerSchema } from "./models/userModel.js";

dotenv.config();

const app = express();
const upload = multer();
const PORT = 3030;

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
};

// Middleware
app.use(cors(corsOptions));
app.use(upload.none());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_SECRET)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    console.error("Make sure you have a .env file with MONGO_SECRET defined");
  });

const Buyer = mongoose.model("Buyer", buyerSchema);
const Seller = mongoose.model("Seller", sellerSchema);

// Register endpoint
app.post("/register", async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    if (!email || !password || !userType) {
      return res
        .status(400)
        .json({ message: "Email, password and user type are required" });
    }

    // Choose collection based on user type
    const UserModel = userType === "buyer" ? Buyer : Seller;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new UserModel({
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
      success: true
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    if (!email || !password || !userType) {
      return res
        .status(400)
        .json({ message: "Email, password and user type are required" });
    }

    // Choose collection based on user type
    const UserModel = userType === "buyer" ? Buyer : Seller;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, userType },
      process.env.JWT_SECRET || "your_jwt_secret_key",
      { expiresIn: "30d" }
    );

    res.status(201).json({
      token,
      userType,
      success: true,
      message: 'User logged in successfully'
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
