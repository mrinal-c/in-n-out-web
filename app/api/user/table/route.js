import { addQueryParams } from "@/redux/utils";
import { NextResponse } from "next/server";


export async function PUT(request) {
  const body = await request.json();
  const searchParams = request.nextUrl.searchParams;
  let query = {
    isOut: searchParams.get("isOut"),
  };
  let url = addQueryParams(`${process.env.APP_URL}/user/table`, query);
  const token = request.cookies.get("auth-token").value;
  try {
    let response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      const data = await response.json()
      return NextResponse.json(data);
    } else {
      throw new Error("Failed API call. Redirecting to Login");
    }
  } catch (err) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}