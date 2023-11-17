// // "use client";

// import Table from "@/components/table";
// import { BASE_URL } from "@/config";
// import { cookies } from "next/headers";
// // import { useEffect, useState } from "react";

// const User = async () => {
//   // const [data, setData] = useState([]);
//   const cookieStore = cookies();
//   const token = cookieStore.get("token");
//   // const test = async () => {
//   const data = await fetch(BASE_URL + "api/list", {
//     cache: "no-store",
//     // headers: { "Set-Cookie": `token=${token.value}` },
//     method: "POST",
//     body: JSON.stringify({ role: "superadmin" }),
//   })
//     .then((response) => response.json())
//     // .then((response) => setData(response))
//     .catch((error) => console.error(error));
//   // };
//   // useEffect(() => {
//   //   test();
//   // }, []);

//   return <Table data={data} type="superadmin" />;
// };

// export default User;

import Table from "@/components/table";
import { BASE_URL } from "@/config";
import { headers } from "next/headers";

const Superadmin = async () => {
  const data = await fetch(BASE_URL + "api/list", {
    method: "POST",
    body: JSON.stringify({ role: "superadmin" }),
    cache: "no-store",
    headers: headers(),
  })
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));

  return <Table data={data} />;
};

export default Superadmin;