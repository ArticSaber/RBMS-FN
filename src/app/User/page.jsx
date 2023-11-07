import Table from "@/components/table";
import { BASE_URL } from "@/config";
import styles from "@/styles/page.module.css";
import cls from "classnames";

const User = async () => {
  const data = await fetch(BASE_URL + "api/list", {
    method: "POST",
    body: JSON.stringify({ role: "user" }),
    credentials: "include",
    cache: "no-store",
  })
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));

  return <Table data={data} />;
};

export default User;
