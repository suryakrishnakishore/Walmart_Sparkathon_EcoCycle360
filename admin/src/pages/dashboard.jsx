"use client";

import React from "react";
import {
  FiUser,
  FiEye,
  FiArrowUpRight,
  FiDollarSign,
  FiMoreHorizontal,
  FiCalendar,
} from "react-icons/fi";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Line,
  LineChart,
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

// ------------------ TopBar ------------------
const TopBar = () => (
  <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
    <div className="flex items-center justify-between p-0.5">
      <h1 className="text-2xl font-extrabold text-stone-800">Dashboard</h1>
      <button className="flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded">
        <FiCalendar />
        <span>Prev 6 Months</span>
      </button>
    </div>
  </div>
);

// ------------------ Customers/Orders/Recyclables ------------------
const SummaryCard = ({ title, value }) => {
  const icons = {
    Customers: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-violet-600">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-2.5 4-4 8-4s8 1.5 8 4v1H4v-1z" />
      </svg>
    ),
    Orders: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-green-600">
        <path d="M3 6h18v12H3z" />
        <path d="M6 9h12v2H6zM6 13h12v2H6z" />
      </svg>
    ),
    Recyclables: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-blue-600">
        <path d="M12 2l3 6H9l3-6zm0 20l-3-6h6l-3 6z" />
      </svg>
    ),
  };

  return (
    <div className="col-span-4 p-4 bg-white rounded-xl border border-stone-300 shadow hover:scale-[1.03] hover:shadow-lg transition-transform flex items-center gap-4 cursor-pointer">
      <div className="bg-stone-100 p-2 rounded-full">
        {icons[title]}
      </div>
      <div>
        <h3 className="text-stone-500 mb-1 text-sm font-semibold">{title}</h3>
        <p className="text-2xl font-bold text-stone-900">{value}</p>
      </div>
    </div>
  );
};

const SummaryCards = () => (
  <>
    <SummaryCard title="Customers" value="1,245" />
    <SummaryCard title="Orders" value="872" />
    <SummaryCard title="Recyclables" value="314" />
  </>
);

// ------------------ Waste Stats Cards ------------------
const WasteCard = ({ title, value, svgPath, fillColor }) => (
  <div className="col-span-4 p-4 rounded-xl border border-stone-300 bg-white shadow hover:scale-[1.03] hover:shadow-lg transition-transform cursor-pointer flex items-center gap-4">
    <div className={`p-2 rounded-full`} style={{ backgroundColor: fillColor + "33" }}>
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill={fillColor}>
        <path d={svgPath} />
      </svg>
    </div>
    <div>
      <h3 className="text-stone-500 mb-1 text-sm font-semibold">{title}</h3>
      <p className="text-2xl font-bold text-stone-900">{value}</p>
    </div>
  </div>
);
const WasteStats = () => (
  <>
    <WasteCard
      title="Plastic"
      value="2,400 kg"
      svgPath="M4 4h16v16H4z"
      fillColor="#8B5CF6"
    />
    <WasteCard
      title="E-waste"
      value="560 kg"
      svgPath="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"
      fillColor="#10B981"
    />
    <WasteCard
      title="Papers"
      value="1,150 kg"
      svgPath="M6 2h9l5 5v13H6z"
      fillColor="#3B82F6"
    />
    <WasteCard
      title="Glass"
      value="870 kg"
      svgPath="M8 2h8v2H8zM7 6h10v14H7z"
      fillColor="#F59E0B"
    />
    <WasteCard
      title="Clothes"
      value="420 kg"
      svgPath="M12 2l4 4h-8l4-4zM6 6h12v14H6z"
      fillColor="#EF4444"
    />
    {/* 🔥 Net CO2 Highlighted */}
    <WasteCard
  title="Net CO₂"
  value="2.1 tons"
  svgPath="M3 12a9 9 0 1 1 18 0 9 9 0 0 1-18 0z"
  fillColor="#4F46E5"  // A stronger indigo
  extraClasses="bg-indigo-200 border border-indigo-400 ring-4 ring-indigo-300 scale-[1.05] shadow-2xl z-10"
/>

  </>
);


// ------------------ ActivityGraph ------------------
const activityData = [
  { name: "Jan", Returning: 275, New: 41 },
  { name: "Feb", Returning: 620, New: 96 },
  { name: "Mar", Returning: 202, New: 192 },
  { name: "Apr", Returning: 500, New: 50 },
  { name: "May", Returning: 355, New: 400 },
  { name: "Jun", Returning: 875, New: 200 },
  { name: "Jul", Returning: 700, New: 205 },
];

