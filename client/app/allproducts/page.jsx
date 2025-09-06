"use client";
import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";

const AllProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  const categories = [
    "All Categories",
    "Automotive",
    "Toys",
    "Books & Stationery",
    "Handicrafts & Art",
    "Home & Living",
    "Fashion & Clothing",
    "Electronics",
  ];

  const router = useRouter();

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const url =
          selectedCategory === "All Categories"
            ? "http://localhost:3030/api/products"
            : `http://localhost:3030/api/products?category=${encodeURIComponent(
                selectedCategory
              )}`;

        const response = await axios.get(url);
        if (response.data.success) {
          setProducts(response.data.products);
        } else {
          setError("Failed to load products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="py-5 lg:px-16 px-5 bg-white min-h-screen">
      <Navbar />
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
        All Products
      </h1>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              selectedCategory === category
                ? "bg-gray-900 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-500 text-lg">Loading products...</div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-red-500 text-lg">{error}</div>
        </div>
      ) : (
        <>
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-gray-50 rounded-2xl p-6 flex flex-col h-full"
              >
                <div className="flex items-center justify-between mb-4 min-h-[28px]">
                  <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                    {product.category}
                  </span>
                </div>

                <div className="mb-6 flex-shrink-0">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={`http://localhost:3030${product.images[0].url}`}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}

                  <div className="flex justify-center mt-4 space-x-2">
                    {product.images &&
                      product.images.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            index === 0 ? "bg-green-500" : "bg-gray-300"
                          }`}
                        ></div>
                      ))}
                  </div>
                </div>

                <div className="space-y-3 flex-grow flex flex-col">
                  <div className="flex-grow">
                    <p className="text-sm text-gray-500 font-medium">
                      {product.sellerId?.username || "Unknown Seller"}
                    </p>
                    <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                      {product.name}
                    </h3>
                  </div>

                  <p className="text-xl font-bold text-gray-900">
                    ₹{product.price}
                  </p>

                  <div className="flex justify-between gap-2">
                    <button
                      onClick={() => {
                        router.push("/buynow");
                      }}
                      className="cursor-pointer w-full bg-gray-900 hover:bg-gray-800 text-white py-2.5 rounded-lg font-medium transition-colors duration-200 text-sm"
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2.5 rounded-lg font-medium transition-colors duration-200 text-sm"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Products Found */}
          {products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No products found in this category.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllProducts;
