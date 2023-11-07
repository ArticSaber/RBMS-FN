import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import timeManagementImage from "../../assets/images/login-image.png";
import userImage from "../../assets/images/user.svg";
import lockImage from "../../assets/images/lock.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../config";
import { toast } from "react-toastify";

import "./login.css";
const Login = () => {
  const nav = useNavigate();
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      //
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const res = await response.json();
      console.log(res);

      if (res.Status) {
        if (res.role === "user") {
          nav("/userdashboard");
        }
        if (res.role === "admin") {
          nav("/admindashboard");
        }
        if (res.role === "superadmin") {
          nav("/superadmindashboard");
        }
      } else {
        toast.error("Invalid Credentials");
      }
      // window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <React.Fragment>
      <div className="login-container">
        <div className="time-magangemet">
          <img
            alt="i"
            src={timeManagementImage}
            className="time-magangemet-image"
          ></img>
        </div>
        <form className="login-wrapper" onSubmit={handleLogin}>
          <div className="login-rect">
            <p>Login</p>
          </div>
          <div className="email-container">
            <label htmlFor="user" className="user">
              Email ID
            </label>
            <div className="input-container">
              <img src={userImage} alt="user" className="image" />
              <input
                autoComplete="off"
                type="text"
                placeholder="Enter the User Id"
                name="email"
                className="input-box"
                value={FormData?.email}
                onChange={
                  handleInputChange
                  // dispatch(change({ name: "email", value: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="password-container">
            <label htmlFor="password" className="password">
              Password
            </label>
            <div className="input-container">
              <img src={lockImage} alt="lock" className="image" />
              <input
                autoComplete="off"
                type="password"
                placeholder="Enter the Password"
                name="password"
                className="input-box"
                value={FormData?.password}
                onChange={
                  handleInputChange
                  // dispatch(change({ name: "password", value: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="forgot-container">
            <button type="submit" className="login-btn">
              Login
            </button>

            <Link to="/forgotPassword" className="forgot-password">
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Login;
