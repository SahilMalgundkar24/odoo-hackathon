import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi";
import CartModal from "./CartModal";
import { Pacifico } from "next/font/google";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

const pacifico = Pacifico({
	subsets: ["latin"],
	weight: "400",
});

const Navbar = () => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const router = useRouter();
	const { getTotalItems } = useCart();

	const totalItems = getTotalItems();

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

	return (
		<>
			{/* Desktop Navbar */}
			<div className="hidden md:flex items-center justify-between pb-3">
				<div className="w-1/3">
					<div>
						<button
							onClick={() => router.push("/")}
							className={`${pacifico.className} text-2xl hover:opacity-70 transition-opacity cursor-pointer`}>
							EcoFinds
						</button>
					</div>
				</div>
				<div className="w-1/3 flex justify-center items-center gap-7">
					<button
						onClick={() => router.push("/")}
						className="text-sm hover:text-gray-600 transition-colors cursor-pointer">
						Home
					</button>
					<button
						onClick={() => router.push("/allproducts")}
						className="text-sm hover:text-gray-600 transition-colors cursor-pointer">
						Explore
					</button>
					<button
						onClick={() => router.push("/rentalproducts")}
						className="text-sm hover:text-gray-600 transition-colors cursor-pointer">
						Rental Machines
					</button>
					<button
						onClick={() => router.push("/profile")}
						className="text-sm hover:text-gray-600 transition-colors cursor-pointer">
						Profile
					</button>
				</div>

				<div className="w-1/3 flex items-center justify-end">
					<div className="flex items-center bg-[#F7F7F7] px-7 rounded-full">
						<input
							type="text"
							placeholder="Search"
							className="py-2 rounded-full placeholder-[#414141] focus:outline-none"
							suppressHydrationWarning
						/>
						<span className=" text-gray-500 pointer-events-none ml-2">
							<FiSearch color="#9B9B9B" />
						</span>
					</div>
					<div className="relative">
						<button
							suppressHydrationWarning
							onClick={toggleCart}
							className="ml-7 hover:opacity-70 transition-opacity cursor-pointer">
							<MdOutlineShoppingCart size={30} color="#909090" />
						</button>
						{totalItems > 0 && (
							<div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
								{totalItems > 99 ? "99+" : totalItems}
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Mobile Navbar */}
			<div className="md:hidden flex items-center justify-between pb-3">
				{/* Logo */}
				<div>
					<button
						onClick={() => router.push("/")}
						className={`${pacifico.className} text-xl hover:opacity-70 transition-opacity cursor-pointer`}>
						EcoFinds
					</button>
				</div>

				{/* Right side - Cart and Hamburger */}
				<div className="flex items-center gap-4">
					<div className="relative">
						<button
							suppressHydrationWarning
							onClick={toggleCart}
							className="hover:opacity-70 transition-opacity cursor-pointer">
							<MdOutlineShoppingCart size={24} color="#909090" />
						</button>
						{totalItems > 0 && (
							<div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
								{totalItems > 99 ? "99+" : totalItems}
							</div>
						)}
					</div>

					<button
						onClick={toggleMobileMenu}
						className="hover:opacity-70 transition-opacity cursor-pointer">
						{isMobileMenuOpen ? (
							<HiX size={24} color="#909090" />
						) : (
							<HiMenu size={24} color="#909090" />
						)}
					</button>
				</div>
			</div>

			{/* Mobile Menu Overlay */}
			{isMobileMenuOpen && (
				<div
					className="md:hidden fixed inset-0 z-50 bg-black/50"
					onClick={toggleMobileMenu}>
					<div
						className="absolute right-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out"
						onClick={(e) => e.stopPropagation()}>
						<div className="p-6">
							{/* Close button */}
							<div className="flex justify-end mb-6">
								<button
									onClick={toggleMobileMenu}
									className="hover:opacity-70 transition-opacity cursor-pointer">
									<HiX size={24} color="#909090" />
								</button>
							</div>

							{/* Search Bar */}
							<div className="mb-8">
								<div className="flex items-center bg-[#F7F7F7] px-4 rounded-full">
									<input
										type="text"
										placeholder="Search"
										className="py-3 w-full rounded-full placeholder-[#414141] focus:outline-none bg-transparent"
										suppressHydrationWarning
									/>
									<span className="text-gray-500 pointer-events-none ml-2">
										<FiSearch color="#9B9B9B" />
									</span>
								</div>
							</div>

							{/* Navigation Links */}
							<nav className="space-y-4">
								<button
									onClick={() => handleNavigation("/")}
									className="block text-lg font-medium text-gray-800 hover:text-gray-600 transition-colors text-left w-full">
									Home
								</button>
								<button
									onClick={() => handleNavigation("/allproducts")}
									className="block text-lg font-medium text-gray-800 hover:text-gray-600 transition-colors text-left w-full">
									Explore
								</button>
								<button
									onClick={() => handleNavigation("/rentalproducts")}
									className="block text-lg font-medium text-gray-800 hover:text-gray-600 transition-colors text-left w-full">
									Rental Machines
								</button>
								<button
									onClick={() => handleNavigation("/profile")}
									className="block text-lg font-medium text-gray-800 hover:text-gray-600 transition-colors text-left w-full">
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
