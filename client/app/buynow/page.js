"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar";

const BuyNowPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    // Multiple products (hardcoded as requested)
    products: [
      {
        id: 1,
        title: "Premium Wireless Headphones",
        price: 299.99,
        quantity: 1,
        description:
          "Premium quality wireless headphones with noise cancellation",
        image: "🎧",
      },
      {
        id: 2,
        title: "Smart Fitness Watch",
        price: 199.99,
        quantity: 1,
        description: "Advanced fitness tracking with heart rate monitor",
        image: "⌚",
      },
      {
        id: 3,
        title: "Wireless Charging Pad",
        price: 49.99,
        quantity: 2,
        description: "Fast wireless charging for all compatible devices",
        image: "🔋",
      },
    ],

    // Customer information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Shipping address
    shippingAddress: "",
    shippingCity: "",
    shippingState: "",
    shippingZip: "",
    shippingCountry: "",

    // Payment information
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",

    // Billing address (same as shipping by default)
    sameAsShipping: true,
    billingAddress: "",
    billingCity: "",
    billingState: "",
    billingZip: "",
    billingCountry: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.map((product) =>
        product.id === productId
          ? { ...product, quantity: Math.max(1, newQuantity) }
          : product
      ),
    }));
  };

  const handleRemoveProduct = (productId) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.filter((product) => product.id !== productId),
    }));
  };

  const calculateTotal = () => {
    const subtotal = formData.products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    const tax = subtotal * 0.08; // 8% tax
    const shipping = subtotal > 100 ? 0 : 9.99; // Free shipping over $100
    const totalItems = formData.products.reduce(
      (sum, product) => sum + product.quantity,
      0
    );

    return {
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      shipping: shipping.toFixed(2),
      total: (subtotal + tax + shipping).toFixed(2),
      totalItems: totalItems,
    };
  };

  const totals = calculateTotal();

  const handleBuyNow = () => {
    // Here you would typically process the payment
    alert("Order placed successfully!");
    // Redirect to homepage after user clicks OK
    router.push("/");
  };

  return (
    <>
      <div className="lg:px-16 px-5 py-5">
        <Navbar />
      </div>
      <div className="min-h-screen py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Product Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Cart ({totals.totalItems} items)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {formData.products.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center space-x-4 p-4 border rounded-lg"
                      >
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                          {product.image}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">
                            {product.title}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xl font-bold text-green-600">
                              ${product.price}
                            </span>
                            <div className="flex items-center space-x-2">
                              <Label htmlFor={`quantity-${product.id}`}>
                                Qty:
                              </Label>
                              <div className="flex items-center border rounded-md">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleQuantityChange(
                                      product.id,
                                      product.quantity - 1
                                    )
                                  }
                                  className="rounded-r-none h-8 w-8 p-0"
                                >
                                  -
                                </Button>
                                <Input
                                  id={`quantity-${product.id}`}
                                  type="number"
                                  value={product.quantity}
                                  onChange={(e) =>
                                    handleQuantityChange(
                                      product.id,
                                      parseInt(e.target.value) || 1
                                    )
                                  }
                                  className="w-12 text-center border-0 rounded-none h-8"
                                  min="1"
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleQuantityChange(
                                      product.id,
                                      product.quantity + 1
                                    )
                                  }
                                  className="rounded-l-none h-8 w-8 p-0"
                                >
                                  +
                                </Button>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRemoveProduct(product.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                          <div className="text-right mt-1">
                            <span className="text-sm text-gray-500">
                              Subtotal: $
                              {(product.price * product.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}

                    {formData.products.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <p>Your cart is empty</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="shippingAddress">Address *</Label>
                    <Input
                      id="shippingAddress"
                      value={formData.shippingAddress}
                      onChange={(e) =>
                        handleInputChange("shippingAddress", e.target.value)
                      }
                      placeholder="Enter your address"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="shippingCity">City *</Label>
                      <Input
                        id="shippingCity"
                        value={formData.shippingCity}
                        onChange={(e) =>
                          handleInputChange("shippingCity", e.target.value)
                        }
                        placeholder="Enter city"
                      />
                    </div>
                    <div>
                      <Label htmlFor="shippingState">State *</Label>
                      <Input
                        id="shippingState"
                        value={formData.shippingState}
                        onChange={(e) =>
                          handleInputChange("shippingState", e.target.value)
                        }
                        placeholder="Enter state"
                      />
                    </div>
                    <div>
                      <Label htmlFor="shippingZip">ZIP Code *</Label>
                      <Input
                        id="shippingZip"
                        value={formData.shippingZip}
                        onChange={(e) =>
                          handleInputChange("shippingZip", e.target.value)
                        }
                        placeholder="Enter ZIP"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number *</Label>
                    <Input
                      id="cardNumber"
                      value={formData.cardNumber}
                      onChange={(e) =>
                        handleInputChange("cardNumber", e.target.value)
                      }
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date *</Label>
                      <Input
                        id="expiryDate"
                        value={formData.expiryDate}
                        onChange={(e) =>
                          handleInputChange("expiryDate", e.target.value)
                        }
                        placeholder="MM/YY"
                        maxLength="5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV *</Label>
                      <Input
                        id="cvv"
                        value={formData.cvv}
                        onChange={(e) =>
                          handleInputChange("cvv", e.target.value)
                        }
                        placeholder="123"
                        maxLength="4"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardName">Name on Card *</Label>
                      <Input
                        id="cardName"
                        value={formData.cardName}
                        onChange={(e) =>
                          handleInputChange("cardName", e.target.value)
                        }
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Product Breakdown */}
                  <div className="space-y-2 border-b pb-4">
                    {formData.products.map((product) => (
                      <div
                        key={product.id}
                        className="flex justify-between text-sm"
                      >
                        <span className="flex-1">
                          {product.title} × {product.quantity}
                        </span>
                        <span className="font-medium">
                          ${(product.price * product.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>
                        Subtotal ({totals.totalItems} item
                        {totals.totalItems > 1 ? "s" : ""})
                      </span>
                      <span>${totals.subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>
                        {parseFloat(totals.shipping) === 0
                          ? "Free"
                          : `$${totals.shipping}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${totals.tax}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${totals.total}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleBuyNow}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 text-lg"
                    size="lg"
                  >
                    Buy Now - ${totals.total}
                  </Button>

                  <div className="text-xs text-gray-500 text-center">
                    <p>🔒 Secure checkout powered by SSL</p>
                    <p>Your payment information is encrypted and secure</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyNowPage;
