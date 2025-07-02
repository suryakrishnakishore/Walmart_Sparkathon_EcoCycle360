import { useState } from 'react';
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import SignIn from './pages/auth/sign-in';
import SignUp from './pages/auth/sign-up';
import useStore from './store/index';
import { setAuthToken } from './libs/apiCalls.js';
import { Toaster } from "sonner";
import Navbar from './components/navbar.jsx';
import Home from './pages/home.jsx';

const RootLayout = () => {

  const { user } = useStore((state) => state);
  console.log(user);
  setAuthToken(user?.token || "");

  return (user ? (
    <>
      { <Navbar /> }
      <div className='min-h-[cal(h-screen - 100px)]'>
        <Outlet />
      </div>
    </>
    
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
            <Route path='/home' element={<Home />} />
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
