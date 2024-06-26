import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, useNavigate } from 'react-router-dom';

import Navbar from './Navbar.js'
import ServerHome from './pages/ServerHome'
import ServerPage from './pages/ServerPage'
import { Main, ViewCalendar, Login, Signup, NewCalendar } from './pages'


const root = ReactDOM.createRoot(document.getElementById('root'));

const NavbarWrapper = () => {
  const loggedInUser = localStorage.getItem('userID');
  const navigate = useNavigate();

  useEffect(() => {                       //if not logged in redirect to the login page
    if (loggedInUser == null) {
      navigate("/Login");
    }
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarWrapper />,
    children: [
      { path: "/", element: <Main /> },
      { path: "/server/:id", element: <ServerPage /> },
    ]
  },
  { path: "/Login", element: <Login /> },
  { path: "/Signup", element: <Signup /> }
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
