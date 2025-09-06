import mongoose from "mongoose";

const baseUserSchema = {
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

export const buyerSchema = new mongoose.Schema({
  ...baseUserSchema,
  type: {
    type: String,
    default: 'buyer'
  }
}, { collection: 'buyers' }); // Explicitly set collection name

export const sellerSchema = new mongoose.Schema({
  ...baseUserSchema,
  type: {
    type: String,
    default: 'seller'
  }
}, { collection: 'sellers' }); // Explicitly set collection name