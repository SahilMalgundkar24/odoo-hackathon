import mongoose from "mongoose";

const baseUserSchema = {
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
};

export const buyerSchema = new mongoose.Schema(
  {
    ...baseUserSchema,
    type: {
      type: String,
      default: "buyer",
    },
  },
  { collection: "buyers" }
); // Explicitly set collection name

export const sellerSchema = new mongoose.Schema(
  {
    ...baseUserSchema,
    type: {
      type: String,
      default: "seller",
    },
  },
  { collection: "sellers" }
); // Explicitly set collection name
