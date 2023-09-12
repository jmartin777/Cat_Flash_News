import React from 'react';
import { Link } from 'react-router-dom';
import '../NavBar/NavBar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link className="title" to="/">
        Home
      </Link>
      <img
        src="/brandflash.png"
        alt="cat-flash-logo" 
        className="logo-image"
      />
      <ul className="nav-links">
        <li>
          <Link to="/MyFeeds">My News</Link>
        </li>
      </ul>
      
    </nav>
  );
};

export default Navbar;