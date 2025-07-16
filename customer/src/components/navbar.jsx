import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaUserCircle, FaShoppingCart, FaCoins } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  const superCoins = 120;

  const handleChange = () => {
    setMenu(!menu);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-gradient-to-b from-[#eafdef] to-white shadow-md z-[1000]">
      <div className="flex items-center justify-between max-w-screen-xl mx-10 px-4 py-4">
        {/* Logo - Left */}
        <Link to="/" className="flex items-center gap-2 font-semibold text-2xl">
          <img src="/Logo.png" alt="Logo" className="h-10 w-10" />
          <span>EcoCycle360</span>
        </Link>
       

        {/* Icons - Right */}
        <div className="hidden md:flex items-center ml-290 gap-8 text-sm font-medium">
          {/* Login */}
          <Link
            to="/sign-in"
            onClick={() => {
              if (login) {
                setLogin(false);
                navigate("/sign-in");
              }
            }}
            className="flex flex-col items-center hover:text-[#3a7f55] transition"
          >
           
            <FaUserCircle size={24} />
            <span className="mt-1">Logout</span>
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="flex flex-col items-center hover:text-[#3a7f55] transition"
          >
            <FaShoppingCart size={22} />
            <span className="mt-1">Cart</span>
          </Link>

          {/* SuperCoins */}
          <div className="flex flex-col items-center hover:text-[#3a7f55] transition">
            <FaCoins size={22} />
            <span className="mt-1">100C</span>
          </div>
        </div>
       <div className='flex items-center gap-10 2xl:gap-20'>
            
            <div className='flex items-center gap-3 px-3'>
          <img
            src="avatar1.jpeg"
            alt='User'
            className='w-10 md:w-12 h-10 md:h-12 rounded-full object-cover cursor-pointer'
          />
         
          </div>

        </div>
      </div>
       
    </div>
  );
};

export default Navbar;
