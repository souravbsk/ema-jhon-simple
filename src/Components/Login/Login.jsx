import React, { useContext, useState } from "react";
import "./Login.css";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { userContext } from "../../AuthProvider/AuthProvider";

const Login = () => {
  const [showPass,setShowPass] = useState(true)
  const { loginUser } = useContext(userContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
const location = useLocation();
const from = location?.state?.from?.pathname || "/";
console.log(from);
console.log(location);
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
  
    loginUser(email, password)
      .then((result) => {
        const currentUser = result.user;
        console.log(currentUser);
        navigate(from,{replace:true})
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      });
  };
  return (
    <div className="form-container">
      <h1 className="form-title">Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-control">
          <label htmlFor="">Email</label>
          <input type="email" required name="email" id="" />
        </div>
        <div className="form-control">
          <label htmlFor="">Password</label>
          <input type={showPass ? "password" : "text"} required name="password" id="" />
          <p><small onClick={() => setShowPass(!showPass)}>{showPass ? "Show Password" : "Hide Password"}</small></p>
        </div>
        <div className="form-btn-div">
          <button className="form-btn">Login</button>
        </div>
      </form>
      <p className="accountLinkToggle">
        New to Ema-john? <Link to="/signup">Create New Account</Link>
      </p>
      <p className="errorText">{error && error}</p>
    </div>
  );
};

export default Login;
