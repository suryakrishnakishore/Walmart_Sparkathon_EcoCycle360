import { useState } from 'react';
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import SignIn from './pages/auth/sign-in';
import useStore from './store/index';
import { setAuthToken } from './libs/apiCalls.js';
import { Toaster } from "sonner";
import Navbar from './components/navbar.jsx';
import Home from './pages/home.jsx';
import Customers from './pages/customers.jsx';
import Orders from './pages/orders.jsx';
import RecycleOrders from './pages/recycle-orders.jsx';
import InMall from './pages/in-mall.jsx';
import CustomerDetails from './pages/CustomerDetails.jsx';
import Dashboard from './pages/dashboard.jsx';
import SignUp from './pages/auth/sign-up.jsx';
const RootLayout = () => {

  const { user } = useStore((state) => state);
  console.log(user);
  setAuthToken(user?.token || "");

  const [ navOpen, setNavOpen ] = useState(false);

  return (user ? (
    <div className='flex'>
        { <Navbar navOpen={navOpen} setNavOpen={setNavOpen} /> }
      
      <div 
        className={`w-full min-h-screen transition-all duration-300 ${
          navOpen ? "ml-[200px]" : "ml-[70px]"
        }`}
      >
        <Outlet />
      </div>
    </div>
    
  ) : (
    <Navigate to="/sign-in" replace={true} />
  ))
}
function App() {
  const [count, setCount] = useState(0)
  return (
    <main>
      <div className='w-full min-h-screen bg-gray-100  dark:bg-slate-900 '>
        <Routes>
          <Route element={<RootLayout/>}>
            <Route path='/' element={<Navigate to={"/home"} />}></Route>
            <Route path='/home' element={<Dashboard />} />
            <Route path='/customers' element={<Customers />}></Route>
            <Route path='/orders' element={<Orders />}></Route>
            <Route path='/recycle-orders' element={<RecycleOrders />}></Route>
            <Route path='/in-mall' element={<InMall />}></Route>
            <Route path='/customers/:id' element={<CustomerDetails />}></Route>
            <Route path="/dashboard" element={<Navigate to={"/home"} />} />
          </Route> 
          <Route path='/sign-in' element={<SignIn/>}></Route>
          <Route path='/sign-up' element={<SignUp/>}></Route>
        </Routes>
      </div>

      <Toaster richColors position="top-center"></Toaster>
    </main>
  )
}

export default App
