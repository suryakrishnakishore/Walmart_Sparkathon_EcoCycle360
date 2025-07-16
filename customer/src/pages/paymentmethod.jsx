import React from "react";

const PaymentMethod = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Select Payment</h2>
    <label className="block mb-2">
      <input type="radio" name="payment" className="mr-2" /> Credit/Debit Card
    </label>
    <label className="block mb-2">
      <input type="radio" name="payment" className="mr-2" /> UPI
    </label>
    <label className="block">
      <input type="radio" name="payment" className="mr-2" /> Cash on Delivery
    </label>
  </div>
);

export default PaymentMethod;