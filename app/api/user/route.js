import { NextResponse } from "next/server";
import { decode } from "@/lib/auth";

export async function GET(request) {
  const token = request.cookies.get("auth-token").value;
  if (!token) {
    return NextResponse.status(401).json({ message: "You are not logged in" });
  }
  const {user} = decode(token);
  return NextResponse.json(user);
}
