import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import { AiFillHome } from "react-icons/ai";
import { CgGym } from "react-icons/cg";
import { FaCamera } from "react-icons/fa";

const Sidebar = ({ isOpen, onCloseSidebar }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'HOME', icon: <AiFillHome /> },
    // { path: '/my-workout', label: 'CALORIES', icon: <CgGym /> }, 
    { path: '/food-scanner', label: 'FOOD SCANNER', icon: <FaCamera /> },
    // { path: '/my-food', label: 'MY FOOD', icon: '🍎' },
    // { path: '/log-food', label: 'LOG FOOD', icon: '📝' },
    // { path: '/log-workout', label: 'LOG WORKOUT', icon: '📊' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleMenuItemClick = () => {
    if (onCloseSidebar) {
      onCloseSidebar();
    }
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
            onClick={handleMenuItemClick}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
