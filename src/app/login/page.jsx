"use client";
import React, { useState } from "react";
import { BASE_URL } from "@/config";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      //
      const response = await fetch(`${BASE_URL}api/login`, {
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
      router.push("/dashboard");
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
      <div className={styles["login-container"]}>
        <div className={styles["time-magangemet"]}>
          <img
            alt="i"
            src="/images/login-image.png"
            className={styles["time-magangemet-image"]}
          ></img>
        </div>
        <form className={styles["login-wrapper"]} onSubmit={handleLogin}>
          <div className={styles["login-rect"]}>
            <p>Login</p>
          </div>
          <div className={styles["email-container"]}>
            <label htmlFor="email" className={styles["user"]}>
              Email ID
            </label>
            <div className={styles["input-container"]}>
              <img src="/images/user.svg" alt="user" className={styles.image} />
              <input
                id="email"
                autoComplete="off"
                type="text"
                placeholder="Enter the User Id"
                name="email"
                className={styles["input-box"]}
                value={FormData?.email}
                onChange={
                  handleInputChange
                  // dispatch(change({ name: "email", value: e.target.value }))
                }
              />
            </div>
          </div>
          <div className={styles["password-container"]}>
            <label htmlFor="password" className={styles["password"]}>
              Password
            </label>
            <div className={styles["input-container"]}>
              <img
                src="/images/lock.svg"
                alt="lock"
                className={styles["image"]}
              />
              <input
                id="password"
                autoComplete="off"
                type="password"
                placeholder="Enter the Password"
                name="password"
                className={styles["input-box"]}
                value={FormData?.password}
                onChange={
                  handleInputChange
                  // dispatch(change({ name: "password", value: e.target.value }))
                }
              />
            </div>
          </div>
          <div className={styles["forgot-container"]}>
            <button type="submit" className={styles["login-btn"]}>
              Login
            </button>

            <Link href="/forgotPassword" className={styles["forgot-password"]}>
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Login;
