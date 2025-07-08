import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { customers as dummyCustomers } from '../data'; // Import dummy data
import '../styles/styles.css';
import api from '../libs/apiCalls.js'; // Keep backend import
import { getDate } from '../libs/index.js';

export default function Customers() {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = async () => {
    try {
        const { status, data: result } = await api.get(`/search/customers?query=${search}`);
        if (status === 200) {
          setSuggestions(result?.list || []);
        }
    } catch (err) {
      console.error(err);
      setSuggestions([]);
    }
  };


  async function getAllUsers() {
    try {
        const { status, data: res } = await api.get("/user/all");
        if (status === 200) {
          setSuggestions(res?.users || []);
        }
      
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (search.length < 2) {
      getAllUsers();
      return;
    }

    const timeoutId = setTimeout(getSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [search]);


  return (
    <div className='main-content'>
      <h2>CUSTOMERS</h2>
      
      
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
            <div className="customer-age">{getDate(customer.dob)}</div>
            <div className="customer-gender">{customer.gender}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}