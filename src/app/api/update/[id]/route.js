// Importing necessary modules
import { NextResponse } from "next/server";
import { authSchema } from "../../utils/schema.js";
import dbConnection from "../../utils/db.js";
import role from "@/components/role.jsx";

// Establishing a connection to the database
dbConnection(process.env.NEXT_PUBLIC_MONGO_URL);

export async function PUT(req, { params }) {
  try {
    // Retrieve the user ID from the parameters
    const id = params.id;

    // Parse the request body to get the data to update
    const data = await req.json();

    // Check the role of the user making the request
    const Role = await role();
    if (Role !== "superadmin" && Role !== "admin") {
      return NextResponse.json({ message: "Not Allowed" }, { status: 403 });
    }

    const checkisadmin = await authSchema.findById(id);
    if (checkisadmin.role === "superadmin" && Role !== "superadmin"){
      return NextResponse.json({ message: "Not Allowed" }, { status: 403 });
    }

    // Update the user in the database
    await authSchema.findByIdAndUpdate(id, data, {
      new: true,
    });

    // Return a success message with a 200 status code
    return NextResponse.json(
      { message: "Updated Succesfully" },
      { status: 200 }
    );
  } catch (error) {
    // If an error occurs, return the error message with a 500 status code
    return NextResponse.json({ message: error.message }, { status: 502 });
  }
}
