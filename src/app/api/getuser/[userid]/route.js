import { NextResponse } from "next/server";
import { authSchema } from "../../utils/schema.js";
import dbConnection from "../../utils/db.js";

dbConnection(process.env.NEXT_PUBLIC_MONGO_URL);
export async function GET(req, { params }) {
  try {
    const userId = params.userid;
    const user = await authSchema.findById({ _id: userId });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
