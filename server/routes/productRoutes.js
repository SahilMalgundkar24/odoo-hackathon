import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Product } from "../models/productModel.js";
import { sellerSchema } from "../models/userModel.js";

const router = express.Router();
const Seller = mongoose.model("Seller", sellerSchema);

// Function to create router with upload configuration
const createProductRoutes = (upload) => {
  // JWT Authentication Middleware
  const authenticateToken = async (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

      if (!token) {
        return res.status(401).json({
          message: "Access token required",
          success: false,
        });
      }

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "your_jwt_secret_key"
      );
      // Verify the user exists and is a seller
      const user = await Seller.findById(decoded.userId);
      if (!user) {
        return res.status(403).json({
          message: "Invalid token or user not found",
          success: false,
        });
      }

      if (decoded.userType !== "seller") {
        return res.status(403).json({
          message: "Access denied. Only sellers can create products",
          success: false,
        });
      }

      req.user = {
        userId: decoded.userId,
        userType: decoded.userType,
      };

      next();
    } catch (error) {
      console.error("Authentication error:", error);
      return res.status(403).json({
        message: "Invalid or expired token",
        success: false,
      });
    }
  };

  // Create Product Route with file upload
  router.post(
    "/products",
    authenticateToken,
    upload.array("images", 5),
    async (req, res) => {
      try {
        const { name, description, price, category } = req.body;
        const uploadedFiles = req.files || [];

        // Input validation
        if (!name || !description || !price || !category) {
          return res.status(400).json({
            message: "Name, description, price, and category are required",
            success: false,
          });
        }

        // Validate price is a positive number
        const priceNum = parseFloat(price);
        if (isNaN(priceNum) || priceNum <= 0) {
          return res.status(400).json({
            message: "Price must be a positive number",
            success: false,
          });
        }

        // Process uploaded images (memory storage)
        const imagesArray = uploadedFiles.map((file) => ({
          filename: file.originalname,
          originalName: file.originalname,
          data: file.buffer.toString("base64"),
          size: file.size,
          mimetype: file.mimetype,
        }));

        // Create new product
        const newProduct = new Product({
          name: name.trim(),
          description: description.trim(),
          price: priceNum,
          category: category.trim(),
          images: imagesArray,
          sellerId: req.user.userId,
        });

        const savedProduct = await newProduct.save();

        // Add image URLs to the response
        const productWithUrls = {
          id: savedProduct._id,
          name: savedProduct.name,
          description: savedProduct.description,
          price: savedProduct.price,
          category: savedProduct.category,
          images: savedProduct.images.map((image, index) => ({
            ...image,
            url: `/api/products/${savedProduct._id}/images/${index}`,
          })),
          sellerId: savedProduct.sellerId,
          createdAt: savedProduct.createdAt,
          updatedAt: savedProduct.updatedAt,
        };

        res.status(201).json({
          message: "Product created successfully",
          success: true,
          product: productWithUrls,
        });
      } catch (error) {
        console.error("Product creation error:", error);

        // Handle multer errors
        if (error.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            message: "File too large. Maximum size is 5MB per file.",
            success: false,
          });
        }

        if (error.code === "LIMIT_FILE_COUNT") {
          return res.status(400).json({
            message: "Too many files. Maximum 5 files allowed.",
            success: false,
          });
        }

        if (error.message === "Only image files are allowed!") {
          return res.status(400).json({
            message: "Only image files are allowed",
            success: false,
          });
        }

        // Handle MongoDB validation errors
        if (error.name === "ValidationError") {
          const errors = Object.values(error.errors).map((err) => err.message);
          return res.status(400).json({
            message: "Validation error",
            errors: errors,
            success: false,
          });
        }

        res.status(500).json({
          message: "Server error while creating product",
          success: false,
        });
      }
    }
  );

  // Get all products (public route - no authentication required)
  router.get("/products", async (req, res) => {
    try {
      const products = await Product.find()
        .populate("sellerId", "email type")
        .sort({ createdAt: -1 });

      // Add image URLs to each product
      const productsWithUrls = products.map((product) => ({
        ...product.toObject(),
        images: product.images.map((image, index) => ({
          ...image,
          url: `/api/products/${product._id}/images/${index}`,
        })),
      }));

      res.status(200).json({
        message: "Products retrieved successfully",
        success: true,
        products: productsWithUrls,
      });
    } catch (error) {
      console.error("Get products error:", error);
      res.status(500).json({
        message: "Server error while retrieving products",
        success: false,
      });
    }
  });

  // Get products by seller (authenticated route)
  router.get("/products/seller", authenticateToken, async (req, res) => {
    try {
      const products = await Product.find({ sellerId: req.user.userId }).sort({
        createdAt: -1,
      });

      // Add image URLs to each product
      const productsWithUrls = products.map((product) => ({
        ...product.toObject(),
        images: product.images.map((image, index) => ({
          ...image,
          url: `/api/products/${product._id}/images/${index}`,
        })),
      }));

      res.status(200).json({
        message: "Seller products retrieved successfully",
        success: true,
        products: productsWithUrls,
      });
    } catch (error) {
      console.error("Get seller products error:", error);
      res.status(500).json({
        message: "Server error while retrieving seller products",
        success: false,
      });
    }
  });

  // Serve product images (base64 data)
  router.get("/products/:productId/images/:imageIndex", async (req, res) => {
    try {
      const { productId, imageIndex } = req.params;
      const product = await Product.findById(productId);

      if (!product || !product.images[imageIndex]) {
        return res.status(404).json({
          message: "Image not found",
          success: false,
        });
      }

      const image = product.images[imageIndex];
      const imageBuffer = Buffer.from(image.data, "base64");

      res.set({
        "Content-Type": image.mimetype,
        "Content-Length": imageBuffer.length,
        "Cache-Control": "public, max-age=31536000", // Cache for 1 year
      });

      res.send(imageBuffer);
    } catch (error) {
      console.error("Get product image error:", error);
      res.status(500).json({
        message: "Server error while retrieving image",
        success: false,
      });
    }
  });

  return router;
};

export default createProductRoutes;
