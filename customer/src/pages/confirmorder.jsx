import React from "react";

const ConfirmOrder = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Confirm Order</h2>
    <p>Review all entered details here before placing the order.</p>
    <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
      Place Order
    </button>
  </div>
);

export default ConfirmOrder;