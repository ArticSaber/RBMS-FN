import Table from "@/components/table";
import { BASE_URL } from "@/config";

const Admin = async () => {
  const data = await fetch(BASE_URL + "api/list", {
    method: "POST",
    body: JSON.stringify({ role: "admin" }),
    credentials: "include",
    cache: "no-store",
  })
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));

  return <Table data={data} />;
};

export default Admin;
