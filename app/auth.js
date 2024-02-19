import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth";

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
      CredentialsProvider({
        id: "credentials",
        name: "Credentials",
        credentials: {
          email: { label: "email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          const res = await fetch(`${process.env.APP_URL}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          });
          const data = await res.json();
  
          if (res.ok && data.status === "SUCCESS") {
            return data.user;
          } else {
            return null;
          }
        },
      }),
    ],
    callbacks: {
        async redirect({ url, baseUrl }) {
            return baseUrl;
        }},
  };

  export function auth(...args) {
    return getServerSession(...args, authOptions);
  }