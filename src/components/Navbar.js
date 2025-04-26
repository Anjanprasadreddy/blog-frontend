import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/';
  };

  return (
    <nav style={{
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between'
    }}>
      <div>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '15px' }}>Home</Link>
        {
            role=="admin" && <Link to="/blogs" style={{ color: 'white', textDecoration: 'none', marginRight: '15px' }}>Blogs</Link>
        }
        {
            role=="admin" && <Link to="/access" style={{ color: 'white', textDecoration: 'none', marginRight: '15px' }}>Admin Access</Link>
        }
      </div>
      <div>
        {token ? (
          <button onClick={handleLogout} style={{ backgroundColor: 'white', color: '#007bff' }}>Logout</button>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none', marginRight: '10px' }}>Login</Link>
            <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
