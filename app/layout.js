import { Inter } from "next/font/google";
import StoreProvider from "@/redux/StoreProvider";
import { ChakraProvider } from "@chakra-ui/react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme as createMuiTheme,
} from "@mui/material/styles";
import theme from "./theme";
import React from "react";

// import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "in-n-out",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <React.StrictMode>
      <StoreProvider>
          <html>
            <body className={inter.className}>
              <ChakraProvider theme={theme}>
                {children}
              </ChakraProvider>
            </body>
          </html>
      </StoreProvider>
    </React.StrictMode>
  );
}
