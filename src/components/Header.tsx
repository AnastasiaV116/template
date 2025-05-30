import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="site-header">
      <nav className="navigation">
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <strong>LastFM Clone</strong>
          </Link>
        </div>
        <ul className="menu-items">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link to="/music">Music</Link>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <Link to="/features">Features</Link>
          </li>
        </ul>
        <Link to="/search" className="search-icon">
          <img src="/поиск.png" alt="Search" />
        </Link>
      </nav>
    </header>
  );
};

export default Header;