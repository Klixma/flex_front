import React from 'react';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <TopNav />
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
