import React, { useState } from "react";
import {
  PresentationChartBarIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export function MultiLevelSidebar() {
  const [openAccordion, setOpenAccordion] = useState(false);

  return (
    <div className=" h-[calc(100vh-0rem)]  max-w-[20rem] p-4 pt-24  shadow-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      {/* Header */}
      <div className="px-6 py-4  text-xl font-semibold border-b">Hello Kesav , </div>

      {/* Search */}
      <div className="p-4 border-b">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-3 py-2 rounded border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto text-sm">
        <SidebarItem icon={<PresentationChartBarIcon className="w-5 h-5 text-blue-500" />} to="/home" label="Dashboard" />

        {/* Accordion Group */}
        <div>
          <button
            onClick={() => setOpenAccordion(!openAccordion)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-100"
          >
            <div className="flex items-center gap-3">
              <MagnifyingGlassIcon className="w-5 h-5 text-purple-500" />
              <span>Categories</span>
            </div>
            {openAccordion ? (
              <ChevronDownIcon className="w-4 h-4" />
            ) : (
              <ChevronRightIcon className="w-4 h-4" />
            )}
          </button>

          {/* Sub-links */}
          {openAccordion && (
            <div className="ml-8 mt-2 space-y-1">
              <SidebarItem to="/scientistlist" label="Accessories" icon="🎒" />
              <SidebarItem to="/farmerlist" label="Freshies" icon="🥦" />
              <SidebarItem to="/electronics" label="Electronics" icon="🔌" />
            </div>
          )}
        </div>

        {/* Profile */}
        <SidebarItem icon={<UserCircleIcon className="w-5 h-5 text-green-500" />} to="/profile" label="Profile" />
      </nav>

      {/* Footer */}
      <div className="p-4 border-t text-xs text-gray-500">
        © 2025 EcoCycle Inc.
      </div>
    </div>
  );
}

function SidebarItem({ to, icon, label }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
