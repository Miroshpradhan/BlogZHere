import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ isLoggedIn, handleLogout }) => {
  return (
    <header>
      <h1>Blog Z</h1>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button>Search</button>
      </div>
      <nav>
        <ul>
          <li><Link to="/posts">Posts</Link></li>
          <li><Link to="/create-post">Create Post</Link></li>
          {isLoggedIn ? (
            <>
              <li><Link to="/profile">Profile</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
