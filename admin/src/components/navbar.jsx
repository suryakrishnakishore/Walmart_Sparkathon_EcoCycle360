import React from 'react'
import { FaRecycle, FaBoxOpen, FaUsers, FaClipboardList, FaUserShield } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import useStore from '../store'
import { useState } from 'react';

function Navbar() {
  const { user, signOut } = useStore((state) => state);
  const [click, setClick] = useState(false);

  function handleSignOut(e) {
    e.preventDefault();
    localStorage.removeItem("ecoadmin");
    signOut();
    window.location.reload();
  }

  return (
    <section className="group bg-blue-500 min-h-screen w-[70px] hover:w-[20%] transition-all duration-300 px-3 flex flex-col py-6 overflow-x-hidden">
      <div className="flex items-center mb-10">
        <FaRecycle className={`text-3xl text-white ml-2 min-w-[32px] group-hover:ml-0`}
          style={{ animation: "spin 2s linear infinite" }}
        />
        <span className="text-xl font-bold text-white whitespace-nowrap overflow-hidden transition-all duration-300
          opacity-0 group-hover:opacity-100 group-hover:ml-2">
          Eco<strong className="text-green-400 font-extrabold font-stretch-semi-expanded text-shadow-lg animate-pulse">Cycle</strong>360
        </span>
      </div>

      <nav className="flex flex-col gap-4 flex-1">
        <Link to={"/orders"} className="flex items-center text-white hover:bg-green-600 rounded px-3 py-2 transition">
          <FaBoxOpen className="text-2xl mr-1 min-w-[24px]" />
          <span className="whitespace-nowrap overflow-hidden transition-all duration-300
            opacity-0 group-hover:opacity-100 group-hover:ml-2">
            Orders
          </span>
        </Link>
        <Link to={"/recycle-orders"} className="flex items-center text-white hover:bg-green-600 rounded px-3 py-2 transition">
          <FaClipboardList className="text-2xl mr-1 min-w-[24px]" />
          <span className="whitespace-nowrap overflow-hidden transition-all duration-300
            opacity-0 group-hover:opacity-100 group-hover:ml-2">
            Recycle Orders
          </span>
        </Link>
        <Link to={"/customers"} className="flex items-center text-white hover:bg-green-600 rounded px-3 py-2 transition">
          <FaUsers className="text-2xl mr-1 min-w-[24px]" />
          <span className="whitespace-nowrap overflow-hidden transition-all duration-300
            opacity-0 group-hover:opacity-100 group-hover:ml-2">
            Customers
          </span>
        </Link>
        <Link to={"/in-mall-submit"} className="flex items-center text-white hover:bg-green-600 rounded px-3 py-2 transition">
          <FaClipboardList className="text-2xl mr-1 min-w-[24px]" />
          <span className="whitespace-nowrap overflow-hidden transition-all duration-300
            opacity-0 group-hover:opacity-100 group-hover:ml-2">
            In-mall Submit
          </span>
        </Link>
      </nav>

      <div className="mt-10 flex relative items-center hover:cursor-pointer" onClick={() => setClick(!click)}>
        {click &&
          <button
            className=" opacity-0 group-hover:opacity-100 absolute bottom-10 right-2 w-full px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-700 shadow-lg text-white font-semibold hover:from-red-600 hover:to-red-800 hover:scale-105 hover:cursor-pointer transition-all duration-200 text-center"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        }
        <FaUserShield className="text-2xl text-white mr-1 min-w-[24px]" />
        <div className="overflow-hidden">
          <div className="text-white font-semibold whitespace-nowrap transition-all duration-300
            opacity-0 group-hover:opacity-100 group-hover:ml-2">
            {user?.name}
          </div>
          <div className="text-white text-xs whitespace-nowrap transition-all duration-300
            opacity-0 group-hover:opacity-100 group-hover:ml-2">
            Administrator
          </div>
        </div>
      </div>
    </section>
  )
}

export default Navbar