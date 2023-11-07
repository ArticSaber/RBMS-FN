"use client";

import React, { useState, useEffect } from "react";
import { BASE_URL } from "@/config";
import { useRouter } from "next/navigation";
import role from "@/components/role";
function homepage() {
  const router = useRouter();
  const [Data, setData] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    email: "",
    password: "",
    role: "",
    active: "",
  });
  // useEffect(() => {
  //   if (superadmin) {
  //     fetch(BASE_URL + "/sup/getusers", {
  //       method: "GET",
  //       credentials: "include",
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setData(data);
  //         console.log(data);
  //       })
  //       .catch((error) => console.error("Error:", error));
  //   }
  // }, [superadmin]);

  // useEffect(() => {
  //   if (admin) {
  //     fetch(BASE_URL + "/admin/getusers", {
  //       method: "GET",
  //       credentials: "include",
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setData(data);
  //         console.log(data);
  //       })
  //       .catch((error) => console.error("Error:", error));
  //   }
  // }, [admin]);

  const handleUpdate = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/sup/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentUser),
        credentials: "include",
      });
      console.log(res);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
    setCurrentUser(null);
    setIsOpen(false);
  };

  const handleEdit = (userData) => {
    console.log(userData);
    setCurrentUser(userData);
    setIsOpen(true);
  };

  const handleInputChange = (e) => {
    setCurrentUser({
      ...currentUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleActiveChange = (e) => {
    setCurrentUser({
      ...currentUser,
      active: e.target.value === "Active" ? true : false,
    });
  };

  useEffect(() => {
    const test = async () => {
      const Role = await role();
      console.log(Role);
    };
    test();
  }, []);

  return <>hellos</>;
}

export default homepage;
