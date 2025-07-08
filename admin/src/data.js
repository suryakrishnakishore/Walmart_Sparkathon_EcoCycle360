// src/data.js
export const customers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dob: "1985-04-23",
    gender: "Male",
    address: "123 Main St, New York, NY",
    status: "active",
    joinDate: "2020-06-15",
    isPremium: true,
    loyaltyPoints: 1250,
    lastActive: "2023-05-15T14:30:00Z",
    tier: "Gold"
  },
  // Add more customers as needed...
];

export const orders = [
  {
    id: "ORD-1001",
    customerId: "1",
    date: "2023-05-10",
    amount: 149.99,
    status: "delivered",
    items: [
      { id: "PROD-201", name: "Wireless Headphones", quantity: 1, price: 99.99 },
      { id: "PROD-202", name: "Phone Case", quantity: 2, price: 25.00 }
    ],
    paymentMethod: "Credit Card",
    shippingAddress: "123 Main St, New York, NY"
  },
  // Add more orders as needed...
];

export const recyclableItems = [
  {
    id: "REC-7001",
    customerId: "1",
    orderId: "ORD-1001",
    productId: "PROD-202",
    name: "Phone Case (Eco-series)",
    returnDate: "2023-05-18",
    material: "Biodegradable silicone",
    weight: "0.2 kg",
    recycleMethod: "Specialized e-waste recycling",
    status: "pending",
    pointsAwarded: 50,
    image: "https://m.media-amazon.com/images/I/61yFDeK2uGL._AC_SL1500_.jpg"
  },
  // Add more recyclable items as needed...
];