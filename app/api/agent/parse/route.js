import { addQueryParams } from "@/redux/utils";
import { NextResponse } from "next/server";

//TODO: CONVERT COOKIES/FORM API TO ASYNC
export async function POST(request) {
  const body = await request.json();
  let url = `${process.env.APP_URL}/agent/parse`;
  const token = request.cookies.get("auth-token").value;
  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data);
    } else {
      throw new Error("Failed API call. Redirecting to Login");
    }
  } catch (err) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
