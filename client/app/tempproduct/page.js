"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import ChatModal from "@/components/ChatModal";

const page = () => {
  // Sample product data - you can replace this with actual product data
  const product = {
    title: "Premium Wireless Headphones",
    category: "Electronics",
    price: 299.99,
    description:
      "Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design. Perfect for music lovers, professionals, and anyone who values quality sound.",
    images: [
      { id: 1, color: "bg-gray-400" },
      { id: 2, color: "bg-gray-500" },
      { id: 3, color: "bg-gray-600" },
      { id: 4, color: "bg-gray-700" },
      { id: 5, color: "bg-gray-800" },
    ],
  };

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  return (
    <div className="px-16 py-5">
      <Navbar />
      <div className="w-full mt-16 flex justify-between gap-7">
        <div className="w-1/2">
          {/* Main Image Display */}
          <div
            className={`w-full h-96 ${selectedImage.color} rounded-lg mb-4 flex items-center justify-center`}
          ></div>

          {/* Thumbnail Images */}
          <div className="flex gap-2 flex-wrap">
            {product.images.map((image) => (
              <div
                key={image.id}
                className={`w-16 h-16 ${
                  image.color
                } rounded-lg cursor-pointer border-2 ${
                  selectedImage.id === image.id
                    ? "border-blue-600"
                    : "border-gray-300"
                } hover:border-blue-400 transition-colors duration-200 flex items-center justify-center`}
                onClick={() => setSelectedImage(image)}
              >
                <span className="text-white text-xs font-medium">
                  {image.id}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/2 h-96 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-gray-500 mt-4">{product.description}</p>
            <p className="font-bold text-4xl mt-4">₹{product.price}</p>
          </div>
          <div className="flex gap-4">
            <div className="border border-ggray-600 rounded-lg py-3 px-7">
              Add to Cart
            </div>
            <div className="bg-green-500 rounded-lg py-3 px-7 text-white">
              Buy Now
            </div>
            <div
              className="bg-amber-200 rounded-lg py-3 px-7 cursor-pointer hover:bg-amber-300 transition-colors duration-200"
              onClick={() => setIsChatModalOpen(true)}
            >
              Negotiate with the seller
            </div>
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      <ChatModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
      />
    </div>
  );
};

export default page;
