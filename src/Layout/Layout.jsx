import React from 'react';
import Navbar from '../Navbar/Navbar';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main style={{ paddingTop: '60px' }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
