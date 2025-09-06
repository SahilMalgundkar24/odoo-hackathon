import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdOutlineShoppingCart } from "react-icons/md";
import CartModal from "./CartModal";

const Navbar = () => {
	return (
		<div className="flex items-center justify-between">
			<div className="w-1/3">
				<div>
					<img src="/images/logo.png" />
				</div>
			</div>
			<div className="w-1/3 flex justify-center items-center gap-7">
				<h1 className="text-sm">Home</h1>
				<h1 className="text-sm">Explore</h1>
				<h1 className="text-sm">Rental Machines</h1>
				<h1 className="text-sm">Workshops</h1>
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
				<div>
					<MdOutlineShoppingCart size={30} className="ml-7" color="#909090" />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
