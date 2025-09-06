import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Image from "next/image";
import Products from "@/components/Product";

export default function Home() {
  return (
    <>
      <div className="w-full h-full">
        <Navbar />
        <Hero />
        <Products />
      </div>
    </>
  );
}
