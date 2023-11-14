"use client";

import Table from "@/components/table";
import { BASE_URL } from "@/config";
import { useEffect, useState } from "react";

const User = () => {
  const [data, setData] = useState([]);
  const test = async () => {
    await fetch(BASE_URL + "api/list", {
      cache: "no-store",
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ role: "user" }),
    })
      .then((response) => response.json())
      .then((response) => setData(response))
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    test();
  }, []);

  return <Table data={data} type="user" />;
};

export default User;
