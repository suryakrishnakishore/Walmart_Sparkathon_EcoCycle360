import React, { useState } from "react";

const AddressForm = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Kesav Kolli",
      street: "RR Enclave, Sivaji Palem",
      city: "Visakhapatnam",
      postalCode: "530017",
    },
    {
      id: 2,
      name: "Anudeep ",
      street: "MVV City , Pm palem",
      city: "Visakhapatnam",
      postalCode: "530041",
    },
  ]);
  const [selectedId, setSelectedId] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    postalCode: "",
  });

  const handleAdd = () => {
    const id = addresses.length + 1;
    setAddresses([...addresses, { id, ...newAddress }]);
    setSelectedId(id);
    setNewAddress({ name: "", street: "", city: "", postalCode: "" });
    setShowForm(false);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Select Delivery Address</h2>
      <div className="space-y-4">
        {addresses.map((addr) => (
          <label
            key={addr.id}
            className={`block border rounded p-3 cursor-pointer ${selectedId === addr.id ? "border-green-500 bg-green-50" : "border-gray-300"}`}
          >
            <input
              type="radio"
              name="address"
              value={addr.id}
              checked={selectedId === addr.id}
              onChange={() => setSelectedId(addr.id)}
              className="mr-2"
            />
            <span className="font-medium">{addr.name}</span>
            <div className="text-sm text-gray-600">
              {addr.street}, {addr.city}, {addr.postalCode}
            </div>
          </label>
        ))}
      </div>
      {!showForm ? (
        <button onClick={() => setShowForm(true)} className="mt-4 text-green-600 underline">
          + Add New Address
        </button>
      ) : (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-medium mb-2">Add New Address</h3>
          <div className="space-y-2">
            <input placeholder="Name" value={newAddress.name} onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })} className="border rounded p-2 w-full" />
            <input placeholder="Street" value={newAddress.street} onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })} className="border rounded p-2 w-full" />
            <input placeholder="City" value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} className="border rounded p-2 w-full" />
            <input placeholder="Postal Code" value={newAddress.postalCode} onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })} className="border rounded p-2 w-full" />
          </div>
          <button onClick={handleAdd} className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Save Address
          </button>
        </div>
      )}
    </div>
  );
};

export default AddressForm;