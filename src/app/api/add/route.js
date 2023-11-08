import { NextResponse } from "next/server";
import { authSchema } from "../utils/schema.js";
import jwt from "jsonwebtoken";
import dbConnection from "../utils/db.js";
import role from "@/components/role.jsx";
import { jwtDecode } from "../utils/jwt.js";

dbConnection(process.env.NEXT_PUBLIC_MONGO_URL);
export async function POST(req) {
  try {
    const data = await req.json();
    const Role = await role();
    if (!data.email || !data.password) {
      return NextResponse.json(
        { message: "Email or Password is missing" },
        { status: 400 }
      );
    }
    await authSchema.create(data);
    return NextResponse.json(
      { message: "User Added Succesfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
