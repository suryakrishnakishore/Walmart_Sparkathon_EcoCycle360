import React, { useState } from 'react';
import '../styles/styles.css';

const orders = [
  {
    order_id: 101,
    product_ids: [1, 2, 3],
    payment_mode: 'Credit Card',
    amount: 120.5,
    shipment_address: '123 Main St, Springfield',
    ordered_at: '2024-06-01 10:30',
    customer_id: 1,
  },
  {
    order_id: 102,
    product_ids: [4],
    payment_mode: 'PayPal',
    amount: 45.0,
    shipment_address: '456 Elm St, Shelbyville',
    ordered_at: '2024-06-02 14:15',
    customer_id: 2,
  },
  {
    order_id: 103,
    product_ids: [2, 5],
    payment_mode: 'Cash',
    amount: 78.9,
    shipment_address: '789 Oak St, Capital City',
    ordered_at: '2024-06-03 09:00',
    customer_id: 3,
  },
  {
    order_id: 104,
    product_ids: [6, 7],
    payment_mode: 'Credit Card',
    amount: 150.0,
    shipment_address: '321 Maple St, Ogdenville',
    ordered_at: '2024-06-04 11:20',
    customer_id: 4,
  },
  {
    order_id: 105,
    product_ids: [8],
    payment_mode: 'Debit Card',
    amount: 60.0,
    shipment_address: '654 Pine St, North Haverbrook',
    ordered_at: '2024-06-05 13:45',
    customer_id: 5,
  },
  {
    order_id: 106,
    product_ids: [9, 10],
    payment_mode: 'UPI',
    amount: 99.9,
    shipment_address: '987 Cedar St, Brockway',
    ordered_at: '2024-06-06 15:10',
    customer_id: 6,
  },
  {
    order_id: 107,
    product_ids: [11, 12, 13],
    payment_mode: 'Net Banking',
    amount: 200.0,
    shipment_address: '159 Spruce St, Springfield',
    ordered_at: '2024-06-07 16:30',
    customer_id: 7,
  },
  {
    order_id: 108,
    product_ids: [14],
    payment_mode: 'Credit Card',
    amount: 80.0,
    shipment_address: '753 Willow St, Shelbyville',
    ordered_at: '2024-06-08 17:50',
    customer_id: 8,
  },
  {
    order_id: 109,
    product_ids: [15, 16],
    payment_mode: 'PayPal',
    amount: 110.0,
    shipment_address: '852 Birch St, Capital City',
    ordered_at: '2024-06-09 18:40',
    customer_id: 9,
  },
  {
    order_id: 110,
    product_ids: [17],
    payment_mode: 'Cash',
    amount: 55.5,
    shipment_address: '951 Aspen St, Ogdenville',
    ordered_at: '2024-06-10 19:30',
    customer_id: 10,
  },
  {
    order_id: 111,
    product_ids: [18, 19],
    payment_mode: 'Credit Card',
    amount: 130.0,
    shipment_address: '111 Oak St, Springfield',
    ordered_at: '2024-06-11 09:15',
    customer_id: 11,
  },
  {
    order_id: 112,
    product_ids: [20],
    payment_mode: 'Debit Card',
    amount: 75.0,
    shipment_address: '222 Elm St, Shelbyville',
    ordered_at: '2024-06-12 10:25',
    customer_id: 12,
  },
  {
    order_id: 113,
    product_ids: [21, 22],
    payment_mode: 'UPI',
    amount: 89.9,
    shipment_address: '333 Maple St, Capital City',
    ordered_at: '2024-06-13 11:35',
    customer_id: 13,
  },
  {
    order_id: 114,
    product_ids: [23],
    payment_mode: 'Net Banking',
    amount: 140.0,
    shipment_address: '444 Pine St, Ogdenville',
    ordered_at: '2024-06-14 12:45',
    customer_id: 14,
  },
  {
    order_id: 115,
    product_ids: [24, 25, 26],
    payment_mode: 'Credit Card',
    amount: 210.0,
    shipment_address: '555 Cedar St, North Haverbrook',
    ordered_at: '2024-06-15 13:55',
    customer_id: 15,
  },
  {
    order_id: 116,
    product_ids: [27],
    payment_mode: 'PayPal',
    amount: 65.0,
    shipment_address: '666 Spruce St, Brockway',
    ordered_at: '2024-06-16 15:05',
    customer_id: 16,
  },
  {
    order_id: 117,
    product_ids: [28, 29],
    payment_mode: 'Cash',
    amount: 120.0,
    shipment_address: '777 Willow St, Springfield',
    ordered_at: '2024-06-17 16:15',
    customer_id: 17,
  },
  {
    order_id: 118,
    product_ids: [30],
    payment_mode: 'Credit Card',
    amount: 95.0,
    shipment_address: '888 Birch St, Shelbyville',
    ordered_at: '2024-06-18 17:25',
    customer_id: 18,
  },
  {
    order_id: 119,
    product_ids: [31, 32],
    payment_mode: 'Debit Card',
    amount: 105.0,
    shipment_address: '999 Aspen St, Capital City',
    ordered_at: '2024-06-19 18:35',
    customer_id: 19,
  },
  {
    order_id: 120,
    product_ids: [33],
    payment_mode: 'UPI',
    amount: 70.0,
    shipment_address: '1010 Oak St, Ogdenville',
    ordered_at: '2024-06-20 19:45',
    customer_id: 20,
  },
];

export default function Orders() {
  const [search, setSearch] = useState('');

  // Filter orders by order_id, payment_mode, or customer_id
  const filteredOrders = orders.filter(order =>
    order.order_id.toString().includes(search) ||
    order.payment_mode.toLowerCase().includes(search.toLowerCase()) ||
    order.customer_id.toString().includes(search)
  );

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
        <span>Shipment Address</span>
        <span>Ordered At</span>
        <span>Customer ID</span>
      </div>
      <div>
        {filteredOrders.map(order => (
          <div className="customer-card" key={order.order_id}>
            <div className="customer-name">{order.order_id}</div>
            <div className="customer-email">{Array.isArray(order.product_ids) ? order.product_ids.join(', ') : order.product_ids}</div>
            <div className="customer-phone">{order.payment_mode}</div>
            <div className="customer-age">{order.amount}</div>
            <div className="customer-gender">{order.shipment_address}</div>
            <div className="customer-age">{order.ordered_at}</div>
            <div className="customer-gender">{order.customer_id}</div>
          </div>
        ))}
      </div>
    </div>
  );
}