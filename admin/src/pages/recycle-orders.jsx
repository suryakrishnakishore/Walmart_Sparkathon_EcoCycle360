import React, { useEffect, useState } from "react";
import { FaRecycle, FaMapMarkerAlt, FaUser, FaClock } from "react-icons/fa";
import axios from "axios";

function RecycleOrders() {
  const [recycleOrders, setRecycleOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function getAllRecycleOrders () {
    try {
      setLoading(true);
      const { status, data: recyclables} = await api.get("/recyclables/all");
    if(status === 201) {
      setRecycleOrders(data);
    }
    } catch (err) {
      console.log(err);
    }
    finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getAllRecycleOrders();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <FaRecycle className="text-3xl text-emerald-500 mr-3" />
        <h1 className="text-2xl font-bold text-blue-700">Recycle Orders</h1>
      </div>
      {loading ? (
        <div className="text-center text-blue-500 py-10">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-10">{error}</div>
      ) : recycleOrders.length === 0 ? (
        <div className="text-center text-gray-400 py-10">No recycle orders found.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-emerald-100 text-emerald-700">
                <th className="py-3 px-4 text-left">Recycle ID</th>
                <th className="py-3 px-4 text-left">Customer</th>
                <th className="py-3 px-4 text-left">Placed At</th>
                <th className="py-3 px-4 text-left">Plastic (kg)</th>
                <th className="py-3 px-4 text-left">E-Waste (kg)</th>
                <th className="py-3 px-4 text-left">Books (kg)</th>
                <th className="py-3 px-4 text-left">Papers (kg)</th>
                <th className="py-3 px-4 text-left">Glass (kg)</th>
                <th className="py-3 px-4 text-left">Clothes (kg)</th>
                <th className="py-3 px-4 text-left">Shipment Address</th>
              </tr>
            </thead>
            <tbody>
              {recycleOrders.map((order) => (
                <tr key={order.recycle_id} className="border-b hover:bg-emerald-50 transition">
                  <td className="py-2 px-4 font-semibold text-blue-600">#{order.recycle_id}</td>
                  <td className="py-2 px-4 flex items-center gap-2">
                    <FaUser className="text-emerald-400" />
                    {order.customer_name || `User #${order.customer_id}`}
                  </td>
                  <td className="py-2 px-4 flex items-center gap-2">
                    <FaClock className="text-blue-400" />
                    {order.placed_at ? new Date(order.placed_at).toLocaleString() : "-"}
                  </td>
                  <td className="py-2 px-4">{order.plastic ?? 0}</td>
                  <td className="py-2 px-4">{order.e_waste ?? 0}</td>
                  <td className="py-2 px-4">{order.books ?? 0}</td>
                  <td className="py-2 px-4">{order.papers ?? 0}</td>
                  <td className="py-2 px-4">{order.glass ?? 0}</td>
                  <td className="py-2 px-4">{order.clothes ?? 0}</td>
                  <td className="py-2 px-4 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-emerald-400" />
                    {order.address_line
                      ? order.address_line
                      : order.shipment_address_id
                      ? `Address #${order.shipment_address_id}`
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RecycleOrders;