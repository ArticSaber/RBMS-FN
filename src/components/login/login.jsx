import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import timeManagementImage from "../../assets/images/login-image.png";
import userImage from "../../assets/images/user.svg";
import lockImage from "../../assets/images/lock.svg";
import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
import "./Login.css";
const Login = () => {
  //   const nav = useNavigate();
  //   const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }
      //   toast.info("Successfully logged in!");
      // nav("/home");
    } catch (error) {
      //   toast.error(error.message);
      console.log(error.message);
    }
    console.log(formData);
  };

  const token = localStorage.getItem("token");
  console.log(token);
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
                type="text"
                placeholder="Enter the User Id"
                name="email"
                className="input-box"
                onChange={handleChange}
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
                type="password"
                placeholder="Enter the Password"
                name="password"
                className="input-box"
                onChange={handleChange}
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