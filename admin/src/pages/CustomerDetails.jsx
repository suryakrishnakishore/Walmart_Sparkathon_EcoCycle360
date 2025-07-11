import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../libs/apiCalls';
import { formatCurrency, formatDate, getDate } from '../libs';

export default function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState({
    customer: true,
    orders: true,
    recyclables: true,
  });
  const [error, setError] = useState({
    customer: null,
    orders: null,
    recyclables: null,
  });
  const [customer, setCustomer] = useState(null);
  const [customerOrders, setCustomerOrders] = useState([]);
  const [customerRecyclables, setCustomerRecyclables] = useState([]);

  async function getCustomer() {
    try {
      const { status, data: res } = await api.get(`/user/${id}`);
      if (status === 200) {
        setCustomer(res?.user || {});
      }
    } catch (err) {
      setError((prev) => ({ ...prev, customer: err.message }));
    } finally {
      setLoading((prev) => ({ ...prev, customer: false }));
    }
  }

  async function getOrder() {
    try {
      const { status, data: result } = await api.get(`/orders/${id}`);
      if (status === 200) {
        setCustomerOrders(result.orders);
      }
    } catch (err) {
      setError((prev) => ({ ...prev, orders: err.message }));
    } finally {
      setLoading((prev) => ({ ...prev, orders: false }));
    }
  }

  async function getRecyclables() {
    try {
      const { status, data: response } = await api.get(`/recyclables/${id}`);
      if (status === 200) {
        setCustomerRecyclables(response.recycles);
      }
    } catch (err) {
      setError((prev) => ({ ...prev, recyclables: err.message }));
    } finally {
      setLoading((prev) => ({ ...prev, recyclables: false }));
    }
  }

  useEffect(() => {
    getCustomer();
    getOrder();
    getRecyclables();
  }, []);

  if (loading.customer) {
    return <div className="customer-detail-container">Loading customer data...</div>;
  }

  if (error.customer) {
    return (
      <div className="customer-detail-container customer-detail-error">
        {error.customer}
        <button onClick={() => navigate('/customers')}>Back to Customers</button>
      </div>
    );
  }

  if (!customer) {
    return <div className="customer-detail-container">Customer not found</div>;
  }

  return (
    <div className="customer-detail-container">
      <button className="customer-detail-back-button" onClick={() => navigate(-1)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Customers
      </button>

<<<<<<< HEAD
      {/* Profile */}
      <div className="customer-detail-profile-card">
        <div className="customer-detail-photo-container">
=======
      <div className="profile-card">
        <div className="customer-photo-container">
>>>>>>> e8b90a3 (Small changes)
          <img
            src={
              customer.gender === 'Male'
                ? 'https://randomuser.me/api/portraits/men/1.jpg'
                : 'https://randomuser.me/api/portraits/women/3.jpg'
            }
            alt={customer.name}
            className="customer-detail-photo"
          />
<<<<<<< HEAD
          {customer.id & 1 ? (
            <div className="customer-detail-premium-badge">Premium</div>
          ) : null}
        </div>

        <div className="customer-name-id">
  <h1 className="customer-name1">{customer.name}</h1>
  <span className="customer-id">ID: {customer.id}</span>
</div>


        <div className="customer-detail-meta">
          <span className="customer-detail-status">{customer.status || 'active'}</span>
          <span className="customer-detail-since">Member since: {formatDate(customer.dob)}</span>
        </div>

        {/* Personal Info */}
        <div className="customer-detail-section-card">
          <h3 className="customer-detail-section-title">Personal Information</h3>
          <div className="customer-detail-grid">
            <div className="customer-detail-item">
              <span className="customer-detail-label">Gender:</span>
              <span className="customer-detail-value">{customer.gender || 'Not specified'}</span>
=======
          {customer.id%2 == 1 && (
            <div className="premium-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="gold" stroke="gold">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/>
              </svg>
              Premium
>>>>>>> e8b90a3 (Small changes)
            </div>
            <div className="customer-detail-item">
              <span className="customer-detail-label">Age:</span>
              <span className="customer-detail-value">{getDate(customer.dob)}</span>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="customer-detail-section-card">
          <h3 className="customer-detail-section-title">Contact Information</h3>
          <div className="customer-detail-grid">
            <div className="customer-detail-item">
              <span className="customer-detail-label">Email:</span>
              <span className="customer-detail-value">
                <a href={`mailto:${customer.email}`}>{customer.email}</a>
              </span>
            </div>
            <div className="customer-detail-item">
              <span className="customer-detail-label">Phone:</span>
              <span className="customer-detail-value">
                <a href={`tel:${customer.phone}`}>{customer.phone || '91-xxx95-xx58'}</a>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Orders */}
      <div className="customer-detail-section-card">
        <h3 className="customer-detail-section-title">
          Recent Orders {loading.orders && <span className="loading-badge">Loading...</span>}
        </h3>
        {error.orders ? (
          <div className="customer-detail-error">
            {error.orders}
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        ) : customerOrders.length > 0 ? (
          <div className="customer-detail-orders-table">
            <div className="customer-detail-orders-header">
              <span>Order ID</span>
              <span>Date</span>
              <span>Amount</span>
              <span>Status</span>
              <span>Items</span>
            </div>
            {customerOrders.map((order) => (
              <div className="customer-detail-order-row" key={order.order_id}>
                <span>#{order.order_id}</span>
                <span>{formatDate(order.ordered_at)}</span>
                <span>{formatCurrency(order.amount)}</span>
                <span className="customer-detail-order-status">{order.status || 'processing'}</span>
                <span>{order.product_ids.length} items</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="customer-detail-no-data">No orders found.</div>
        )}
      </div>

      {/* Recyclables */}
<div className="customer-detail-section-card">
  <h3 className="customer-detail-section-title">Recyclable Items</h3>
  {loading.recyclables ? (
    <p>Loading...</p>
  ) : error.recyclables ? (
    <div className="customer-detail-error">{error.recyclables}</div>
  ) : customerRecyclables.length === 0 ? (
    <p>No recyclable items found.</p>
  ) : (
    <div className="customer-detail-recycle-grid">
      {customerRecyclables.map((item) => (
        <div key={item.recycle_id} className="customer-detail-recycle-card">
          <h3>Recycle ID: #{item.recycle_id}</h3>
          <ul>
            <li>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20" style={{ marginRight: '6px', verticalAlign: 'middle' }}>
                <path d="M6 2a1 1 0 00-1 1v2h10V3a1 1 0 00-1-1H6zM4 6v11a1 1 0 001 1h10a1 1 0 001-1V6H4zm2 2h2v7H6V8z" />
              </svg>
              <strong>Plastic:</strong> {item.plastic} kg
            </li>
            <li>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{ marginRight: '6px', verticalAlign: 'middle' }}>
                <path d="M20 6H4V4h16v2zm0 2H4v12h16V8zm-2 10H6v-8h12v8z" />
              </svg>
              <strong>E-Waste:</strong> {item.e_waste} kg
            </li>
            <li>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{ marginRight: '6px', verticalAlign: 'middle' }}>
                <path d="M5 4v16h14V4H5zm12 14H7V6h10v12z" />
              </svg>
              <strong>Books:</strong> {item.books} kg
            </li>
            <li>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{ marginRight: '6px', verticalAlign: 'middle' }}>
                <path d="M21 4H3v2h18V4zm0 4H3v2h18V8zm0 4H3v2h18v-2zm0 4H3v2h18v-2z" />
              </svg>
              <strong>Papers:</strong> {item.papers} kg
            </li>
            <li>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{ marginRight: '6px', verticalAlign: 'middle' }}>
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              <strong>Glass:</strong> {item.glass} kg
            </li>
            <li>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{ marginRight: '6px', verticalAlign: 'middle' }}>
                <path d="M16 4h2a2 2 0 012 2v12h-2V6h-2V4zm-4 2h2v14h-2V6zm-4 2h2v12H8V8zM4 12h2v8H4v-8z" />
              </svg>
              <strong>Clothes:</strong> {item.clothes} kg
            </li>
          </ul>
          <div className="recycle-meta">
            <p><strong>Placed At:</strong> {formatDate(item.placed_at)}</p>
            <p><strong>Address:</strong> {item.line1}, {item.city}, {item.state}, {item.country} - {item.postal_code}</p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

    </div>
  );
}
