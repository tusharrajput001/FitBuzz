import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import './Layout.css';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="layout">
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      
      <Sidebar isOpen={sidebarOpen} />
      
      <div className={`main-content ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
        <Navbar />
        <main className="content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
