import { NextResponse } from "next/server";
import { jwtVerifier } from "./app/api/utils/jwt";
import role from "@/components/role.jsx";

export async function middleware(req) {
  const Role = await role();
  const res = NextResponse.next();
  // dashboard page token verification
  if (
    req.nextUrl.pathname === "/" ||
    req.nextUrl.pathname === "/User" ||
    req.nextUrl.pathname === "/Admin" ||
    req.nextUrl.pathname === "/Superadmin"
  ) {
    try {
      const token = req.cookies.get("token")?.value;
      if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      const { payload } = await jwtVerifier(token);
      if (!payload) {
        res.cookie("token", null);
        return NextResponse.redirect(new URL("/login", req.url));
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (
    (req.nextUrl.pathname === "/Superadmin" && Role === "admin") ||
    (req.nextUrl.pathname === "/Admin" && Role === "admin")
  ) {
    return NextResponse.redirect(new URL("/User", req.url));
  }
  if (
    (req.nextUrl.pathname === "/Superadmin" && Role === "user") ||
    (req.nextUrl.pathname === "/Admin" && Role === "user")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  // if (req.nextUrl.pathname === "/Superadmin" && Role !== "superadmin") {
  //   return NextResponse.redirect(new URL(`/${Role}`));
  // }

  // login page token verification
  if (req.nextUrl.pathname === "/login") {
    try {
      const token = req.cookies.get("token")?.value;
      if (token) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return res;
}
