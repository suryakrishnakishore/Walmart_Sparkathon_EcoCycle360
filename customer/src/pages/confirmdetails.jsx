import React from "react";

const cartItems = [
  { id: 1, name: "Cotton T-shirt", image: "shirt1.jpeg", price: 25, quantity: 1 },
  { id: 2, name: "Denims Jeans", image: "shirt2.webp", price: 32, quantity: 1 },
  { id: 3, name: "Black Frock", image: "dress4.webp", price: 65, quantity: 2 },
  { id: 4, name: "Lego's Sweatshirt", image: "shirt3.avif", price: 42, quantity: 1 },
];

const ConfirmDetails = () => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <img src={item.image} alt={item.name} className="w-15 h-15 rounded" />
            <span>{item.name} × {item.quantity}</span>
          </div>
          <span className="font-medium">$ {(item.price * item.quantity).toFixed(2)}</span>
        </div>
      ))}
      <hr className="my-3" />
      <div className="text-right font-bold">Total: $ {total.toFixed(2)}</div>
    </div>
  );
};

export default ConfirmDetails;