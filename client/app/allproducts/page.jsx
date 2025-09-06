"use client";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";

const AllProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
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

  // Generate exactly 32 products across different categories
  const allProducts = [
    // Fashion & Clothing (5 products)
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
      name: "Cotton T-Shirt",
      brand: "Basics",
      price: "$25.00",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center",
      category: "Fashion & Clothing",
      isBestSeller: false,
    },
    {
      id: 4,
      name: "Denim Jeans",
      brand: "Levi's",
      price: "$89.00",
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&crop=center",
      category: "Fashion & Clothing",
      isBestSeller: true,
    },
    {
      id: 5,
      name: "Winter Coat",
      brand: "WarmWear",
      price: "$120.00",
      image:
        "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop&crop=center",
      category: "Fashion & Clothing",
      isBestSeller: false,
    },

    // Electronics (5 products)
    {
      id: 6,
      name: 'MacBook Pro 13"',
      brand: "Apple",
      price: "$1299.00",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&crop=center",
      category: "Electronics",
      isBestSeller: true,
    },
    {
      id: 7,
      name: "iPhone 15",
      brand: "Apple",
      price: "$799.00",
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center",
      category: "Electronics",
      isBestSeller: true,
    },
    {
      id: 8,
      name: "Wireless Headphones",
      brand: "Sony",
      price: "$199.00",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center",
      category: "Electronics",
      isBestSeller: false,
    },
    {
      id: 9,
      name: "Gaming Keyboard",
      brand: "Razer",
      price: "$129.00",
      image:
        "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop&crop=center",
      category: "Electronics",
      isBestSeller: false,
    },
    {
      id: 10,
      name: "Smart Watch",
      brand: "TechTime",
      price: "$299.00",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center",
      category: "Electronics",
      isBestSeller: true,
    },

    // Home & Living (5 products)
    {
      id: 11,
      name: "Wooden Coffee Table",
      brand: "Home Decor",
      price: "$150.00",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center",
      category: "Home & Living",
      isBestSeller: false,
    },
    {
      id: 12,
      name: "Decorative Lamp",
      brand: "Ikea",
      price: "$45.00",
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop&crop=center",
      category: "Home & Living",
      isBestSeller: false,
    },
    {
      id: 13,
      name: "Throw Pillows Set",
      brand: "Comfort Co",
      price: "$35.00",
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop&crop=center",
      category: "Home & Living",
      isBestSeller: true,
    },
    {
      id: 14,
      name: "Wall Clock",
      brand: "TimeKeeper",
      price: "$65.00",
      image:
        "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400&h=400&fit=crop&crop=center",
      category: "Home & Living",
      isBestSeller: false,
    },
    {
      id: 15,
      name: "Kitchen Utensils Set",
      brand: "CookPro",
      price: "$55.00",
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center",
      category: "Home & Living",
      isBestSeller: false,
    },

    // Automotive (4 products)
    {
      id: 16,
      name: "Car Dashboard Camera",
      brand: "TechCar",
      price: "$89.00",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
      category: "Automotive",
      isBestSeller: true,
    },
    {
      id: 17,
      name: "Car Phone Mount",
      brand: "GripTech",
      price: "$25.00",
      image:
        "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=400&fit=crop&crop=center",
      category: "Automotive",
      isBestSeller: false,
    },
    {
      id: 18,
      name: "Tire Pressure Monitor",
      brand: "SafeDrive",
      price: "$55.00",
      image:
        "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=400&fit=crop&crop=center",
      category: "Automotive",
      isBestSeller: false,
    },
    {
      id: 19,
      name: "Car Air Freshener",
      brand: "FreshDrive",
      price: "$12.00",
      image:
        "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=400&fit=crop&crop=center",
      category: "Automotive",
      isBestSeller: false,
    },

    // Toys (4 products)
    {
      id: 20,
      name: "Children's Building Blocks",
      brand: "PlayTime",
      price: "$25.00",
      image:
        "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=400&h=400&fit=crop&crop=center",
      category: "Toys",
      isBestSeller: false,
    },
    {
      id: 21,
      name: "Remote Control Car",
      brand: "SpeedToy",
      price: "$45.00",
      image:
        "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=400&fit=crop&crop=center",
      category: "Toys",
      isBestSeller: true,
    },
    {
      id: 22,
      name: "Puzzle Game",
      brand: "BrainToy",
      price: "$15.00",
      image:
        "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=400&fit=crop&crop=center",
      category: "Toys",
      isBestSeller: false,
    },
    {
      id: 23,
      name: "Action Figure",
      brand: "HeroToy",
      price: "$35.00",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=400&fit=crop&crop=center",
      category: "Toys",
      isBestSeller: true,
    },

    // Books & Stationery (5 products)
    {
      id: 24,
      name: "Notebook Set",
      brand: "StudyCorp",
      price: "$15.00",
      image:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop&crop=center",
      category: "Books & Stationery",
      isBestSeller: false,
    },
    {
      id: 25,
      name: "Fountain Pen",
      brand: "WriteWell",
      price: "$35.00",
      image:
        "https://images.unsplash.com/photo-1565024200353-a5a3ba5c0ec1?w=400&h=400&fit=crop&crop=center",
      category: "Books & Stationery",
      isBestSeller: true,
    },
    {
      id: 26,
      name: "Art Sketchbook",
      brand: "Creative",
      price: "$20.00",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
      category: "Books & Stationery",
      isBestSeller: false,
    },
    {
      id: 27,
      name: "Desk Organizer",
      brand: "OfficeMax",
      price: "$28.00",
      image:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=center",
      category: "Books & Stationery",
      isBestSeller: false,
    },
    {
      id: 28,
      name: "Marker Set",
      brand: "ColorMax",
      price: "$18.00",
      image:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop&crop=center",
      category: "Books & Stationery",
      isBestSeller: false,
    },

    // Handicrafts & Art (4 products)
    {
      id: 29,
      name: "Handmade Pottery Vase",
      brand: "Artisan",
      price: "$45.00",
      image:
        "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=400&fit=crop&crop=center",
      category: "Handicrafts & Art",
      isBestSeller: false,
    },
    {
      id: 30,
      name: "Wooden Sculpture",
      brand: "CraftMaster",
      price: "$85.00",
      image:
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center",
      category: "Handicrafts & Art",
      isBestSeller: true,
    },
    {
      id: 31,
      name: "Handwoven Basket",
      brand: "WeaveCraft",
      price: "$30.00",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
      category: "Handicrafts & Art",
      isBestSeller: false,
    },
    {
      id: 32,
      name: "Ceramic Bowl Set",
      brand: "PotteryPro",
      price: "$65.00",
      image:
        "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=400&fit=crop&crop=center",
      category: "Handicrafts & Art",
      isBestSeller: false,
    },
  ];

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === "All Categories"
      ? allProducts
      : allProducts.filter((product) => product.category === selectedCategory);

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-gray-50 rounded-2xl p-6 flex flex-col h-full"
          >
            <div className="flex items-center justify-between mb-4 min-h-[28px]">
              {product.isBestSeller && (
                <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                  Best Seller
                </span>
              )}
            </div>

            <div className="mb-6 flex-shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg"
              />

              <div className="flex justify-center mt-4 space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
            </div>

            <div className="space-y-3 flex-grow flex flex-col">
              <div className="flex-grow">
                <p className="text-sm text-gray-500 font-medium">
                  {product.brand}
                </p>
                <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                  {product.name}
                </h3>
              </div>

              <p className="text-xl font-bold text-gray-900">{product.price}</p>

              <div className="flex justify-between gap-2">
                <button
                  onClick={() => {
                    router.push("/buynow");
                  }}
                  className="cursor-pointer w-full bg-gray-900 hover:bg-gray-800 text-white py-2.5 rounded-lg font-medium transition-colors duration-200 text-sm "
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
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
