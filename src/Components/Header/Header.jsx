import React from "react";
import './Header.css'
import logo from '../../images/Logo.svg';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <nav className="header">
        <div className="nav-brand">
          <img className="nav-brand-logo" src={logo} alt="" />
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Shop</Link>
          </li>
          <li>
            <Link to="/order">Orders</Link>
          </li>
          <li>
            <Link to="/Inventory">Inventory</Link>
          </li>
          <li>
            <Link to="/Login">Login</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
