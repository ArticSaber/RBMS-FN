import styles from "@/styles/page.module.css";
import { BASE_URL } from "@/config";
import UserId from "@/components/userId";
import { headers } from "next/headers";

const Page = async () => {
  const UID = await UserId();

  const { user } = await fetch(`${BASE_URL}api/getuser/${UID}`, {
    method: "GET",
    headers: headers(),
  }).then((res) => res.json());

  return (
    <div className={styles.card}>
      <h1>Dashboard</h1>
      <div>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
        <p>Active: {user.active ? "Yes" : "No"}</p>
      </div>
    </div>
  );
};

export default Page;
