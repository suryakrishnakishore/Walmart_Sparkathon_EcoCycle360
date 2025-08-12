import React, { useEffect, useState } from 'react';
import api from '../libs/apiCalls.js';
import { formatDate } from '../libs';

export default function Orders() {
  const [search, setSearch] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function getAllOrders() {
    try {
      setLoading(true);
      const { status, data: res } = await api.get("/orders/all");
      if (status === 200) {
        setOrders(res?.users || []);
      }
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch orders.");
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllOrders();
  }, []);

  // Filter orders based on search
  const filteredOrders = orders.filter(order =>
    String(order.order_id).includes(search) ||
    String(order.payment_mode).toLowerCase().includes(search.toLowerCase()) ||
    String(order.customer_id).includes(search)
  );

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <svg className="text-blue-500 mr-3" width="32" height="32" fill="none" viewBox="0 0 24 24">
          <rect width="24" height="24" rx="12" fill="#3b82f6" />
          <path d="M7 17l5-5 5 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 7h10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <h1 className="text-2xl font-bold text-blue-700">Orders</h1>
      </div>
      <input
        type="text"
        placeholder="Search by Order ID, Payment Mode, or Customer ID"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-4 w-full max-w-md px-4 py-2 border border-blue-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
      {loading ? (
        <div className="text-center text-blue-500 py-10">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-10">{error}</div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center text-gray-400 py-10">No orders found.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-blue-100 text-blue-700">
                <th className="py-3 px-4 text-left">Order ID</th>
                <th className="py-3 px-4 text-left">Product IDs</th>
                <th className="py-3 px-4 text-left">Payment Mode</th>
                <th className="py-3 px-4 text-left">Amount</th>
                <th className="py-3 px-4 text-left">City</th>
                <th className="py-3 px-4 text-left">State</th>
                <th className="py-3 px-4 text-left">Country</th>
                <th className="py-3 px-4 text-left">Ordered At</th>
                <th className="py-3 px-4 text-left">Customer ID</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.order_id} className="border-b hover:bg-blue-50 transition">
                  <td className="py-2 px-4 font-semibold text-blue-600">{order.order_id}</td>
                  <td className="py-2 px-4">
                    {Array.isArray(order.product_ids) ? order.product_ids.join(', ') : order.product_ids}
                  </td>
                  <td className="py-2 px-4">{order.payment_mode}</td>
                  <td className="py-2 px-4">{order.amount}</td>
                  <td className="py-2 px-4">{order.city}</td>
                  <td className="py-2 px-4">{order.state}</td>
                  <td className="py-2 px-4">{order.country}</td>
                  <td className="py-2 px-4">{formatDate(order.ordered_at)}</td>
                  <td className="py-2 px-4">{order.customer_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}