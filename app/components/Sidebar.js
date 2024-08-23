import React from 'react';
import { Nav } from 'react-bootstrap';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">LIXMA</div>
      <Nav className="flex-column">
        <Nav.Link href="/dashboard/dashboard1">Dashboard-1</Nav.Link>
        <Nav.Link href="/dashboard/dashboard2">Dashboard-2</Nav.Link>
        {/* Add more links here */}
      </Nav>
    </div>
  );
};

export default Sidebar;
