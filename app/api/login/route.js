import { addQueryParams } from "@/redux/utils";
import { NextResponse } from "next/server";

export async function POST(request) {
  const credentials = await request.json();

  let url = `${process.env.APP_URL}/login`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  return NextResponse.json(data);
}
