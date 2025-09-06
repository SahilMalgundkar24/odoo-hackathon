"use client";
import React, { useState } from "react";
import { Heart, ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

const Products = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  // Get addToCart function from context
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

  // Sample products data
  const allProducts = [
    {
      id: 1,
      name: 'Dunk High "Green Satin" Sneakers',
      brand: "Nike",
      price: "$180.00",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center",
      category: "Fashion & Clothing",
      isBestSeller: true,
    },
    {
      id: 2,
      name: "Vintage Leather Jacket",
      brand: "Fashion Co",
      price: "$95.00",
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop&crop=center",
      category: "Fashion & Clothing",
      isBestSeller: false,
    },
    {
      id: 3,
      name: 'MacBook Pro 13"',
      brand: "Apple",
      price: "$1299.00",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&crop=center",
      category: "Electronics",
      isBestSeller: true,
    },
    {
      id: 4,
      name: "Wooden Coffee Table",
      brand: "Home Decor",
      price: "$150.00",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center",
      category: "Home & Living",
      isBestSeller: false,
    },
    {
      id: 5,
      name: "Car Dashboard Camera",
      brand: "TechCar",
      price: "$89.00",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
      category: "Automotive",
      isBestSeller: true,
    },
    {
      id: 6,
      name: "Children's Building Blocks",
      brand: "PlayTime",
      price: "$25.00",
      image:
        "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=400&h=400&fit=crop&crop=center",
      category: "Toys",
      isBestSeller: false,
    },
    {
      id: 7,
      name: "Notebook Set",
      brand: "StudyCorp",
      price: "$15.00",
      image:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop&crop=center",
      category: "Books & Stationery",
      isBestSeller: false,
    },
    {
      id: 8,
      name: "Handmade Pottery Vase",
      brand: "Artisan",
      price: "$45.00",
      image:
        "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=400&fit=crop&crop=center",
      category: "Handicrafts & Art",
      isBestSeller: false,
    },
  ];

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === "All Categories"
      ? allProducts
      : allProducts.filter((product) => product.category === selectedCategory);

  // Show only first 5 products
  const displayProducts = filteredProducts.slice(0, 5);

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

      <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {displayProducts.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-72 sm:w-80">
            <div className="bg-gray-100 rounded-2xl p-4 md:p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                {product.isBestSeller && (
                  <span className="bg-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium text-gray-700">
                    Best Seller
                  </span>
                )}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="ml-auto p-2 hover:bg-white rounded-full transition-colors duration-200"
                >
                  <Heart
                    className={`w-4 h-4 md:w-5 md:h-5 ${
                      favorites.has(product.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              </div>

              <div className="relative mb-4 md:mb-6 flex-grow">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 sm:h-48 object-cover rounded-lg"
                />

                <div className="flex justify-center mt-3 md:mt-4 space-x-2">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full"></div>
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-300 rounded-full"></div>
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-300 rounded-full"></div>
                </div>
              </div>

              <div className="space-y-2 md:space-y-3 mt-auto">
                <div>
                  <p className="text-xs md:text-sm text-gray-500 font-medium">
                    {product.brand}
                  </p>
                  <h3 className="font-semibold text-gray-900 text-base md:text-lg leading-tight line-clamp-2">
                    {product.name}
                  </h3>
                </div>

                <p className="text-lg md:text-xl font-bold text-gray-900">
                  {product.price}
                </p>
                <div className="flex justify-between gap-2 cursor-pointer">
                  <button
                    onClick={() => {
                      router.push("/buynow");
                    }}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2.5 rounded-lg font-medium transition-colors duration-200 text-sm "
                  >
                    Buy Now
                  </button>
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
    </section>
  );
};

export default Products;
