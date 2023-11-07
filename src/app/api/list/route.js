import { NextResponse } from "next/server";
import { authSchema } from "../utils/schema.js";
import { jwtGenrator } from "../utils/jwt.js";
import dbConnection from "../utils/db.js";
import comparePassword from "../utils/passCompare.js";

dbConnection(process.env.NEXT_PUBLIC_MONGO_URL);
export async function POST(req) {
  try {
    const { role } = await req.json();
    const list = await authSchema.find({ role: role });
    console.log(list);
    if (!list) throw badRequest("No User found");
    return NextResponse.json(list, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
