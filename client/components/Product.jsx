"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Heart, ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get addToCart function from context
  const { addToCart } = useCart();

  // Hardcoded categories
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

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Fetch products
        const productsResponse = await axios.get(
          "http://localhost:3030/api/products"
        );
        if (productsResponse.data.success) {
          setProducts(productsResponse.data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch products when category changes
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        setLoading(true);
        const url =
          selectedCategory === "All Categories"
            ? "http://localhost:3030/api/products"
            : `http://localhost:3030/api/products?category=${encodeURIComponent(
                selectedCategory
              )}`;

        const response = await axios.get(url);
        if (response.data.success) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.error("Error fetching products by category:", error);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [selectedCategory]);

  // Show only first 5 products
  const displayProducts = products.slice(0, 5);

  const toggleFavorite = (productId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const handleAddToCart = (product) => {
    try {
      addToCart(product);
      // Optional: Add a success message or animation here
      console.log("Item added to cart:", product.name);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <section className="py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-12 gap-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
          Products
        </h2>

        <div className="relative w-full sm:w-auto">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-between w-full sm:w-auto space-x-2 bg-gray-200 hover:bg-gray-200 px-4 md:px-6 py-2 md:py-3 rounded-lg min-w-0 sm:min-w-max"
          >
            <span className="text-gray-700 font-medium text-sm md:text-base truncate">
              {selectedCategory === "All Categories"
                ? "Choose Category"
                : selectedCategory}
            </span>
            <ChevronDown
              className={`w-4 h-4 md:w-5 md:h-5 text-gray-600 transition-transform duration-200 flex-shrink-0 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-full sm:w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="py-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors duration-150 text-sm md:text-base ${
                      selectedCategory === category
                        ? "bg-gray-100 text-gray-900 font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-500">Loading products...</div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-red-500">{error}</div>
        </div>
      ) : (
        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {displayProducts.map((product) => (
            <div key={product._id} className="flex-shrink-0 w-72 sm:w-80">
              <div className="bg-gray-100 rounded-2xl p-4 md:p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <span className="bg-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium text-gray-700">
                    {product.category}
                  </span>
                  <button
                    onClick={() => toggleFavorite(product._id)}
                    className="ml-auto p-2 hover:bg-white rounded-full transition-colors duration-200"
                  >
                    <Heart
                      className={`w-4 h-4 md:w-5 md:h-5 ${
                        favorites.has(product._id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>

                <div className="relative mb-4 md:mb-6 flex-grow">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={`http://localhost:3030${product.images[0].url}`}
                      alt={product.name}
                      className="w-full h-40 sm:h-48 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-40 sm:h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}

                  <div className="flex justify-center mt-3 md:mt-4 space-x-2">
                    {product.images &&
                      product.images.map((_, index) => (
                        <div
                          key={index}
                          className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${
                            index === 0 ? "bg-green-500" : "bg-gray-300"
                          }`}
                        ></div>
                      ))}
                  </div>
                </div>

                <div className="space-y-2 md:space-y-3 mt-auto">
                  <div>
                    <p className="text-xs md:text-sm text-gray-500 font-medium">
                      {product.sellerId?.username || "Unknown Seller"}
                    </p>
                    <h3 className="font-semibold text-gray-900 text-base md:text-lg leading-tight line-clamp-2">
                      {product.name}
                    </h3>
                  </div>

                  <p className="text-lg md:text-xl font-bold text-gray-900">
                    ₹{product.price}
                  </p>
                  <div className="flex justify-between gap-2 cursor-pointer">
                    <Link
                      href={`/${product._id}`}
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2.5 rounded-lg font-medium transition-colors duration-200 text-sm text-center"
                    >
                      Buy Now
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2.5 rounded-lg font-medium transition-colors duration-200 text-sm "
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex-shrink-0 w-72">
            <div className="rounded-2xl p-4 h-full flex items-center justify-center">
              <Link
                href="/allproducts"
                className="flex flex-col items-center space-y-3 md:space-y-4 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white">
                  <ArrowRight className="w-5 h-5" />
                </div>
                <div className="text-center font-semibold text-base md:text-lg hover:underline">
                  See More products
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;
