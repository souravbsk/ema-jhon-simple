import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";
import { userContext } from "../../AuthProvider/AuthProvider";

const SignUp = () => {
  const { createUser } = useContext(userContext);
  const [error, setError] = useState("");

  const handleSingUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    console.log(email, password, confirmPassword);
    if (password !== confirmPassword) {
      setError("password not matched");
      return;
    } else if (password < 6) {
      setError("password must be 6 length");
      return;
    }
    createUser(email, password)
      .then((result) => {
        const currentUser = result.user;
        console.log(currentUser);
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message)
      });
  };
  return (
    <div className="form-container">
      <h1 className="form-title">Sign Up</h1>
      <form onSubmit={handleSingUp}>
        <div className="form-control">
          <label htmlFor="">Email</label>
          <input type="email" required name="email" id="" />
        </div>
        <div className="form-control">
          <label htmlFor="">Password</label>
          <input type="password" required name="password" id="" />
        </div>
        <div className="form-control">
          <label htmlFor="">Confirm Password</label>
          <input type="password" required name="confirmPassword" id="" />
        </div>
        <div className="form-btn-div">
          <button className="form-btn">Login</button>
        </div>
      </form>
      <p className="accountLinkToggle">
        Already have an account? <Link to="/login">Login</Link>
      </p>
      <p className="errorText">{error && error}</p>
    </div>
  );
};

export default SignUp;
