import React, { useEffect } from "react";
import { FiX, FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

const CartModal = ({ isOpen, onClose }) => {
	const router = useRouter();
	const {
		cartItems,
		updateQuantity,
		removeItem,
		getTotalPrice,
		getTotalItems,
	} = useCart();

	// Prevent body scroll when modal is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		// Cleanup function to restore scroll when component unmounts
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	return (
		<>
			{/* Backdrop */}
			<div
				className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
					isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
				}`}
				onClick={onClose}
			/>

			{/* Modal */}
			<div
				className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
					isOpen ? "translate-x-0" : "translate-x-full"
				}`}>
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-gray-200">
					<div>
						<h2 className="text-xl font-semibold text-gray-900">
							Shopping Cart
						</h2>
						<p className="text-sm text-gray-500">{getTotalItems()} items</p>
					</div>
					<button
						onClick={onClose}
						className="p-2 hover:bg-gray-100 rounded-full transition-colors">
						<FiX size={24} className="text-gray-600" />
					</button>
				</div>

				{/* Cart Items */}
				<div className="flex-1 overflow-y-auto p-6">
					{cartItems.length === 0 ? (
						<div className="text-center py-12">
							<div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
								<FiX size={24} className="text-gray-400" />
							</div>
							<p className="text-gray-500">Your cart is empty</p>
						</div>
					) : (
						<div className="space-y-4">
							{cartItems.map((item) => (
								<div
									key={item.id}
									className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
									{/* Product Image */}
									<div className="w-16 h-16 rounded-lg flex-shrink-0 overflow-hidden">
										<img
											src={item.image}
											alt={item.name}
											className="w-full h-full object-cover"
										/>
									</div>

									{/* Product Details */}
									<div className="flex-1 min-w-0">
										<h3 className="text-sm font-medium text-gray-900 truncate">
											{item.name}
										</h3>
										<p className="text-xs text-gray-500 mb-1">{item.brand}</p>
										<p className="text-sm text-gray-600">
											${item.price.toFixed(2)}
										</p>
									</div>

									{/* Quantity Controls */}
									<div className="flex items-center space-x-2">
										<button
											onClick={() => updateQuantity(item.id, item.quantity - 1)}
											className="p-1 hover:bg-gray-200 rounded-full transition-colors">
											<FiMinus size={16} className="text-gray-600" />
										</button>
										<span className="text-sm font-medium w-8 text-center">
											{item.quantity}
										</span>
										<button
											onClick={() => updateQuantity(item.id, item.quantity + 1)}
											className="p-1 hover:bg-gray-200 rounded-full transition-colors">
											<FiPlus size={16} className="text-gray-600" />
										</button>
									</div>

									{/* Remove Button */}
									<button
										onClick={() => removeItem(item.id)}
										className="p-1 hover:bg-red-100 rounded-full transition-colors">
										<FiTrash2 size={16} className="text-red-500" />
									</button>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Footer */}
				{cartItems.length > 0 && (
					<div className="border-t border-gray-200 p-6">
						<div className="flex justify-between items-center mb-4">
							<span className="text-lg font-semibold text-gray-900">
								Total:
							</span>
							<span className="text-lg font-bold text-gray-900">
								${getTotalPrice().toFixed(2)}
							</span>
						</div>
						<button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors mb-3">
							Proceed to Checkout
						</button>
						{/* <Button
							onClick={() => {
								router.push("/tempproduct");
								onClose();
							}}
							className="w-full">
							Temp Product Page
						</Button> */}
					</div>
				)}
			</div>
		</>
	);
};

export default CartModal;
