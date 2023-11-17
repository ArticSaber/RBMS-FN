import Table from "@/components/table";
import { BASE_URL } from "@/config";
import { headers } from "next/headers";

const Superadmin = async () => {
  const data = await fetch(BASE_URL + "api/list", {
    method: "POST",
    body: JSON.stringify({ role: "admin" }),
    cache: "no-store",
    headers: headers(),
  })
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));

  return <Table data={data} />;
};

export default Superadmin;
