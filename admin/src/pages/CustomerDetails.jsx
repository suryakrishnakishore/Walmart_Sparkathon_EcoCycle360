import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { customers } from '../data';
import '../styles/styles.css';

export default function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const customer = customers.find(c => c.id === parseInt(id));

  if (!customer) {
    return (
      <div className="container">
        <div className="error-message">Customer not found</div>
      </div>
    );
  }

  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back
      </button>
      
      <div className="card">
        <div className="customer-photo-container">
          <img
            src={customer.photo}
            alt={customer.name}
            className="customer-photo"
          />
        </div>
        
        <h2>
          {customer.name}
          {customer.premium && <span className="badge badge-premium">PREMIUM</span>}
        </h2>
        
        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <path d="M22 6l-10 7L2 6"/>
              </svg>
              Email
            </span>
            <span className="detail-value">{customer.email}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/>
              </svg>
              Rewarded Points
            </span>
            <span className="detail-value highlight">{customer.points}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
              Bonus
            </span>
            <span className="detail-value">{customer.bonus}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 12v10H4V12M22 7H2v5h20V7zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
              </svg>
              Returned Products
            </span>
            <span className="detail-value">{customer.returnedProducts}</span>
          </div>
        </div>
      </div>
    </div>
  );
}