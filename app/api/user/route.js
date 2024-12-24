import { NextResponse } from "next/server";
import { decode } from "@/lib/auth";

export async function GET(request) {
  const token = request.cookies.get("auth-token");
  if (!token) {
    console.log("no token");
    return NextResponse.redirect(new URL("/login", request.url));
  }
  const {user} = decode(token.value);
  return NextResponse.json(user);
}
