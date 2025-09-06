"use client";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import { X } from "lucide-react";

const page = () => {
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dummy rental machines data
  const rentalMachines = [
    {
      id: 1,
      name: "Heavy Duty Excavator",
      brand: "Caterpillar",
      price: "$150/day",
      image:
        "https://plus.unsplash.com/premium_photo-1682144572574-2305752c0f63?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Professional grade excavator perfect for construction and excavation projects. Features advanced hydraulic system and comfortable operator cabin.",
      specifications:
        "Weight: 25 tons, Engine: 6-cylinder diesel, Max digging depth: 6.5m",
    },
    {
      id: 2,
      name: "Concrete Mixer Truck",
      brand: "Volvo",
      price: "$200/day",
      image:
        "https://plus.unsplash.com/premium_photo-1682144932026-f5ea5364757a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Reliable concrete mixer truck for large construction projects. Delivers fresh concrete directly to your job site with consistent quality.",
      specifications:
        "Capacity: 8 cubic meters, Engine: 6-cylinder turbo, Mixing speed: 12-15 RPM",
    },
    {
      id: 3,
      name: "Crane Truck",
      brand: "Manitex",
      price: "$300/day",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=400&fit=crop&crop=center",
      description:
        "Versatile crane truck ideal for lifting and moving heavy materials. Features extendable boom and precise control system.",
      specifications:
        "Lifting capacity: 25 tons, Boom length: 30m, Engine: 8-cylinder diesel",
    },
    {
      id: 4,
      name: "Bulldozer",
      brand: "Komatsu",
      price: "$180/day",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=400&fit=crop&crop=center",
      description:
        "Powerful bulldozer for earthmoving and grading operations. Built for durability and performance in tough working conditions.",
      specifications:
        "Weight: 20 tons, Blade width: 3.5m, Engine: 6-cylinder turbo diesel",
    },
    {
      id: 5,
      name: "Forklift Truck",
      brand: "Toyota",
      price: "$120/day",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=400&fit=crop&crop=center",
      description:
        "Industrial forklift perfect for warehouse and loading operations. Features excellent maneuverability and lifting capacity.",
      specifications:
        "Lifting capacity: 3 tons, Lift height: 6m, Engine: 4-cylinder diesel",
    },
    {
      id: 6,
      name: "Backhoe Loader",
      brand: "Case",
      price: "$160/day",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=400&fit=crop&crop=center",
      description:
        "Multi-purpose backhoe loader combining digging and loading capabilities. Perfect for utility work and small construction projects.",
      specifications:
        "Digging depth: 4.5m, Bucket capacity: 1.2m³, Engine: 4-cylinder turbo",
    },
    {
      id: 7,
      name: "Skid Steer Loader",
      brand: "Bobcat",
      price: "$100/day",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=400&fit=crop&crop=center",
      description:
        "Compact skid steer loader for tight spaces and versatile applications. Easy to operate and highly maneuverable.",
      specifications:
        "Operating weight: 2.5 tons, Lift capacity: 1.2 tons, Engine: 3-cylinder diesel",
    },
    {
      id: 8,
      name: "Dump Truck",
      brand: "Freightliner",
      price: "$220/day",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=400&fit=crop&crop=center",
      description:
        "Heavy-duty dump truck for transporting materials and debris. Features hydraulic dump bed and reliable performance.",
      specifications:
        "Payload capacity: 15 tons, Bed capacity: 10m³, Engine: 6-cylinder diesel",
    },
  ];

  const handleMachineClick = (machine) => {
    setSelectedMachine(machine);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMachine(null);
  };

  const handleRentNow = () => {
    // Handle rent now functionality
    alert(`Renting ${selectedMachine.name} for ${selectedMachine.price}`);
    closeModal();
  };

  return (
    <div className="lg:px-16 px-5 py-5 bg-white min-h-screen">
      <Navbar />

      <div className="w-full">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Rental Machines
        </h1>

        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Professional construction and industrial equipment available for rent.
          All machines are well-maintained and ready for your next project.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {rentalMachines.map((machine) => (
            <div
              key={machine.id}
              className="bg-gray-50 rounded-2xl p-6 flex flex-col h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => handleMachineClick(machine)}
            >
              <div className="mb-6 flex-shrink-0">
                <img
                  src={machine.image}
                  alt={machine.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>

              <div className="space-y-3 flex-grow flex flex-col">
                <div className="flex-grow">
                  <p className="text-sm text-gray-500 font-medium">
                    {machine.brand}
                  </p>
                  <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                    {machine.name}
                  </h3>
                </div>

                <p className="text-xl font-bold text-gray-900">
                  {machine.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rental Modal */}
      {isModalOpen && selectedMachine && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    {selectedMachine.brand}
                  </p>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedMachine.name}
                  </h2>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Machine Image */}
              <div className="mb-6">
                <img
                  src={selectedMachine.image}
                  alt={selectedMachine.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              {/* Price */}
              <div className="mb-6">
                <p className="text-3xl font-bold text-gray-900">
                  {selectedMachine.price}
                </p>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {selectedMachine.description}
                </p>
              </div>

              {/* Specifications */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Specifications
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {selectedMachine.specifications}
                </p>
              </div>

              {/* Rent Now Button */}
              <button
                onClick={handleRentNow}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-lg font-medium transition-colors duration-200 text-lg"
              >
                Rent Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
