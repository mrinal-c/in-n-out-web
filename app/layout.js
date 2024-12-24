import { Inter } from "next/font/google";
import StoreProvider from "@/redux/StoreProvider";
import React from "react";
import { Toaster } from "@/components/ui/toaster";

import "@/app/globals.css";
import { ProtectedRoute } from "./components/common/ProtectedRoute";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "in-n-out",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <React.StrictMode>
      <StoreProvider>
        <ProtectedRoute>
          <html>
            <head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
            </head>
            <body className={inter.className}>
              <Toaster />
              <div className="h-screen py-12 px-8 md:px-32">{children}</div>
            </body>
          </html>
        </ProtectedRoute>
      </StoreProvider>
    </React.StrictMode>
  );
}
