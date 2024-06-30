import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function POST(request) {
  const credentials = await request.json();

  let url = `${process.env.APP_URL}/auth/login`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const {user, token} = await response.json();
  cookies().set({
    name: 'auth-token',
    value: token,
    maxAge: 3600,
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'strict'
  });

  return NextResponse.json({...user});
}
