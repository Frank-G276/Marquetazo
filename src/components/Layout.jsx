// src/components/Layout.jsx

import React from 'react';

import { Outlet } from 'react-router-dom'; 
import Navbar from '../features/navbar/Navbar';



const Layout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      
    </div>
  );
};

export default Layout;