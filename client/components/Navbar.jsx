import React from "react";
import { FiSearch } from "react-icons/fi";
import { MdOutlineShoppingCart } from "react-icons/md";

const Navbar = () => {
	return (
		<div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6">
			<div className="w-1/3">
				<div>
					<img src="/images/logo.png" alt="Logo" />
				</div>
			</div>
			<div className="w-1/3 flex justify-center items-center gap-7">
				<h1 className="text-md text-black hover:text-gray-700 cursor-pointer transition-colors">
					Home
				</h1>
				<h1 className="text-md text-black hover:text-gray-700 cursor-pointer transition-colors">
					Explore
				</h1>
				<h1 className="text-md text-black hover:text-gray-700 cursor-pointer transition-colors">
					Rental Machines
				</h1>
				<h1 className="text-md text-black hover:text-gray-700 cursor-pointer transition-colors">
					Workshops
				</h1>
			</div>

			<div className="w-1/3 flex items-center justify-end">
				<div className="flex items-center bg-[#F7F7F7] bg-opacity-90 backdrop-blur-sm px-7 rounded-full">
					<input
						type="text"
						placeholder="Search"
						className="py-2 bg-transparent rounded-full placeholder-[#414141] focus:outline-none"
						suppressHydrationWarning
					/>
					<span className="text-gray-500 pointer-events-none ml-2">
						<FiSearch color="#9B9B9B" />
					</span>
				</div>
				<div>
					<MdOutlineShoppingCart size={30} className="ml-7" color="#909090" />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
