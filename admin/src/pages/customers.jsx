import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { customers } from '../data';
import '../styles/styles.css';
export default function Customers() {
  const [search, setSearch] = useState('');

  // Filter customers by name, email, or phone
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(search.toLowerCase()) ||
    customer.email.toLowerCase().includes(search.toLowerCase()) ||
    customer.phone.toLowerCase().includes(search.toLowerCase())
  );

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
        <span>Phone No</span>
        <span>Age</span>
        <span>Gender</span>
      </div>
      <div>
        {filteredCustomers.map(customer => (
          <div className="customer-card" key={customer.id}>
            <Link to={`/customers/${customer.id}`} className="customer-name">
              {customer.name}
            </Link>
            <div className="customer-email">{customer.email}</div>
            <div className="customer-phone">{customer.phone}</div>
            <div className="customer-age">{customer.age}</div>
            <div className="customer-gender">{customer.gender}</div>
          </div>
        ))}
      </div>
    </div>
  );
}