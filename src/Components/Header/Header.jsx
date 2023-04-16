import React, { useContext } from "react";
import "./Header.css";
import logo from "../../images/Logo.svg";
import { Link } from "react-router-dom";
import { userContext } from "../../AuthProvider/AuthProvider";

const Header = () => {
  const { user, logOut } = useContext(userContext);
  const handleSignOut = () => {
    logOut();
  };
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
          <li>
            <Link to="/SignUp">Sign Up</Link>
          </li>
          <li>
            {user && (
              <span className="text-white">
                Welcome,{user.email}
                <button className="signOutbtn" onClick={handleSignOut}>Sign Out</button>
              </span>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
