"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Products from "@/components/Product";
import { FiArrowRight } from "react-icons/fi";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className="w-full h-full">
        <div className="px-16 py-3">
          <Navbar />
          <Hero />
        </div>
        <Products />
      </div>
      <div className="fixed bottom-7 right-7 z-50">
        <div
          onClick={() => router.push("/seller")}
          className="border border-gray-400 py-4 px-7 gap-3 text-sm rounded-full flex items-center justify-center bg-white cursor-pointer"
        >
          Sell your stuff
          <FiArrowRight />
        </div>
      </div>
    </>
  );
}
