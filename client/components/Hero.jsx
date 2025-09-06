import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { FiArrowRight } from "react-icons/fi";

const Hero = () => {
	return (
		<section className="relative">
			<div className="absolute inset-0 z-0">
				<Image
					src="/Hero.jpeg"
					alt="Hero background"
					fill
					priority
					className="opacity-70"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20" />
			</div>

			<div className="relative z-10 w-full h-full flex items-center px-10 py-24">
				<div className="max-w-4xl">
					<h1 className="text-8xl font-medium text-white  leading-tight mb-6">
						Give your items
						<br />a second life
					</h1>

					<p className="text-2xl text-black mb-10 ml-2 font-medium">
						Rent, sell, buy and give preloved items a new purpose with Apni
						Dukan.
					</p>

					<Button
						size="lg"
						className="bg-white text-black hover:bg-gray-100 font-semibold px-8 py-5 rounded-lg text-lg mt-5">
						Explore more
						<FiArrowRight />
					</Button>
				</div>
			</div>
		</section>
	);
};

export default Hero;
