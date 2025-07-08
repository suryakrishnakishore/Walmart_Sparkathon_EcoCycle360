import React, { useEffect, useState } from 'react';
import '../styles/styles.css';
import api from '../libs/apiCalls.js';
import { formatDate } from '../libs';


export default function Orders() {
  const [search, setSearch] = useState('');
  const [ orders, setOrders ] = useState([]);

  async function getAllOrders() {
    try {
        const { status, data: res } = await api.get("/orders/all");
        if (status === 200) {
          setOrders(res?.users || []);
        }
      
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className='main-content'>
      <h2>ORDERS</h2>
      <input
        type="text"
        placeholder="Search by Order ID, Payment Mode, or Customer ID"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="search-bar"
      />
      <div className="customer-header">
        <span>Order ID</span>
        <span>Product IDs</span>
        <span>Payment Mode</span>
        <span>Amount</span>
        <span>Place</span>
        <span>City</span>
        <span>State</span>
        <span>Country</span>
        <span>Ordered At</span>
        <span>Customer ID</span>
      </div>
      <div>
        {orders.map(order => (
          <div className="customer-card" key={order.order_id}>
            <div className="customer-name">{order.order_id}</div>
            <div className="customer-email">{Array.isArray(order.product_ids) ? order.product_ids.join(', ') : order.product_ids}</div>
            <div className="customer-phone">{order.payment_mode}</div>
            <div className="customer-age">{order.amount}</div>
            <div className="customer-gender">{order.line1}</div>
            <div className="customer-gender">{order.city}</div>
            <div className="customer-gender">{order.state}</div>
            <div className="customer-gender">{order.country}</div>
            <div className="customer-age">{formatDate(order.ordered_at)}</div>
            <div className="customer-gender">{order.customer_id}</div>
          </div>
        ))}
      </div>
    </div>
  );
}