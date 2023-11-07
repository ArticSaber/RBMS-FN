import { NextResponse } from "next/server";
import { authSchema } from "../../utils/schema.js";
import dbConnection from "../../utils/db.js";

dbConnection(process.env.NEXT_PUBLIC_MONGO_URL);
export async function DELETE(req, { params }) {
  try {
    const id = params.id;
    await authSchema.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted Succesfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
