import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import timeManagementImage from "../../assets/images/login-image.png";
import userImage from "../../assets/images/user.svg";
import lockImage from "../../assets/images/lock.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import "./login.css";
const Login = () => {
  const nav = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const Data = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:3000/auth/login", Data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        if (res.data.Status) {
          if (res.data.role === "user") {
            nav("/userdashboard");
          }
          if (res.data.role === "admin") {
            nav("/admindashboard");
          }
          if (res.data.role === "superadmin") {
            nav("/superadmindashboard");
          }
        } else {
          toast.error("Invalid Credentials");
        }
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
                value={email}
                onChange={
                  (e) => setemail(e.target.value)
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
                value={password}
                onChange={
                  (e) => setpassword(e.target.value)
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
