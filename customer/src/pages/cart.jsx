import React, { useState } from "react";

const initialCartItems = [
  { id: 1, name: "Cotton T-shirt", image: "shirt1.jpeg", price: 25, quantity: 1 },
  { id: 2, name: "Denims Jeans", image: "shirt2.webp", price: 32, quantity: 1 },
  { id: 3, name: "Black Frock", image: "dress4.webp", price: 65, quantity: 2 },
  { id: 4, name: "Lego's Sweatshirt", image: "shirt3.avif", price: 42, quantity: 1 },
];

function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleQuantityChange = (id, delta) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) } 
          : item
      )
    );
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = 0, taxes = 3.8, discount = 5;
  const finalPrice = totalPrice + taxes - discount;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-green-50 py-28 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 bg-white rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.2)] p-6">

        {/* Cart Section */}
        <div className="flex-1">
          <div className="text-2xl font-bold mb-4">Shopping Cart</div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
                <div>
                  <div className="text-gray-700">Shirt</div>
                  <div className="font-semibold w-40">{item.name}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="border px-2 rounded"
                  onClick={() => handleQuantityChange(item.id, -1)}
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  className="border px-2 rounded"
                  onClick={() => handleQuantityChange(item.id, 1)}
                >
                  +
                </button>
              </div>
              <div className="font-semibold">$ {item.price.toFixed(2)}</div>
              <button className="text-red-500 font-bold text-xl">×</button>
            </div>
          ))}
          <div className="mt-6 text-green-600 cursor-pointer hover:underline">← Back to shop</div>
        </div>

        {/* Summary Section */}
        <div className="w-full md:w-1/3 bg-gradient-to-b from-green-50 via-white to-white rounded-xl p-6 shadow-lg border border-green-200">
          <div className="text-xl font-bold text-green-800 mb-4">Summary</div>
          <hr className="border-green-200 mb-4" />

          <div className="flex justify-between py-2 text-sm text-gray-700">
            <span>Products</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 text-sm text-gray-700">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="flex justify-between py-2 text-sm text-gray-700">
            <span>Discount</span>
            <span>– $5.00</span>
          </div>
          <div className="flex justify-between py-2 text-sm text-gray-700">
            <span>Estimated Tax</span>
            <span>${taxes.toFixed(2)}</span>
          </div>

          <hr className="border-green-200 my-4" />

          <div className="flex justify-between font-semibold text-base text-green-900">
            <span>Total (incl. VAT)</span>
            <span>${finalPrice.toFixed(2)}</span>
          </div>

          <p className="text-xs mt-2 text-gray-500">Delivery expected: 2–4 business days</p>

          <button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md shadow-md">
            GO TO CHECKOUT
          </button>
        </div>

      </div>
    </div>
  );
}

export default Cart;
