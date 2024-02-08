'use server'

import { redirect } from "next/navigation";

export async function login(email, password) {
  'use server'
  if (email == null || password == null) {
    console.log("email or password is null");
    redirect("/login");
  }
  fetch(`${process.env.APP_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.status == "SUCCESS") {
        console.log("Login successful");
        redirect("/home")
      } else if (data.status == "FAILURE") {
        console.log("Login failed");
        redirect("/login");
      }
    })
    .catch((err) => console.log(err));
}

export async function wakeUpServer() {
  'use server'
  fetch(`${process.env.APP_URL}/wakeup`, {
    method: "GET",
  });
}
