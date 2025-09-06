"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className="px-16 py-5">
        <Navbar />
        <Hero />
      </div>
      <div className="absolute bottom-7 right-7">
        <div
          onClick={() => router.push("/seller")}
          className="border border-gray-400 p-4 text-sm rounded-full flex items-center justify-center cursor-pointer"
        >
          Sell your stuff
        </div>
      </div>
    </>
  );
}
