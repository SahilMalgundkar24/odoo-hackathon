import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { FiArrowRight } from "react-icons/fi";

const Hero = () => {
  return (
    <section className="relative lg:p-16 p-5 h-[85vh]">
      <div className="rounded-2xl">
        <Image
          src="/Hero.jpeg"
          alt="Hero background"
          fill
          className="object-cover rounded-3xl"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50 rounded-2xl" />
      </div>

      <div className="relative z-10 w-full h-full flex items-center lg:px-10 px-0 py-24">
        <div className="">
          <h1 className="lg:text-6xl text-4xl font-medium text-white leading-tight mb-6">
            Give your items
            <br />a second life
          </h1>

          <p className="lg:text-xl text-lg text-white mb-10">
            Rent, sell, buy and give preloved items a new purpose with Apni
            Dukan.
          </p>

          <Button
            size="lg"
            className="bg-white text-black hover:bg-gray-100 px-16 py-6 rounded-lg font-medium mt-5"
          >
            Explore more
            <FiArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
