import { addQueryParams } from "@/redux/utils";
import { NextResponse } from "next/server";

export async function POST(request) {
  const searchParams = request.nextUrl.searchParams;

  let params = {
    year: searchParams.get("year"),
  };
  let url = addQueryParams(`${process.env.APP_URL}/changeYear`, params);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accesstoken: searchParams.get("accessToken"),
    },
  });
  const data = await response.json();
  return NextResponse.json(data);
}
