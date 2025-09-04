import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'HOME', icon: '🏠' },
    { path: '/my-workout', label: 'MY WORKOUT', icon: '💪' },
    { path: '/my-food', label: 'MY FOOD', icon: '🍎' },
    { path: '/log-food', label: 'LOG FOOD', icon: '📝' },
    { path: '/log-workout', label: 'LOG WORKOUT', icon: '📊' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
            onClick={() => {
              // Close sidebar on mobile after clicking a menu item
              if (window.innerWidth <= 768) {
                // We'll handle this in the parent component
              }
            }}
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
