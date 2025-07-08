import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { customers, orders, recyclableItems } from '../data';
import '../styles/styles.css';

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

  // Fetch data from dummy source
  useEffect(() => {
    // Load customer data
    try {
      const foundCustomer = customers.find(c => c.id === id);
      if (foundCustomer) {
        setCustomer(foundCustomer);
        setError(prev => ({...prev, customer: null}));
      } else {
        throw new Error('Customer not found');
      }
    } catch (err) {
      setError(prev => ({...prev, customer: err.message}));
    } finally {
      setLoading(prev => ({...prev, customer: false}));
    }

    // Load orders
    try {
      const foundOrders = orders.filter(o => o.customerId === id);
      setCustomerOrders(foundOrders);
      setError(prev => ({...prev, orders: null}));
    } catch (err) {
      setError(prev => ({...prev, orders: err.message}));
    } finally {
      setLoading(prev => ({...prev, orders: false}));
    }

    // Load recyclable items
    loadRecyclables();
  }, [id]);

  const loadRecyclables = () => {
    setLoading(prev => ({...prev, recyclables: true}));
    setError(prev => ({...prev, recyclables: null}));
    
    try {
      const foundRecyclables = recyclableItems.filter(r => r.customerId === id);
      setCustomerRecyclables(foundRecyclables);
    } catch (err) {
      setError(prev => ({...prev, recyclables: err.message}));
    } finally {
      setLoading(prev => ({...prev, recyclables: false}));
    }
  };

  // Helper functions
  const calculateAge = (dob) => {
    if (!dob) return 'N/A';
    const birthDate = new Date(dob);
    const diff = Date.now() - birthDate.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);
  };

  const handleRecycle = (itemId) => {
    console.log(`Processing recycling for item ${itemId}`);
    // In a real app, this would call an API endpoint
    alert(`Recycling process started for item ${itemId}`);
  };

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
          {customer.isPremium && (
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
          <span className={`customer-status ${customer.status}`}>
            {customer.status}
          </span>
          <span className="member-since">
            Member since: {formatDate(customer.joinDate)}
          </span>
        </div>

        {/* Customer Details Sections */}
        <div className="details-sections">
          {/* Personal Information */}
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
                <span className="detail-label">Gender</span>
                <span className="detail-value">{customer.gender || 'Not specified'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Date of Birth</span>
                <span className="detail-value">{formatDate(customer.dob)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Age</span>
                <span className="detail-value">{calculateAge(customer.dob)}</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="details-section">
            <h3>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Contact Information
            </h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Email</span>
                <span className="detail-value">
                  <a href={`mailto:${customer.email}`}>{customer.email}</a>
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Phone</span>
                <span className="detail-value">
                  <a href={`tel:${customer.phone}`}>{customer.phone}</a>
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Address</span>
                <span className="detail-value">{customer.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Section */}
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
              <div className="order-row" key={order.id}>
                <span className="order-id">#{order.id}</span>
                <span className="order-date">{formatDate(order.date)}</span>
                <span className="order-amount">{formatCurrency(order.amount)}</span>
                <span className={`order-status status-${order.status}`}>
                  {order.status}
                </span>
                <span className="order-items">
                  {order.items.reduce((total, item) => total + item.quantity, 0)} items
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

      {/* Recyclable Items Section */}
      <div className="section-card">
        <h3 className="section-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16"/>
          </svg>
          Recyclable Items
          {loading.recyclables && <span className="loading-badge">Loading...</span>}
        </h3>
        
        {error.recyclables ? (
          <div className="error-message">
            {error.recyclables}
            <button onClick={loadRecyclables}>Retry</button>
          </div>
        ) : customerRecyclables.length > 0 ? (
          <div className="recyclables-grid">
            {customerRecyclables.map(item => (
              <div className="recyclable-item" key={item.id}>
                <div className="recyclable-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="recyclable-details">
                  <h4>{item.name}</h4>
                  <div className="recyclable-meta">
                    <div className="meta-item">
                      <span className="meta-label">Material:</span>
                      <span className="meta-value">{item.material}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Status:</span>
                      <span className={`meta-value status-${item.status}`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Return Date:</span>
                      <span className="meta-value">{formatDate(item.returnDate)}</span>
                    </div>
                  </div>
                  <div className="recyclable-actions">
                    <button 
                      className="recycle-btn"
                      onClick={() => handleRecycle(item.id)}
                      disabled={item.status !== 'pending'}
                    >
                      {item.status === 'processed' ? 'Recycled' : 'Process Recycling'}
                    </button>
                    <span className="recycle-points">
                      +{item.pointsAwarded} eco-points
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-data">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16"/>
            </svg>
            <p>No recyclable items found</p>
          </div>
        )}
      </div>
    </div>
  );
}