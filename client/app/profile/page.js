"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  Package,
  TrendingUp,
  DollarSign,
  Eye,
  Star,
  User,
  Store,
  Calendar,
  MapPin,
  X,
  Trash2,
  Loader2,
} from "lucide-react";

const ProfilePage = () => {
  const [userRole, setUserRole] = useState("buyer");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listedProducts, setListedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock data for purchased products (buyer view)
  const purchasedProducts = [
    {
      id: 1,
      name: 'MacBook Pro 13"',
      brand: "Apple",
      price: "1299.00",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&crop=center",
      purchaseDate: "2024-01-15",
      status: "Delivered",
      rating: 5,
    },
    {
      id: 2,
      name: "Wireless Headphones",
      brand: "Sony",
      price: "199.00",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center",
      purchaseDate: "2024-01-10",
      status: "Shipped",
      rating: 4,
    },
    {
      id: 3,
      name: "Denim Jeans",
      brand: "Levi's",
      price: "89.00",
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&crop=center",
      purchaseDate: "2024-01-05",
      status: "Delivered",
      rating: 5,
    },
  ];

  // Fetch user's products from the backend
  const fetchUserProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = Cookies.get("token");
      if (!token) {
        setError("No authentication token found. Please log in.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "http://localhost:3030/api/products/seller",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          setError("Authentication failed. Please log in again.");
          Cookies.remove("token");
        } else {
          setError("Failed to fetch products. Please try again.");
        }
        setLoading(false);
        return;
      }

      const data = await response.json();
      if (data.success) {
        setListedProducts(data.products || []);
      } else {
        setError(data.message || "Failed to fetch products");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch products when component mounts or when switching to seller view
  useEffect(() => {
    if (userRole === "seller") {
      fetchUserProducts();
    }
  }, [userRole]);

  // Calculate analytics from fetched products
  const sellerAnalytics = {
    totalSales: listedProducts.length, // This would need to be calculated from actual sales data
    totalRevenue: listedProducts
      .reduce((sum, product) => sum + parseFloat(product.price), 0)
      .toFixed(2),
    totalViews: listedProducts.reduce(
      (sum, product) => sum + (product.views || 0),
      0
    ),
    averageRating: 4.8, // This would need to be calculated from actual ratings
  };

  // Modal functions
  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const deleteProduct = async (productId) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        setError("No authentication token found. Please log in.");
        return;
      }

      const response = await fetch(
        `http://localhost:3030/api/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Remove product from local state
        setListedProducts((prev) =>
          prev.filter((product) => product._id !== productId)
        );
        closeModal();
      } else {
        const data = await response.json();
        setError(data.message || "Failed to delete product");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Network error. Please try again.");
    }
  };

  const BuyerDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <ShoppingBag className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Orders
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {purchasedProducts.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Purchases */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>Recent Purchases</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {purchasedProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center space-x-4 p-4 border rounded-lg"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {product.name}
                  </h3>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">₹{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const SellerDashboard = () => (
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-red-600">
              <span className="text-sm">{error}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setError(null)}
                className="ml-auto"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Products
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {listedProducts.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{sellerAnalytics.totalRevenue}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">
                  {sellerAnalytics.totalViews}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {sellerAnalytics.averageRating}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Listed Products */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Store className="h-5 w-5" />
              <span>Your Listed Products</span>
            </div>
            <Button
              onClick={fetchUserProducts}
              disabled={loading}
              variant="outline"
              size="sm"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Refresh"
              )}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading && listedProducts.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              <span className="ml-2 text-gray-600">
                Loading your products...
              </span>
            </div>
          ) : listedProducts.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No products listed yet.</p>
              <p className="text-sm text-gray-500 mt-1">
                Start selling by adding your first product!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {listedProducts.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center space-x-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => openProductModal(product)}
                >
                  <img
                    src={
                      product.images && product.images.length > 0
                        ? `http://localhost:3030${product.images[0].url}`
                        : "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center"
                    }
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600">{product.category}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-bold text-gray-900">₹{product.price}</p>
                    <p className="text-xs text-gray-500">
                      Listed {new Date(product.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  // Product Details Modal
  const ProductModal = () => {
    if (!isModalOpen || !selectedProduct) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Product Details
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Product Content */}
            <div className="space-y-6">
              {/* Product Image */}
              <div className="flex justify-center">
                <img
                  src={
                    selectedProduct.images && selectedProduct.images.length > 0
                      ? `http://localhost:3030${selectedProduct.images[0].url}`
                      : "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center"
                  }
                  alt={selectedProduct.name}
                  className="w-full max-w-md h-64 object-cover rounded-lg"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-gray-600">{selectedProduct.category}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Description
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Price</h4>
                    <p className="text-2xl font-bold text-green-600">
                      ₹{selectedProduct.price}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      Listed Date
                    </h4>
                    <p className="text-gray-600">
                      {new Date(selectedProduct.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-6 border-t">
                <Button
                  onClick={() => deleteProduct(selectedProduct._id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Product
                </Button>
                <Button
                  onClick={closeModal}
                  variant="outline"
                  className="flex-1"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="lg:px-16 px-5 py-5 min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Manage your account and view your activity
          </p>
        </div>

        {/* Role Toggle */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg w-fit">
            <Button
              variant={userRole === "buyer" ? "default" : "ghost"}
              onClick={() => setUserRole("buyer")}
              className={`px-6 py-2 rounded-md transition-colors ${
                userRole === "buyer"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <User className="h-4 w-4 mr-2" />
              Buyer View
            </Button>
            <Button
              variant={userRole === "seller" ? "default" : "ghost"}
              onClick={() => setUserRole("seller")}
              className={`px-6 py-2 rounded-md transition-colors ${
                userRole === "seller"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Store className="h-4 w-4 mr-2" />
              Seller View
            </Button>
          </div>
        </div>

        {/* Dashboard Content */}
        {userRole === "buyer" ? <BuyerDashboard /> : <SellerDashboard />}
      </div>

      {/* Product Modal */}
      <ProductModal />
    </div>
  );
};

export default ProfilePage;
