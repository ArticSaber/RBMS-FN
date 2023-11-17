import { NextResponse } from "next/server";
import { authSchema } from "../../utils/schema.js";
import dbConnection from "../../utils/db.js";
import role from "@/components/role.jsx";

dbConnection(process.env.NEXT_PUBLIC_MONGO_URL);
export async function DELETE(req, { params }) {
  try {
    const id = params.id;
    const Role = await role();
    if (Role !== "superadmin" && Role !== "admin") {
      return NextResponse.json({ message: "Not Allowed" }, { status: 400 });
    }
    await Promise.resolve(authSchema.findByIdAndDelete(id));
    return NextResponse.json(
      { message: "Deleted Succesfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
