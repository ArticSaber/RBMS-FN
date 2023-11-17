import { NextResponse } from "next/server";
import { jwtVerifier } from "./app/api/utils/jwt";
import role from "@/components/role.jsx";

export async function middleware(req) {
  const Role = await role();
  const res = NextResponse.next();
  // dashboard page token verification

  if (
    req.nextUrl.pathname === "/login" ||
    req.nextUrl.pathname.includes("/api/login")
  ) {
    try {
      const token = req.cookies.get("token")?.value;
      if (token) {
        return NextResponse.redirect(new URL("/Dashboard", req.url));
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      //check token
      const token = req.cookies.get("token")?.value;
      if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      const { payload } = await jwtVerifier(token);
      if (!payload) {
        res.cookie("token", null);
        return NextResponse.redirect(new URL("/login", req.url));
      }

      if (req.nextUrl.pathname === "/Superadmin" && Role === "admin") {
        return NextResponse.redirect(new URL("/User", req.url));
      }
      if (
        (req.nextUrl.pathname === "/Superadmin" && Role === "user") ||
        (req.nextUrl.pathname === "/Admin" && Role === "user")
      ) {
        return NextResponse.redirect(new URL("/Dashboard", req.url));
      }
    } catch (error) {
      console.log("test", error);
    }
  }

  return res;
}

export const config = { matcher: "/((?!.*\\.).*)" };
