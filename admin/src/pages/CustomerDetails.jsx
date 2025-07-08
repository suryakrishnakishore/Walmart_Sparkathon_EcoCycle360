import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { customers, orders, recyclableItems } from '../data';
import '../styles/styles.css';
import api from '../libs/apiCalls';
import { formatCurrency, formatDate, getDate, handleRecycle } from '../libs';

export default function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State management
  const [loading, setLoading] = useState({
    customer: true,
    orders: true,
    recyclables: true
  });
  const [error, setError] = useState({
    customer: null,
    orders: null,
    recyclables: null
  });
  const [customer, setCustomer] = useState(null);
  const [customerOrders, setCustomerOrders] = useState([]);
  const [customerRecyclables, setCustomerRecyclables] = useState([]);

  async function getCustomer () {
    try {
      const { status, data: res } = await api.get(`/user/${id}`);
      if(status === 200) {
        setCustomer(res?.user || {});
      }
    } catch (err) {
      console.log(err);
      setError(prev => ({...prev, customer: err.message}));
      setCustomer({});
    }
    finally {
      setLoading(prev => ({...prev, customer: false}));
    }
  }

  async function getOrder () {
    try {
      const { status, data: result} = await api.get(`/orders/${id}`);
      if(status === 200) {
        setCustomerOrders(result.orders);
      }
    } catch (err) {
      console.log(err);
      setError(prev => ({...prev, orders: err.message}));
    } finally {
      setLoading(prev=>({...prev, orders: false}));
    }
  }

  async function getRecyclables() {
    try {
      const { status, data: response }= await api.get(`/recyclables/${id}`);
      if(status === 200) {
        setCustomerRecyclables(response.recycles);
      }
    } catch (err) {
      console.log(err);
      setError(prev => ({...prev, recyclables: err.message}));
    } finally {
      setLoading(prev => ({...prev, recyclables: false}));
    }
  }
  
  useEffect(() => {
    getCustomer();
    getOrder();
    getRecyclables();
  }, []);

  console.log(customerOrders);
  console.log(customerRecyclables);
  
  
  if (loading.customer) {
    return <div className="container loading-spinner">Loading customer data...</div>;
  }

  if (error.customer) {
    return (
      <div className="container error-message">
        {error.customer}
        <button onClick={() => navigate('/customers')}>Back to Customers</button>
      </div>
    );
  }

  if (!customer) {
    return <div className="container no-data">Customer not found</div>;
  }

  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Customers
      </button>

      {/* Profile Card */}
      <div className="profile-card">
        <div className="customer-photo-container">
          <img
            src={customer.gender === "Male" 
              ? "https://randomuser.me/api/portraits/men/1.jpg" 
              : "https://randomuser.me/api/portraits/women/3.jpg"}
            alt={customer.name}
            className="customer-photo"
          />
          {customer.id&1 && (
            <div className="premium-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="gold" stroke="gold">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/>
              </svg>
              Premium
            </div>
          )}
        </div>

        <h1 className="customer-name">
          {customer.name}
          <span className="customer-id">ID: {customer.id}</span>
        </h1>

        <div className="customer-meta">
          <span className={`customer-status active`}>
            {customer.status || "active"}
          </span>
          <span className="member-since">
            Member since: {formatDate(customer.dob)}
          </span>
        </div>

        <div className="details-sections">
          <div className="details-section">
            <h3>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              Personal Information
            </h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Gender: </span>
                <span className="detail-value">{customer.gender || 'Not specified'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Age: </span>
                <span className="detail-value">{getDate(customer.dob)}</span>
              </div>
            </div>
          </div>

          <div className="details-section">
            <h3>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Contact Information
            </h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Email: </span>
                <span className="detail-value">
                  <a href={`mailto:${customer.email}`}>{customer.email}</a>
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Phone: </span>
                <span className="detail-value">
                  <a href={`tel:${customer.phone}`}>{customer.phone || "91-xxx95-xx58"}</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-card">
        <h3 className="section-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          Recent Orders
          {loading.orders && <span className="loading-badge">Loading...</span>}
        </h3>
        
        {error.orders ? (
          <div className="error-message">
            {error.orders}
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        ) : customerOrders.length > 0 ? (
          <div className="orders-table">
            <div className="orders-header">
              <span>Order ID</span>
              <span>Date</span>
              <span>Amount</span>
              <span>Status</span>
              <span>Items</span>
            </div>
            {customerOrders.map(order => (
              <div className="order-row" key={order.order_id}>
                <span className="order-id">#{order.order_id}</span>
                <span className="order-date">{formatDate(order.ordered_at)}</span>
                <span className="order-amount">{formatCurrency(order.amount)}</span>
                <span className={`order-status status-processing`}>
                  {order.status || "processing"}
                </span>
                <span className="order-items">
                  {order.product_ids.length} items
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-data">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <p>No orders found</p>
          </div>
        )}
      </div>

      
      <div className='section-card'>
        <h2 className="text-2xl font-semibold mb-6">Recyclable Items</h2>

      {loading.recyclables ? (
        <p className="text-gray-500">Loading...</p>
      ) : error.recyclables ? (
        <div className="text-red-600">{error.recyclables}</div>
      ) : customerRecyclables.length === 0 ? (
        <p className="text-gray-500">No recyclable items found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {customerRecyclables.map((item) => (
            <div
              key={item.recycle_id}
              className="bg-white shadow-md rounded-xl p-4 border border-gray-200"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Recycle ID: #{item.recycle_id}
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li><strong>Plastic:</strong> {item.plastic} kg</li>
                <li><strong>E-Waste:</strong> {item.e_waste} kg</li>
                <li><strong>Books:</strong> {item.books} kg</li>
                <li><strong>Papers:</strong> {item.papers} kg</li>
                <li><strong>Glass:</strong> {item.glass} kg</li>
                <li><strong>Clothes:</strong> {item.clothes} kg</li>
              </ul>
              <div className="mt-4 text-sm text-gray-600">
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