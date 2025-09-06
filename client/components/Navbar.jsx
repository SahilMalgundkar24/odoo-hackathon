import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import CartModal from "./CartModal";
import { Pacifico } from "next/font/google";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import Cookies from "js-cookie";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
});

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();
  const { getTotalItems } = useCart();

  const totalItems = getTotalItems();

  // Check authentication status on component mount
  useEffect(() => {
    const token = Cookies.get("token");
    const user = Cookies.get("username");

    if (token && user) {
      setIsAuthenticated(true);
      setUsername(user);
    } else {
      setIsAuthenticated(false);
      setUsername("");
    }
  }, []);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (path) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    // Remove cookies
    Cookies.remove("token");
    Cookies.remove("username");

    // Update state
    setIsAuthenticated(false);
    setUsername("");

    // Close mobile menu if open
    setIsMobileMenuOpen(false);

    // Redirect to home page
    router.push("/");
  };

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-between pb-3">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <button
            onClick={() => router.push("/")}
            className={`${pacifico.className} text-2xl hover:opacity-70 transition-opacity cursor-pointer`}
          >
            EcoFinds
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center items-center gap-8 flex-1 max-w-md mx-8">
          <button
            onClick={() => router.push("/")}
            className="text-sm hover:text-gray-600 transition-colors cursor-pointer whitespace-nowrap"
          >
            Home
          </button>
          <button
            onClick={() => router.push("/allproducts")}
            className="text-sm hover:text-gray-600 transition-colors cursor-pointer whitespace-nowrap"
          >
            Explore
          </button>
          <button
            onClick={() => router.push("/rentalproducts")}
            className="text-sm hover:text-gray-600 transition-colors cursor-pointer whitespace-nowrap"
          >
            Rental Machines
          </button>
          <button
            onClick={() => router.push("/profile")}
            className="text-sm hover:text-gray-600 transition-colors cursor-pointer whitespace-nowrap"
          >
            Profile
          </button>
        </div>

        {/* Right Section - Search, Auth, Cart */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Search Bar */}
          <div className="flex items-center bg-[#F7F7F7] px-4 py-2 rounded-full min-w-[200px]">
            <input
              type="text"
              placeholder="Search"
              className="flex-1 bg-transparent placeholder-[#414141] focus:outline-none text-sm"
              suppressHydrationWarning
            />
            <span className="text-gray-500 pointer-events-none ml-2">
              <FiSearch color="#9B9B9B" size={16} />
            </span>
          </div>

          {/* Authentication Section */}
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 whitespace-nowrap">
                Welcome, {username}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 transition-colors cursor-pointer px-2 py-1 rounded hover:bg-gray-100"
              >
                <FiLogOut size={14} />
                <span className="hidden lg:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/login")}
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors cursor-pointer px-2 py-1 rounded hover:bg-gray-100 whitespace-nowrap"
              >
                Login
              </button>
              <button
                onClick={() => router.push("/register")}
                className="text-sm bg-gray-900 text-white hover:bg-gray-800 transition-colors cursor-pointer px-3 py-1 rounded whitespace-nowrap"
              >
                Register
              </button>
            </div>
          )}

          {/* Cart */}
          <div className="relative">
            <button
              suppressHydrationWarning
              onClick={toggleCart}
              className="hover:opacity-70 transition-opacity cursor-pointer p-1"
            >
              <MdOutlineShoppingCart size={24} color="#909090" />
            </button>
            {totalItems > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {totalItems > 99 ? "99+" : totalItems}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between pb-3">
        {/* Logo */}
        <div className="flex-shrink-0">
          <button
            onClick={() => router.push("/")}
            className={`${pacifico.className} text-xl hover:opacity-70 transition-opacity cursor-pointer`}
          >
            EcoFinds
          </button>
        </div>

        {/* Right side - Cart and Hamburger */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              suppressHydrationWarning
              onClick={toggleCart}
              className="hover:opacity-70 transition-opacity cursor-pointer p-1"
            >
              <MdOutlineShoppingCart size={22} color="#909090" />
            </button>
            {totalItems > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                {totalItems > 99 ? "99+" : totalItems}
              </div>
            )}
          </div>

          <button
            onClick={toggleMobileMenu}
            className="hover:opacity-70 transition-opacity cursor-pointer p-1"
          >
            {isMobileMenuOpen ? (
              <HiX size={22} color="#909090" />
            ) : (
              <HiMenu size={22} color="#909090" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/50"
          onClick={toggleMobileMenu}
        >
          <div
            className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-lg transform transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 h-full flex flex-col">
              {/* Close button */}
              <div className="flex justify-end mb-6">
                <button
                  onClick={toggleMobileMenu}
                  className="hover:opacity-70 transition-opacity cursor-pointer p-1"
                >
                  <HiX size={24} color="#909090" />
                </button>
              </div>

              {/* Search Bar */}
              <div className="mb-6">
                <div className="flex items-center bg-[#F7F7F7] px-4 py-3 rounded-full">
                  <input
                    type="text"
                    placeholder="Search"
                    className="flex-1 bg-transparent placeholder-[#414141] focus:outline-none"
                    suppressHydrationWarning
                  />
                  <span className="text-gray-500 pointer-events-none ml-2">
                    <FiSearch color="#9B9B9B" size={18} />
                  </span>
                </div>
              </div>

              {/* Authentication Section */}
              {isAuthenticated ? (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-3 font-medium">
                    Welcome, {username}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                  >
                    <FiLogOut size={16} />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="mb-6 flex gap-3">
                  <button
                    onClick={() => handleNavigation("/login")}
                    className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleNavigation("/register")}
                    className="flex-1 py-3 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                  >
                    Register
                  </button>
                </div>
              )}

              {/* Navigation Links */}
              <nav className="space-y-2 flex-1">
                <button
                  onClick={() => handleNavigation("/")}
                  className="block text-lg font-medium text-gray-800 hover:text-gray-600 transition-colors text-left w-full py-3 px-2 rounded-lg hover:bg-gray-50"
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavigation("/allproducts")}
                  className="block text-lg font-medium text-gray-800 hover:text-gray-600 transition-colors text-left w-full py-3 px-2 rounded-lg hover:bg-gray-50"
                >
                  Explore
                </button>
                <button
                  onClick={() => handleNavigation("/rentalproducts")}
                  className="block text-lg font-medium text-gray-800 hover:text-gray-600 transition-colors text-left w-full py-3 px-2 rounded-lg hover:bg-gray-50"
                >
                  Rental Machines
                </button>
                <button
                  onClick={() => handleNavigation("/profile")}
                  className="block text-lg font-medium text-gray-800 hover:text-gray-600 transition-colors text-left w-full py-3 px-2 rounded-lg hover:bg-gray-50"
                >
                  Profile
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