const ActivityGraph = () => (
  <div className="col-span-8 overflow-hidden rounded-xl border border-stone-300 bg-white shadow">
    <div className="p-4">
      <h3 className="flex items-center gap-1.5 font-medium">
        <FiUser /> Activity
      </h3>
    </div>
    <div className="h-64 px-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={activityData} margin={{ top: 0, right: 0, left: -24, bottom: 0 }}>
          <CartesianGrid stroke="#e4e4e7" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} className="text-xs font-bold" />
          <YAxis className="text-xs font-bold" axisLine={false} tickLine={false} />
          <Tooltip wrapperClassName="text-sm rounded" labelClassName="text-xs text-stone-500" />
          <Line type="monotone" dataKey="New" stroke="#18181b" />
          <Line type="monotone" dataKey="Returning" stroke="#5b21b6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

// ------------------ UsageRadar ------------------
const radarData = [
  { feature: "Tracking", mobile: 15, desktop: 110, max: 150 },
  { feature: "Builder", mobile: 130, desktop: 90, max: 150 },
  { feature: "Schedule", mobile: 86, desktop: 130, max: 150 },
  { feature: "AI Train", mobile: 125, desktop: 40, max: 150 },
  { feature: "Interval", mobile: 148, desktop: 90, max: 150 },
];

const UsageRadar = () => (
  <div className="col-span-4 overflow-hidden rounded-xl border border-stone-300 bg-white shadow">
    <div className="p-4">
      <h3 className="flex items-center gap-1.5 font-medium">
        <FiEye /> Usage
      </h3>
    </div>
    <div className="h-64 px-4">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="feature" className="text-xs font-bold" />
          <PolarRadiusAxis angle={30} domain={[0, 150]} />
          <Radar name="Mobile" dataKey="mobile" stroke="#18181b" fill="#18181b" fillOpacity={0.2} />
          <Radar name="Desktop" dataKey="desktop" stroke="#5b21b6" fill="#5b21b6" fillOpacity={0.2} />
          <Tooltip wrapperClassName="text-sm rounded" labelClassName="text-xs text-stone-500" />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

// ------------------ RecentTransactions ------------------
const RecentTransactions = () => (
  <div className="col-span-12 p-4 rounded-xl border border-stone-300 bg-white shadow">
    <div className="mb-4 flex items-center justify-between">
      <h3 className="flex items-center gap-1.5 font-medium">
        <FiDollarSign /> Recent Transactions
      </h3>
      <button className="text-sm text-violet-500 hover:underline">See all</button>
    </div>
    <table className="w-full table-auto text-sm">
      <thead>
        <tr className="text-sm font-semibold text-stone-600">
          <th className="text-start p-2">Customer ID</th>
          <th className="text-start p-2">SKU</th>
          <th className="text-start p-2">Date</th>
          <th className="text-start p-2">Price</th>
          <th className="w-8"></th>
        </tr>
      </thead>
      <tbody>
        {[
          { cusId: "#48149", sku: "Pro 1 Month", date: "Aug 2nd", price: "$9.75" },
          { cusId: "#1942s", sku: "Pro 3 Month", date: "Aug 2nd", price: "$21.25" },
          { cusId: "#4192", sku: "Pro 1 Year", date: "Aug 1st", price: "$94.75" },
          { cusId: "#99481", sku: "Pro 1 Month", date: "Aug 1st", price: "$9.44" },
          { cusId: "#1304", sku: "Pro 1 Month", date: "Aug 1st", price: "$9.23" },
          { cusId: "#1304", sku: "Pro 3 Month", date: "Jul 31st", price: "$22.02" },
        ].map((row, idx) => (
          <tr key={idx} className={idx % 2 ? "bg-stone-100" : "bg-white"}>
            <td className="p-2">
              <a href="#" className="text-violet-600 underline flex items-center gap-1">
                {row.cusId} <FiArrowUpRight />
              </a>
            </td>
            <td className="p-2">{row.sku}</td>
            <td className="p-2">{row.date}</td>
            <td className="p-2">{row.price}</td>
            <td className="w-8">
              <button className="hover:bg-stone-200 transition-colors grid place-content-center rounded text-sm size-8">
                <FiMoreHorizontal />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ------------------ Grid Layout ------------------
const Grid = () => (
  <div className="px-4 grid gap-3 grid-cols-12">
    <SummaryCards />
    <WasteStats />
    <ActivityGraph />
    <UsageRadar />
    <RecentTransactions />
  </div>
);

// ------------------ Final Dashboard Export ------------------
const Dashboard = () => (
  <div className="bg-white rounded-lg pb-4 shadow">
    <TopBar />
    <Grid />
  </div>
);

export default Dashboard;
