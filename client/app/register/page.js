"use client";
import React, { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "buyer", // default value
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    axios
      .post("http://localhost:3030/register", formData)
      .then((response) => {
        console.log("Success:", response.data);
        if (response.data.success) {
          Cookies.set('token', response.data.token, { expires: 30 }); // Token expires in 30 days
          alert("Registration successful!");
          window.location.href = "/";
        }
      })
      .catch((error) => {
        alert.error("There was an error!", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-center text-3xl font-bold">Register</h2>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              />
            </div>

            <div>
              <label
                htmlFor="userType"
                className="block text-sm font-medium text-gray-700"
              >
                I am a
              </label>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              >
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}