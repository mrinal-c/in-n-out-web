'use client';

import { CircularProgress } from "@mui/material";
import secureLocalStorage from "react-secure-storage"
import { useEffect } from "react";
import { login } from "./actions";

export default function Splash() {
  useEffect(() => {
    verifyLogin();
  }, []);

  const verifyLogin = async () => {
    console.log("verufying login");
    let email = secureLocalStorage.getItem("email");
    let password = secureLocalStorage.getItem("password");

    console.log("email: ", email);
    console.log("password", password);

    secureLocalStorage.removeItem("email");
    secureLocalStorage.removeItem("password");

    login(email, password);
  };


  return (
    <div>
      <CircularProgress />
    </div>
  );
}
