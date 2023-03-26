import React from "react";
import './Header.css'
import logo from '../../images/Logo.svg';

const Header = () => {
  return (
    <div>
      <nav className="header">
        <div className="nav-brand">
          <img className="nav-brand-logo" src={logo} alt="" />
        </div>
        <ul className="nav-links">
          <li>
            <a href="/shoos">Shop</a>
          </li>
          <li>
            <a href="/order">Order</a>
          </li>
          <li>
            <a href="/Inventory">Inventory</a>
          </li>
          <li>
            <a href="/Login">Login</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
