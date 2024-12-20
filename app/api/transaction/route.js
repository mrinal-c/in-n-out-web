import { addQueryParams } from "@/redux/utils";
import { NextResponse } from "next/server";

//TODO: CONVERT COOKIES/FORM API TO ASYNC
export async function POST(request) {
  const searchParams = request.nextUrl.searchParams;
  let query = {
    month: searchParams.get("month"),
    year: searchParams.get("year")
  };
  const transaction = await request.json();
  let url = addQueryParams(`${process.env.APP_URL}/api/transaction`, query);
  const token = request.cookies.get("auth-token").value;
  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(transaction),
    });
    if (response.ok) {
      return NextResponse.json({ status: 200 });
    } else {
      throw new Error("Failed API call. Redirecting to Login");
    }
  } catch (err) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export async function DELETE(request) {
  const searchParams = request.nextUrl.searchParams;
  let query = {
    _id: searchParams.get("_id"),
  };
  let url = addQueryParams(`${process.env.APP_URL}/api/transaction`, query);
  const token = request.cookies.get("auth-token").value;
  try {
    let response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      return NextResponse.json({ status: 200 });
    } else {
      throw new Error("Failed API call. Redirecting to Login");
    }
  } catch (err) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  let query = {
    month: searchParams.get("month"),
    year: searchParams.get("year"),
    out: searchParams.get("out"),
  };
  let url = addQueryParams(`${process.env.APP_URL}/api/transaction`, query);
  const token = request.cookies.get("auth-token").value;
  try {
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      let data = await response.json();
      return NextResponse.json(data);
    } else {
      throw new Error("Failed API call. Redirecting to Login");
    }
  } catch (err) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export async function PUT(request) {
  const searchParams = request.nextUrl.searchParams;
  const transaction = await request.json();
  let query = {
    _id: searchParams.get("_id"),
  };
  let url = addQueryParams(`${process.env.APP_URL}/api/transaction`, query);
  const token = request.cookies.get("auth-token").value;
  try {
    let response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(transaction),
    });
    if (response.ok) {
      return NextResponse.json({ status: 200 });
    } else {
      throw new Error("Failed API call. Redirecting to Login");
    }
  } catch (err) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
