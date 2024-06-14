import { addQueryParams } from "@/redux/utils";
import { NextResponse } from "next/server";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;

  let params = {
    month: searchParams.get("month"),
    uid: searchParams.get("uid"),
  };
  let url = addQueryParams(`${process.env.APP_URL}/tableData`, params);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      accesstoken: searchParams.get("accessToken"),
    },
  });
  const data = await response.json();
  return NextResponse.json(data);
}
