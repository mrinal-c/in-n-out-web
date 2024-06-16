import { addQueryParams } from "@/redux/utils";
import { NextResponse } from "next/server";

export async function POST(request) {
  const searchParams = request.nextUrl.searchParams;
  const transaction = await request.json();
  let query = {
    month: searchParams.get("month"),
    uid: searchParams.get("uid"),
  };
  let url = addQueryParams(`${process.env.APP_URL}/transaction`, query);
  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accesstoken: searchParams.get("accessToken"),
    },
    body: JSON.stringify(transaction),
  });
  return NextResponse.json({ success: response.status == 200 });
}

export async function DELETE(request) {
  const searchParams = request.nextUrl.searchParams;
  let query = {
    _id: searchParams.get("_id"),
    uid: searchParams.get("uid"),
    month: searchParams.get("month"),
  };
  let url = addQueryParams(`${process.env.APP_URL}/transaction`, query);
  let response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      accesstoken: searchParams.get("accessToken"),
    },
  });
  return NextResponse.json({ success: response.status == 200 });
}

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  let query = {
    month: searchParams.get("month"),
    uid: searchParams.get("uid"),
  };
  let url = addQueryParams(`${process.env.APP_URL}/transaction`, query);
  let response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      accesstoken: searchParams.get("accessToken"),
    },
  });

  let data = await response.json();
  return NextResponse.json(data);
}

export async function PUT(request) {
  const searchParams = request.nextUrl.searchParams;
  const transaction = await request.json();
  let query = {
    month: searchParams.get("month"),
    uid: searchParams.get("uid"),
    _id: searchParams.get("_id"),
  };
  let url = addQueryParams(`${process.env.APP_URL}/transaction`, query);
  let response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      accesstoken: searchParams.get("accessToken"),
    },
    body: JSON.stringify(transaction),
  });

  return NextResponse.json({ success: response.status == 200 });
}
