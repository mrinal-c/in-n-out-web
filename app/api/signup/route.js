import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export async function POST(request) {
  const credentials = await request.json();
  credentials.username = "TEMP";
  credentials.name = "TEMP";
  let url = `${process.env.APP_URL}/auth/signup`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) { // Check if the response code is NOT 200-299
      const errorData = await response.json(); // Try to get error details from the backend
      throw new Error(errorData.message); // Throw a descriptive error
    }
    const { user, token } = await response.json();
    cookies().set({
      name: 'auth-token',
      value: token,
      maxAge: 3600,
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'strict'
    });

    return NextResponse.json(user);

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 401 }); // Unauthorized
  }
}
