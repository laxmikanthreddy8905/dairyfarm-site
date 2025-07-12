// src/components/Navbar.tsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Contact', path: '/contact' },
 
  { name: 'Gallery', path: '/gallery' },
  { name: 'Products', path: '/products' },
  { name: 'Booking', path: '/booking' },
  { name: 'About', path: '/about' },
];

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      {pages.map((page) => (
        <NavLink
          key={page.name}
          to={page.path}
          className={({ isActive }) =>
            `nav-button ${isActive ? 'active' : ''}`
          }
        >
          {page.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
