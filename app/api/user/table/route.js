import { decode } from "@/lib/auth";
import { addQueryParams } from "@/redux/utils";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

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
      const { token } = await response.json();
      (await cookies()).set({
            name: 'auth-token',
            value: token,
            maxAge: 3600,
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
          });
      const { user } = decode(token);
      return NextResponse.json(user);
    } else {
      throw new Error("Failed API call. Redirecting to Login");
    }
  } catch (err) {
    console.log("error um", )
    return NextResponse.redirect(new URL("/", request.url));
  }
}
