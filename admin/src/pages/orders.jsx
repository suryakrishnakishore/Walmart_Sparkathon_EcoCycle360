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
    <div className='orders-content'>
  <h2>ORDERS</h2>
  <input
    type="text"
    placeholder="Search by Order ID, Payment Mode, or Customer ID"
    value={search}
    onChange={e => setSearch(e.target.value)}
    className="orders-search-bar"
  />
  <div className="orders-header">
    <span>Order ID</span>
    <span>Product IDs</span>
    <span>Payment Mode</span>
    <span>Amount</span>
    <span>City</span>
    <span>State</span>
    <span>Country</span>
    <span>Ordered At</span>
    <span>Customer ID</span>
  </div>
  <div>
    {orders.map(order => (
      <div className="order-card" key={order.order_id}>
        <div className="order-id">{order.order_id}</div>
        <div className="order-products">
          {Array.isArray(order.product_ids) ? order.product_ids.join(', ') : order.product_ids}
        </div>
        <div className="order-payment">{order.payment_mode}</div>
        <div className="order-amount">{order.amount}</div>
        <div className="order-city">{order.city}</div>
        <div className="order-state">{order.state}</div>
        <div className="order-country">{order.country}</div>
        <div className="order-date">{formatDate(order.ordered_at)}</div>
        <div className="order-customer">{order.customer_id}</div>
      </div>
    ))}
  </div>
</div>

  );
}