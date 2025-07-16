import { useState } from 'react';
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import SignIn from './pages/auth/sign-in';
import SignUp from './pages/auth/sign-up';
import useStore from './store/index';
import { setAuthToken } from './libs/apiCalls.js';
import { Toaster } from "sonner";
import Navbar from './components/navbar.jsx';
import Home from './pages/home.jsx';
import { MultiLevelSidebar } from './components/MultiLevelSidebar.jsx';
import Cart from './pages/cart.jsx';
import CheckOut from './pages/checkout.jsx';
import Leaderboard from './pages/leaderboard.jsx';

const RootLayout = () => {

  // const { user } = useStore((state) => state);
  // console.log(user);
  // setAuthToken(user?.token || "");

  // return (user ? (
  //   <>
  //     { <Navbar /> }
  //     <div className='min-h-[cal(h-screen - 100px)]'>
  //       <Outlet />
  //     </div>
  //   </>
    
  // ) : (
  //   <Navigate to="/sign-in" replace={true} />
  // ))


  return (
    <>
      <Navbar />
      <div className="flex flex-row min-h-[calc(100vh_-_100px)] ">
       <div className='fixed'><MultiLevelSidebar /></div>
        <div className="flex-1 pl-68 ">
          <Outlet /> {/* This is where <Home /> will be rendered */}
        </div>
      </div>
    </>
  );

  


}
function App() {
  const [count, setCount] = useState(0)
  return (
    <main>
      <div className='w-full min-h-screen  '>
        <Routes>
          <Route element={<RootLayout/>}>
            <Route path='/' element={<Navigate to={"/home"} />}></Route>
            <Route path='/home' element={<Home />} />
            <Route path='/cart' element={<Cart/>}></Route>
            <Route path='/leaderboard' element={<Leaderboard/>}></Route>
            <Route path='/checkout' element={<CheckOut/>}></Route>
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
