import Table from "@/components/table";
import { BASE_URL } from "@/config";

const Superadmin = async () => {
  const data = await fetch(BASE_URL + "api/list", {
    method: "POST",
    body: JSON.stringify({ role: "superadmin" }),
    credentials: "include",
    cache: "no-store",
  })
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));

  return <Table data={data} />;
};

export default Superadmin;
