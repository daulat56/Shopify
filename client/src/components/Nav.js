import React from "react";
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
  const auth = localStorage.getItem('user');

  // logout function

  const navigate = useNavigate();
  
  const logout = () => {
    navigate('/login');
    localStorage.clear();
    window.reload()
  }
  
  return (
    <div>
      <img className="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhLxeA2lXDNWUR5V-hhsaebJviPiEe8i7jTFB1zvoU&s" alt="logo" />
      {auth ? <ul className="nav-ul">

        <li><Link to="/">Home</Link></li>
        <li><Link to="/add">Add Product</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link onClick={logout}>Logout ({JSON.parse(auth).name})</Link></li>
      </ul>
        :
        <ul className="nav-ul nav-right">
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      }
    </div>
  )
}
export default Nav;