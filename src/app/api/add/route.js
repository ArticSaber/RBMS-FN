// Importing necessary modules
import { NextResponse } from "next/server";
import { authSchema } from "../utils/schema.js";
import dbConnection from "../utils/db.js";
import role from "@/components/role.jsx";

// Establishing a connection to the database
dbConnection(process.env.NEXT_PUBLIC_MONGO_URL);

export async function POST(req) {
  try {
    // Parse the request body
    const data = await req.json();
    
    // Check if email and password are provided
    if (!data.email || !data.password) {
      return NextResponse.json(
        { message: "Email or Password is missing" },
        { status: 400 }
      );
    }
    
    // Check the role of the user making the request
    const Role = await role();
    if (Role !== "superadmin" && Role !== "admin") {
      return NextResponse.json({ message: "Not Allowed" }, { status: 400 });
    }
    
    // Create a new user in the database
    await authSchema.create(data);
    
    // Return a success message
    return NextResponse.json(
      { message: "User Added Succesfully" },
      { status: 200 }
    );
  } catch (error) {
    // Return the error message
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}