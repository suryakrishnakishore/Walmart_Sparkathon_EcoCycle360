import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { customers as dummyCustomers } from '../data'; // Import dummy data
import '../styles/styles.css';
import api from '../libs/apiCalls.js'; // Keep backend import
import { getDate } from '../libs/index.js';

export default function Customers() {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [useBackend, setUseBackend] = useState(false); // Toggle between data sources

  // Search function that works with both data sources
  const getSuggestions = async () => {
    try {
      if (useBackend) {
        // Use backend API
        const { status, data: result } = await api.get(`/search/customers?query=${search}`);
        if (status === 200) {
          setSuggestions(result?.list || []);
        }
      } else {
        // Use local dummy data
        const filtered = dummyCustomers.filter(customer =>
          customer.name.toLowerCase().includes(search.toLowerCase()) ||
          customer.email.toLowerCase().includes(search.toLowerCase()) ||
          customer.phone.toLowerCase().includes(search.toLowerCase())
        );
        setSuggestions(filtered);
      }
    } catch (err) {
      console.error(err);
      setSuggestions([]);
      // Fallback to dummy data if backend fails
      if (useBackend) {
        const filtered = dummyCustomers.filter(customer =>
          customer.name.toLowerCase().includes(search.toLowerCase()) ||
          customer.email.toLowerCase().includes(search.toLowerCase()) ||
          customer.phone.toLowerCase().includes(search.toLowerCase())
        );
        setSuggestions(filtered);
      }
    }
  };

  // Initial load function
  async function getAllUsers() {
    try {
      if (useBackend) {
        const { status, data: res } = await api.get("/user/all");
        if (status === 200) {
          setSuggestions(res?.users || []);
        }
      } else {
        setSuggestions(dummyCustomers);
      }
    } catch (err) {
      console.log(err);
      // Fallback to dummy data if backend fails
      setSuggestions(dummyCustomers);
    }
  }

  useEffect(() => {
    if (search.length < 2) {
      getAllUsers();
      return;
    }

    const timeoutId = setTimeout(getSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [search, useBackend]); // Add useBackend to dependencies

  // Calculate age from date of birth
  const calculateAge = (dob) => {
    if (!dob) return 'N/A';
    const birthDate = new Date(dob);
    const diff = Date.now() - birthDate.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <div className='main-content'>
      <h2>CUSTOMERS</h2>
      
      {/* Data source toggle */}
      <div className="data-source-toggle">
        <label>
          <input
            type="checkbox"
            checked={useBackend}
            onChange={() => setUseBackend(!useBackend)}
          />
          Use Backend API
        </label>
      </div>
      
      <input
        type="text"
        placeholder="Search by name, email, or phone"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="search-bar"
      />
      <div className="customer-header">
        <span>Name</span>
        <span>Email</span>
        <span>Phone</span>
        <span>Age</span>
        <span>Gender</span>
      </div>
      <div>
        {suggestions.map(customer => (
          <Link to={`/customers/${customer.id}`} className="customer-card" key={customer.id}>
            <div className="customer-name">
              {customer.name}
              {customer.isPremium && <span className="badge-premium">PREMIUM</span>}
            </div>
            <div className="customer-email">{customer.email}</div>
            <div className="customer-phone">{customer.phone}</div>
            <div className="customer-age">{calculateAge(customer.dob)}</div>
            <div className="customer-gender">{customer.gender}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}