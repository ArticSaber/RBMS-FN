import { NextResponse } from "next/server";
import { authSchema } from "../utils/schema.js";
import dbConnection from "../utils/db.js";

dbConnection(process.env.NEXT_PUBLIC_MONGO_URL);
export async function POST(req) {
  return new Promise((resolve, reject) => {
    req
      .json()
      .then(({ role }) => {
        authSchema
          .find({ role: role })
          .then((list) => {
            resolve(NextResponse.json(list, { status: 200 }));
          })
          .catch((error) => {
            reject(
              NextResponse.json({ message: error.message }, { status: 500 })
            );
          });
      })
      .catch((error) => {
        reject(NextResponse.json({ message: error.message }, { status: 500 }));
      });
  });
}
