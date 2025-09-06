"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import ChatModal from "@/components/ChatModal";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const params = useParams();
  const productId = params.product;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3030/api/products/${productId}`
        );

        if (response.data.success) {
          setProduct(response.data.product);
          // Set first image as selected by default
          if (
            response.data.product.images &&
            response.data.product.images.length > 0
          ) {
            setSelectedImage(response.data.product.images[0]);
          }
        } else {
          setError("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        if (error.response?.status === 404) {
          setError("Product not found");
        } else {
          setError("Failed to load product");
        }
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="lg:px-16 px-5 py-5">
        <Navbar />
        <div className="w-full mt-16 flex justify-center items-center h-96">
          <div className="text-gray-500">Loading product...</div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="lg:px-16 px-5 py-5">
        <Navbar />
        <div className="w-full mt-16 flex justify-center items-center h-96">
          <div className="text-red-500">{error || "Product not found"}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:px-16 px-5 py-5">
      <Navbar />
      <div className="w-full mt-16 flex lg:flex-row flex-col justify-between gap-7">
        <div className="lg:w-1/2 w-full">
          {/* Main Image Display */}
          {selectedImage ? (
            <img
              src={`http://localhost:3030${selectedImage.url}`}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg mb-4"
            />
          ) : (
            <div className="w-full h-96 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-400">No Image Available</span>
            </div>
          )}

          {/* Thumbnail Images */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 flex-wrap">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:3030${image.url}`}
                  alt={`${product.name} ${index + 1}`}
                  className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 ${
                    selectedImage === image
                      ? "border-blue-600"
                      : "border-gray-300"
                  } hover:border-blue-400 transition-colors duration-200`}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
          )}
        </div>
        <div className="lg:w-1/2 w-full lg:h-96 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-500 mt-2">
              Sold by: {product.sellerId?.username || "Unknown Seller"}
            </p>
            <p className="text-gray-500 mt-4">{product.description}</p>
            <p className="font-bold text-4xl mt-4">₹{product.price}</p>
          </div>
          <div className="flex lg:gap-4 gap-2 lg:mt-0 mt-5">
            <div className="border border-gray-600 rounded-lg text-sm lg:text-base lg:py-3 py-2 px-4 lg:px-7">
              Add to Cart
            </div>
            <div
              onClick={() => {
                router.push("/buynow");
              }}
              className="bg-green-500 rounded-lg text-sm lg:text-base lg:py-3 py-2 px-4 lg:px-7 text-white"
            >
              Buy Now
            </div>
            <div
              className="bg-amber-200 rounded-lg text-sm lg:text-base lg:py-3 py-2 px-4 lg:px-7 cursor-pointer hover:bg-amber-300 transition-colors duration-200"
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
