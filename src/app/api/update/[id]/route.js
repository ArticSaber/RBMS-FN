import { NextResponse } from "next/server";
import { authSchema } from "../../utils/schema.js";
import dbConnection from "../../utils/db.js";
import role from "@/components/role.jsx";

dbConnection(process.env.NEXT_PUBLIC_MONGO_URL);
export async function PUT(req, { params }) {
  try {
    const id = params.id;
    const data = await req.json();
    console.log(data);
    const Role = await role();
    if (Role !== "superadmin") {
      return NextResponse.json({ message: "Not Allowed" }, { status: 400 });
    }
    await authSchema.findByIdAndUpdate(id, data, {
      new: true,
    });
    return NextResponse.json({ message: "Updated Succesfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
